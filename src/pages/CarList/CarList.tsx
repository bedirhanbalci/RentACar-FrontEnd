import { useEffect, useState } from "react";
import CarService from "../../services/carService";
import CarCard from "../../components/layout/CarCard/CarCard";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import { GetAllCarsResponse } from "../../models/car/responses/GetAllCarsResponse";
import carService from "../../services/carService";

type Props = {};

const CarList = (props: Props) => {
  const [cars, setCars] = useState<GetAllCarsResponse[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);



  const fetchCars = () => {
    CarService.getAll().then((response: any) => {
      setCars(response.data.data);
    });
  };
  console.log(cars)
  return (
    <div className="container">
       <div className="row">
                {cars.map(car => (
                    <div key={car.id} className="col-lg-3 col-md-6 col-12 mb-5 card my-3">
                        <CarCard car={car} />
                    </div>
                ))}
            </div>
    </div>
);
};

export default CarList;