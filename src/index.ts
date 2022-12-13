import "dotenv/config";
import yargs from "yargs/yargs";
import { Doctor } from "./Doctor";

const main = async () => {
  const parser = yargs(process.argv.slice(2)).options({
    id: { type: "string", require: true },
    delay: { type: "number", default: 30 },
  });

  const argv = await parser.argv;
  const doctor = new Doctor(argv.id);
  doctor.monitor(argv.delay * 1000);
};

main();
