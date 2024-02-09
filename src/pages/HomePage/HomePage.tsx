import { useEffect, useState } from "react";
import Background from "../../components/layout/Background/Background";
import MainSlider from "../../components/layout/MainSlider/MainSlider";
import CampaignSlider from "../../components/layout/CampaignSlider/CampaignSlider";
import CarService from "../../services/carService";
import CarCard from "../../components/layout/CarCard/CarCard";
import { GetAllCarsResponse } from "../../models/car/responses/GetAllCarsResponse";
import AssurancePackageService from "../../services/assurancePackageService";
import { GetAllAssurancePackagesResponse } from "../../models/assurancePackage/responses/GetAllAssurancePackagesResponse";
import { GetAllAdditionalFeaturesResponse } from "../../models/additionalFeature/responses/GetAllAdditionalFeaturesResponse";
import AdditionalFeatureService from "../../services/additionalFeatureService";

type Props = {};

const HomePage = (props: Props) => {
  let mainData = [
    { text1: "Dive into", text2: "what you love" },
    { text1: "Indulge", text2: "your passions" },
    { text1: "Give in to", text2: "your passions" },
  ];

  const [carList, setCarList] = useState<GetAllCarsResponse[]>([]);
  const [assuranceList, setAssuranceList] = useState<
    GetAllAssurancePackagesResponse[]
  >([]);
  const [additionalList, setAdditionalList] = useState<
    GetAllAdditionalFeaturesResponse[]
  >([]);

  const fetchCars = async () => {
    try {
      await CarService.getAll().then((response: any) => {
        setCarList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssurance = async () => {
    try {
      await AssurancePackageService.getAll().then((response: any) => {
        setAssuranceList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAdditional = async () => {
    try {
      await AdditionalFeatureService.getAll().then((response: any) => {
        setAdditionalList(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchAssurance();
    fetchAdditional();
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
      <CampaignSlider cards={additionalList} />
      <CampaignSlider cards={assuranceList} />

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
