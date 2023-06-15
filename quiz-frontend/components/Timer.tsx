import { useEffect, useState } from "react";
import React from 'react';

export default function Timer(props: any) {
  const { startingMinutes = 0, startingSeconds = 20, onTerminated, timerReset } = props;
  const [mins, setMinutes] = useState(startingMinutes);
  const [secs, setSeconds] = useState(startingSeconds);

  useEffect(() => {
    let sampleInterval = setInterval(() => {
      if (secs > 0) {
        setSeconds(secs - 1);
      } else if (mins > 0) {
        setMinutes(mins - 1);
        setSeconds(59);
      } else {
        // Le timer est arrivé à zéro
        onTerminated();
        clearInterval(sampleInterval);
      }
    }, 1000);

    if (timerReset) {
      setMinutes(startingMinutes);
      setSeconds(startingSeconds);
    }

    return () => {
      clearInterval(sampleInterval);
    };
  }, [secs, mins, onTerminated, timerReset, startingMinutes, startingSeconds]);

  return (
    <div>
      <p>
      Temps restant :
        {" "}
        {mins < 10 ? `0${mins}` : mins}:{secs < 10 ? `0${secs}` : secs}
      </p>
    </div>
  );
}
