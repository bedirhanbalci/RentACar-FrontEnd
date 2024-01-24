import { useEffect, useState } from "react";
import CarService from "../../services/carService";
import CarCard from "../../components/layout/CarCard/CarCard";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";

type Props = {};

const CarList = (props: Props) => {
  const [cars, setCars] = useState<GetByIdCarResponse[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const onCarDelete = (id: number) => {
    setCars(cars.filter(i => i.id !== id));
  };

  const fetchCars = () => {
    CarService.getAll().then((response: any) => {
      setCars(response.data.cars);
    });
  };

  return (
    <div className="container mt-5">
      <div className="row">
        {cars.map(car => (
          <div key={car.id} className="col-lg-3 col-md-6 col-12 mb-5">
            <CarCard onDelete={onCarDelete} car={car} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarList;
