import "./Background.css";

type Props = {
  playStatus: boolean;
  mainCount: number;
};

const Background: any = ({ playStatus, mainCount }: Props) => {
  if (playStatus) {
    return (
      <video className="background fade-in" autoPlay loop muted>
        <source
          src={process.env.PUBLIC_URL + "/assets/video1.mp4"}
          type="video/mp4"
        />
      </video>
    );
  } else if (mainCount === 0) {
    return (
      <img
        src={process.env.PUBLIC_URL + "/assets/image1.png"}
        className="fade-in"
        alt=""
      />
    );
  } else if (mainCount === 1) {
    return (
      <img
        src={process.env.PUBLIC_URL + "/assets/image2.png"}
        className="fade-in"
        alt=""
      />
    );
  } else if (mainCount === 2) {
    return (
      <img
        src={process.env.PUBLIC_URL + "/assets/image3.png"}
        className="fade-in"
        alt=""
      />
    );
  }
};

export default Background;
