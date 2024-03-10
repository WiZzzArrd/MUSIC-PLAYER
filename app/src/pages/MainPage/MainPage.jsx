import trackslist from "../../assets/TracksList";
import style from "./main.module.scss";
import Track from "../../components/Track/Track";
import { Input } from "@mui/material";
import { useState } from "react";

function MainPage() {
  const [tracks, setTracks] = useState(trackslist);

  function runSearch(query) {
    if (!query) {
      return trackslist;
    }

    const toLowerCaseQuery = query.toLowerCase();

    return trackslist.filter(
      (item) =>
        item.artists.toLowerCase().includes(toLowerCaseQuery) ||
        item.title.toLowerCase().includes(toLowerCaseQuery)
    );
  }

  function handleChange(query) {
    if (!query.target.value) {
      setTracks(trackslist);
    }

    const foundTracks = runSearch(query.target.value);

    setTracks(foundTracks);
  }

  return (
    <>
      <div className={style.search}>
        <Input
          placeholder='Поиск треков'
          onChange={handleChange}
          className={style.input}
        ></Input>
        <div className={style.list}>
          {tracks.map((item) => (
            <Track key={item.id} {...item}></Track>
          ))}
        </div>
      </div>
    </>
  );
}

export default MainPage;
