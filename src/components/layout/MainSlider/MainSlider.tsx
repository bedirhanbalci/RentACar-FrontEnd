import "./MainSlider.css";

type Props = {
  mainData: { text1: string; text2: string };
  setMainCount: React.Dispatch<React.SetStateAction<number>>;
  mainCount: number;
  setPlayStatus: React.Dispatch<React.SetStateAction<boolean>>;
  playStatus: boolean;
};

const MainSlider: any = ({
  mainData,
  setMainCount,
  mainCount,
  setPlayStatus,
  playStatus,
}: Props) => {
  return (
    <div className="main d-flex flex-column justify-content-end gap-5">
      <div className="hero-text display-3 text-light">
        <p>{mainData.text1}</p>
        <p>{mainData.text2}</p>
      </div>
      <div className="main-explore">
        <p>Explore the features</p>
        <img src={"/assets/arrow_btn.png"} alt="" />
      </div>
      <div className="main-dot-play">
        <ul className="main-dots">
          <li
            onClick={() => setMainCount(0)}
            className={mainCount === 0 ? "main-dot orange" : "main-dot"}
          ></li>
          <li
            onClick={() => setMainCount(1)}
            className={mainCount === 1 ? "main-dot orange" : "main-dot"}
          ></li>
          <li
            onClick={() => setMainCount(2)}
            className={mainCount === 2 ? "main-dot orange" : "main-dot"}
          ></li>
        </ul>
        <div className="main-play">
          <img
            onClick={() => setPlayStatus(!playStatus)}
            src={
              playStatus ? "/assets/pause_icon.png" : "/assets/play_icon.png"
            }
            alt=""
          />
          <p>See the video</p>
        </div>
      </div>
    </div>
  );
};

export default MainSlider;
