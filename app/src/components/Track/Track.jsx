import style from "./track.module.scss";
import { IconButton } from "@mui/material";
import { PlayArrow, Pause } from "@mui/icons-material";
import secondsToMMSS from "../../utils/secondsToMMSS";
import { useContext } from "react";
import { AudioContext } from "../../context/AudioContext";
import cn from "classnames";

function Track(track) {
  const { id, src, preview, title, artists, duration } = track;

  const { currentTrack, handleToggleAudio, isPlaying } =
    useContext(AudioContext);

  const isCurrentTrack = currentTrack.id === track.id;

  const formattedDuration = secondsToMMSS(duration);

  return (
    <div className={cn(style.track, isCurrentTrack && style.playing)}>
      <IconButton onClick={() => handleToggleAudio(track)}>
        {isCurrentTrack && isPlaying ? (
          <Pause></Pause>
        ) : (
          <PlayArrow></PlayArrow>
        )}
      </IconButton>
      <img className={style.preview} src={preview} alt='' />

      <div className={style.credits}>
        <b>{title}</b>
        <p>{artists}</p>
      </div>

      <p>{formattedDuration}</p>
    </div>
  );
}

export default Track;
