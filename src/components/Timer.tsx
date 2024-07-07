import { useTimer } from "react-timer-hook";

interface Props {
  expiryTimestamp: Date;
}

export default function Timer({ expiryTimestamp }: Props) {
  const {
    // totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    // isRunning,
    // start,
    // pause,
    // resume,
    // restart,
  } = useTimer({
    expiryTimestamp,
    onExpire: () => console.warn("onExpire called"),
  });

  return (
    <div className="text-center">
      <div>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:
        <span>{seconds}</span>
      </div>
    </div>
  );
}
