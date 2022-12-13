import got from "got";
import moment, { Moment } from "moment";
import { Root as DoctorResponse } from "./types/Doctor";
import { Root as AvailabilitiesResponse } from "./types/Availabilities";
import { sendSms } from "./notifications/sms";

export class Doctor {
  id: string;
  hasAvailabilities?: boolean;
  nextAvailability?: Moment;

  constructor(id: string) {
    this.id = id;
    this.hasAvailabilities = undefined;
    this.nextAvailability = undefined;
  }

  async getInfo() {
    const url = `https://www.doctolib.fr/booking/${this.id}.json`;
    const response = await got<DoctorResponse>(url, {
      responseType: "json",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: `https://www.doctolib.fr/`,
      },
    });

    return response.body;
  }

  async getAvailabilities() {
    const info = await this.getInfo();
    const today = moment().format("YYYY-MM-DD");
    const agendas = info.data.agendas;
    const agendaIds = agendas.map((agenda) => agenda.id).join("-");
    const visiteMotives = info.data.visit_motives;
    const visitMotiveIds = visiteMotives.map((motive) => motive.id).join("-");

    const url = `https://www.doctolib.fr/availabilities.json?start_date=${today}&visit_motive_ids=${visitMotiveIds}&agenda_ids=${agendaIds}&limit=2`;

    const response = await got<AvailabilitiesResponse>(url, {
      responseType: "json",
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36",
        Accept: "application/json",
        "Accept-Language": "fr-FR,fr;q=0.9,en-US;q=0.8,en;q=0.7",
        Referer: `https://www.doctolib.fr/`,
      },
    });

    return response.body;
  }

  async monitor(timeout: number) {
    const info = await this.getInfo();
    const availabilities = await this.getAvailabilities();
    const hasAvailabilities = availabilities.total > 0;
    const nextAvailability = availabilities.next_slot
      ? moment(availabilities.next_slot)
      : undefined;

    // only continue if there were no availabilities before
    if (!this.hasAvailabilities) {
      // if there are availabilities now, send a notification
      if (hasAvailabilities) {
        console.log("Found availability in the next 2 days!");
        sendSms(
          `${info.data.profile.name_with_title}: detected new availability in the next 2 days.`,
          process.env.SMS_RECIPIENT
        );
      } else {
        // if there were no availabilities before and there are still no availabilities now, check the next_availability field
        if (nextAvailability && this.nextAvailability) {
          if (nextAvailability.isBefore(this.nextAvailability)) {
            console.log(`Detected earlier availability: ${nextAvailability}`);
            sendSms(
              `${info.data.profile.name_with_title}: detected new availability: ${nextAvailability}`,
              process.env.SMS_RECIPIENT
            );
          } else {
            console.log("No earlier availabilities detected.");
          }
        }
      }
    } else {
      console.log("Already had availabilities.");
    }
    this.hasAvailabilities = hasAvailabilities;
    this.nextAvailability = nextAvailability;
    setTimeout(() => this.monitor(timeout), timeout);
  }
}
