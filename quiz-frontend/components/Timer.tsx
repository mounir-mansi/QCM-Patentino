import { useEffect, useState } from "react";
import React from 'react';

export default function Timer(props: any) {
    const {startingHours = '00', startingMinutes = '00', startingSeconds = 10 } = props;
    const [hours, setHours] = useState(startingHours);
    const [mins, setMinutes] = useState(startingMinutes);
    const [secs, setSeconds] = useState(startingSeconds);
    useEffect(() => {
      let sampleInterval = setInterval(() => {
        if (secs > 0) {
          setSeconds(secs - 1);
        }
        if (secs === 0) {
          if (mins === 0) {
            clearInterval(sampleInterval);
          } else {
  
          }
        }
      }, 1000);
      return () => {
        clearInterval(sampleInterval);
      };
    });
  
    return (
      <div>
      <p>
        {!(secs) ? "" : (
          <p>
            {" "}
            {hours}:{mins}:{secs < 10 ? `0${secs}` : secs}
          </p>
        )}
      </p>
      </div>
    );
  }