import { FC, useEffect, useState } from "react";

import millisecondsToRelativeTimeString from "../utils/millisecondsToRelativeTimeString";

interface DateCountdownProps {
  date: Date;
  onEnd?: () => void;
  frozen?: boolean;
}

const DateCountdown: FC<DateCountdownProps> = ({ date, onEnd, frozen = false }) => {

  const timeLeft = date.getTime() - Date.now();
  const [time, setTime] = useState<string>();

  useEffect(() => {
    const timeLeft = date.getTime() - Date.now();
    setTime(millisecondsToRelativeTimeString(timeLeft));

    if (frozen) {
      return;
    }

    const intervalFunction = () => {
      const timeLeft = date.getTime() - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        if (onEnd) {
          onEnd();
        }
      } else {
        setTime(millisecondsToRelativeTimeString(timeLeft));
      }
    };

    intervalFunction();

    const interval = setInterval(intervalFunction, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [date, onEnd, frozen]);

  return (
    <>{timeLeft <= 0 ? "Deleted" : time}</>
  );
};

export default DateCountdown;
