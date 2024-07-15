import React, { useState, useEffect } from "react";

function Clock() {
  const initialTime = new Date();
  const [currentTime, setCurrentTime] = useState(initialTime);
  const [speed, setSpeed] = useState(1);
  const [countdownEndTime] = useState(
    new Date(initialTime.getTime() - 120 * 60 * 1000)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentTime > countdownEndTime) {
        const newTime = new Date(currentTime.getTime() - 1000);
        setCurrentTime(newTime);
      }
    }, 1000 / speed);

    return () => clearInterval(interval);
  }, [speed, currentTime, countdownEndTime]);

  const handleSpeedChange = (e) => {
    const value = parseInt(e.target.value);
    setSpeed(value);
    updateUrl(value);
  };

  const updateUrl = (value) => {
    const newUrl = `${window.location.origin}${window.location.pathname}?speed=${value}`;
    window.history.replaceState(null, "", newUrl);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const sliderValue = parseInt(params.get("speed")) || 1;
    setSpeed(sliderValue);
  }, []);

  const seconds = currentTime.getSeconds();
  const minutes = currentTime.getMinutes();
  const hours = currentTime.getHours();

  const secondDegrees = (seconds / 60) * 360;
  const minuteDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hourDegrees = ((hours + minutes / 60) / 12) * 360;

  const secondStyle = {
    transform: `translateX(-50%) rotate(${secondDegrees}deg)`,
  };

  const minuteStyle = {
    transform: `translateX(-50%) rotate(${minuteDegrees}deg)`,
  };

  const hourStyle = {
    transform: `translateX(-50%) rotate(${hourDegrees}deg)`,
  };

  return (
    <section className="max-w-[600px] w-full overflow-hidden">
      <div className="w-[10rem] h-[10rem] bg-[#FE8C00] rounded-full mx-auto mt-12 relative shadow-2xl">
        <div className="absolute w-3 h-3 rounded-full bg-white z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>
        <div
          style={minuteStyle}
          className="z-2 minute-hand absolute rounded-full w-[0.2rem] h-[45%] bg-red-700 bottom-1/2 left-1/2 origin-bottom "
        ></div>
        <div
          style={hourStyle}
          className="z-3 hour-hand absolute rounded-full w-1 h-[40%] bg-white bottom-1/2 left-1/2 origin-bottom "
        ></div>
        <div
          style={secondStyle}
          className="z-1 second-hand absolute rounded-full w-0.5 h-[46%] bg-black bottom-1/2 left-1/2 origin-bottom "
        ></div>
      </div>

      <input
        type="range"
        min="1"
        max="10"
        value={speed}
        onChange={handleSpeedChange}
        className="w-[60%] mx-auto block mt-[3rem] shadow-2xl  rounded-full accent-[#FE8C00] outline-none"
      />
    </section>
  );
}

export default Clock;
