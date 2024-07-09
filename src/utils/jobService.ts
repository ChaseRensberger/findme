import { CronJob } from "cron";
import { EventEmitter } from "events";
import { fetchCurrentCircle } from "./dataService";
import { Circle } from "../types";

const jobEmitter = new EventEmitter();

const job = new CronJob(
  "0,20,40 * * * *", // cronTime
  async function () {
    console.log("Cron job complete");
    const circle: Circle = await fetchCurrentCircle();
    jobEmitter.emit("circleChange", circle);
  }, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles"
);

export { job, jobEmitter };
