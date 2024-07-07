import { CronJob } from "cron";

const job = new CronJob(
  "0,20,40 * * * *", // cronTime
  function () {
    console.log("You will see this message every time seconds");
  }, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // New_Yor
);

export { job };
