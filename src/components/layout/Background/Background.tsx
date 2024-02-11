import "./Background.css";

type Props = {
  playStatus: boolean;
  mainCount: number;
};

const Background: any = ({ playStatus, mainCount }: Props) => {
  if (playStatus) {
    return (
      <div>
        <video className="background fade-in" autoPlay loop muted>
          <source src={"/assets/video1.mp4"} type="video/mp4" />
        </video>
      </div>
    );
  } else if (mainCount === 0) {
    return (
      <img src={"/assets/image1.png"} className="fade-in background" alt="" />
    );
  } else if (mainCount === 1) {
    return (
      <img src={"/assets/image2.png"} className="fade-in background" alt="" />
    );
  } else if (mainCount === 2) {
    return (
      <img src={"/assets/image3.png"} className="fade-in background" alt="" />
    );
  }
};

export default Background;
