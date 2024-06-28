import { FC, useEffect, useState } from "react";

import millisecondsToRelativeTimeString from "../utils/millisecondsToRelativeTimeString";

interface DateCountdownProps {
  date: Date;
  onEnd?: () => void;
}

const DateCountdown: FC<DateCountdownProps> = ({date, onEnd}) => {

  const timeLeft = date.getTime() - Date.now();
  const [time, setTime] = useState(millisecondsToRelativeTimeString(timeLeft));

  useEffect(() => {
    const interval = setInterval(() => {
      const timeLeft = date.getTime() - Date.now();
      if (timeLeft <= 0) {
        clearInterval(interval);
        if (onEnd) {
          onEnd();
        }
      }
      else {
        setTime(millisecondsToRelativeTimeString(timeLeft));
      }
    }, 4000)
    return () => {
      clearInterval(interval);
    }
  }, [date, onEnd])

  return (
    <>{time}</>
  )
}

export default DateCountdown;