import { useContext, useState, useEffect } from "react";
import { AudioContext } from "../../context/AudioContext";
import style from "./playbar.module.scss";
import { Slider } from "@mui/material";
import { Pause, PlayArrow } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import secondsToMMSS from "../../utils/secondsToMMSS";

function PlayBar() {
  const { audio, handleToggleAudio, currentTrack, isPlaying } =
    useContext(AudioContext);

  const { title, artists, preview, duration } = currentTrack;

  const [currentTime, setCurrentTime] = useState(0);

  const formattedDuration = secondsToMMSS(duration);

  const sliderCurrentTime = Math.round((currentTime / duration) * 100);

  const formattedCurrentTime = secondsToMMSS(currentTime);

  function handleChangeCurrentTime(_, value) {
    const time = Math.round((value / 100) * duration);
    setCurrentTime(time);
    audio.currentTime = time;
  }

  useEffect(() => {
    const timeInterval = setInterval(() => {
      setCurrentTime(audio.currentTime);
    }, 1000);

    return () => {
      clearInterval(timeInterval);
    };
  }, []);

  return (
    currentTrack.length !== 0 && (
      <div className={style.playbar}>
        <img className={style.preview} src={preview} alt='' />

        <IconButton onClick={() => handleToggleAudio(currentTrack)}>
          {isPlaying ? <Pause></Pause> : <PlayArrow></PlayArrow>}
        </IconButton>

        <div className={style.credits}>
          <h4>{title}</h4>
          <p>{artists}</p>
        </div>

        <div className={style.slider}>
          <p>{formattedCurrentTime}</p>
          <Slider
            step={1}
            min={0}
            value={sliderCurrentTime}
            max={100}
            onChange={handleChangeCurrentTime}
          ></Slider>
          <p>{formattedDuration}</p>
        </div>
      </div>
    )
  );
}

export default PlayBar;
