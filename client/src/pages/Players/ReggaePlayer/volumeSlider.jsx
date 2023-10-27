import { useState, useRef, useEffect } from "react";
import "../slider.css";
import "../thumb.css";
import { AppPass } from "../../../contexts/AppContext";

function VolumeSlider({ percentage = 0, onChange }) {
  const { volume } = AppPass();

  const [position, setPosition] = useState(0);
  const [marginLeft, setMarginLeft] = useState(0);
  const [progressBarWidth, setProgressBarWidth] = useState(0);

  const rangeRef = useRef();
  const thumbRef = useRef();

  useEffect(() => {
    // const rangeWidth = rangeRef.current.getBoundingClientRect().width
    const thumbWidth = thumbRef.current.getBoundingClientRect().width;
    const centerThumb = (thumbWidth / 100) * volume * 1900;
    const centerProgressBar = (thumbWidth / 100) * volume * 2000;
    setPosition(volume);
    setMarginLeft(centerThumb);
    setProgressBarWidth(centerProgressBar);
    console.log({ volume });
  }, [volume]);

  return (
    <div className="slider-container">
      <div
        className="progress-bar-cover"
        style={{
          width: `${progressBarWidth}px`,
        }}
      ></div>
      <div
        className="thumb"
        ref={thumbRef}
        style={{
          left: `${position}%`,
          marginLeft: `${marginLeft}px`,
        }}
      ></div>
      <input
        type="range"
        value={position}
        ref={rangeRef}
        step="0.01"
        max="1"
        min="0"
        className="volumeRange"
        onChange={onChange}
      />
    </div>
  );
}

export default VolumeSlider;
