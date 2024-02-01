import { useEffect, useState } from "react";
import Background from "../../components/layout/Background/Background";
import MainSlider from "../../components/layout/MainSlider/MainSlider";

type Props = {};

const HomePage = (props: Props) => {
  let mainData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to", text2: "your passions" },
  ];

  const [mainCount, setMainCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  useEffect(() => {
    setInterval(() => {
      setMainCount(count => {
        return count === 2 ? 0 : count + 1;
      });
    }, 3000);
  }, []);
  return (
    <div>
      <Background playStatus={playStatus} mainCount={mainCount} />
      <MainSlider
        setPlayStatus={setPlayStatus}
        mainData={mainData[mainCount]}
        mainCount={mainCount}
        setMainCount={setMainCount}
        playStatus={playStatus}
      />
    </div>
  );
};

export default HomePage;
