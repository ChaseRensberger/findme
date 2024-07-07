import { useState, useEffect } from "react";
import { CronJob } from "cron";
import { DateTime } from "luxon";

export const useTimer = (job: CronJob): [number, number] => {
  const endDate = job.nextDate();
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = DateTime.now();
      const remainingMilliseconds = endDate.diff(
        currentTime,
        "milliseconds"
      ).milliseconds;
      const remainingMinutes = Math.floor(
        (remainingMilliseconds / 1000 / 60) % 60
      );
      const remainingSeconds = Math.floor((remainingMilliseconds / 1000) % 60);

      setMinutes(remainingMinutes);
      setSeconds(remainingSeconds);

      if (remainingMilliseconds === 0) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endDate]);

  return [minutes, seconds];
};
