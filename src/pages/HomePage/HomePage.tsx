import { useEffect, useState } from "react";
import Background from "../../components/layout/Background/Background";
import MainSlider from "../../components/layout/MainSlider/MainSlider";
import AdditionalFeatureSlider from "../../components/layout/AdditionalFeatureSlider/AdditionalFeatureSlider";
import AssurancePackageSlider from "../../components/layout/AssurancePackageSlider/AssurancePackageSlider";
import CarService from "../../services/carService";
import CarCard from "../../components/layout/CarCard/CarCard";
import { GetAllCarsResponse } from "../../models/car/responses/GetAllCarsResponse";

const featureCardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: `Description ${index + 1}`,
  image: `url${index + 1}`,
}));
const assuranceCardsData = Array.from({ length: 10 }, (_, index) => ({
  id: index + 1,
  title: `Card ${index + 1}`,
  description: `Description ${index + 1}`,
  image: `url${index + 1}`,
}));

type Props = {};

const HomePage = (props: Props) => {
  let mainData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to", text2: "your passions" },
  ];

  const [carList, setCarList] = useState<GetAllCarsResponse[]>([]);

  const fetchCars = async () => {
    try {
      await CarService.getAll().then((response: any) => {
        console.log(response);
        setCarList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
  }, []);

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
      <AdditionalFeatureSlider cards={featureCardsData} />
      <AssurancePackageSlider cards={assuranceCardsData} />

      <div className="container mt-5">
        <h2 className="text-center mb-4">Featured Cars</h2>
        <div className="row">
          {carList?.slice(0, 6).map((car: GetAllCarsResponse) => (
            <div key={car.id} className="col-md-4 mb-3">
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
