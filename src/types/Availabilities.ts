export interface Root {
  availabilities: Availability[];
  total: number;
  next_slot?: string;
}

export interface Availability {
  date: string;
  slots: string[];
  substitution: any;
  appointment_request_slots: any[];
}
