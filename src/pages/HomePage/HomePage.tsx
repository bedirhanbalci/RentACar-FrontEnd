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
import { toast } from "react-toastify";

type Props = {};

const HomePage = (props: Props) => {
  let mainData = [
    { text1: "Miles of", text2: "Happiness" },
    { text1: "Rent the Car", text2: "of Your Dreams" },
    { text1: "Turn the Key", text2: "to Freedom" },
  ];

  const [carList, setCarList] = useState<GetAllCarsResponse[]>([]);
  const [assuranceList, setAssuranceList] = useState<
    GetAllAssurancePackagesResponse[]
  >([]);
  const [additionalList, setAdditionalList] = useState<
    GetAllAdditionalFeaturesResponse[]
  >([]);

  const [mainCount, setMainCount] = useState(0);
  const [playStatus, setPlayStatus] = useState(false);

  const fetchCars = async () => {
    try {
      await CarService.getAll().then((response: any) => {
        setCarList(response.data.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchAssurance = async () => {
    try {
      await AssurancePackageService.getAll().then((response: any) => {
        setAssuranceList(response.data.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchAdditional = async () => {
    try {
      await AdditionalFeatureService.getAll().then((response: any) => {
        setAdditionalList(response.data.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchCars();
    fetchAssurance();
    fetchAdditional();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setMainCount(count => (count === 2 ? 0 : count + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [mainCount, setMainCount]);
  return (
    <div className="overflow-x-hidden d-flex flex-column">
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

      <div className="d-block">
        <h2 className="text-center text-danger fw-bold pt-5 pb-2">Extras</h2>
        <CampaignSlider cards={additionalList} />
        <h2 className="text-center text-danger fw-bold pt-5 pb-2">Coverages</h2>
        <CampaignSlider cards={assuranceList} />
      </div>

      <div className="container mt-5">
        <h2 className="text-center text-danger fw-bold mb-4">Featured Cars</h2>
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
