import { CronJob } from "cron";

const job = new CronJob(
  "*/10 * * * * *", // cronTime
  function () {
    console.log("You will see this message every 10 seconds");
  }, // onTick
  null, // onComplete
  true, // start
  "America/Los_Angeles" // New_Yor
);

export { job };
