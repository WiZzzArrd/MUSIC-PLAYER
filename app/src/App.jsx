import MainPage from "./pages/MainPage/MainPage";
import style from "./global.module.scss";
import PlayBar from "./components/PlayBar/PlayBar";

const App = () => {
  return (
    <>
      <div className={style.wrapper}>
        <MainPage />
        <PlayBar />
      </div>
    </>
  );
};

export default App;
