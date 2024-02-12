import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import CarService from "../../services/carService";
import { formatCurrency } from "../../utils/validation/formatCurrency";

type Props = {};

const CarDetail = (props: Props) => {
  const params = useParams<{ id: string }>();
  const [car, setCar] = useState<GetByIdCarResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCar = async () => {
      if (params.id) {
        try {
          await CarService.getById(parseInt(params.id)).then(
            (response: any) => {
              console.log(response);
              setCar(response.data.data);
            }
          );
        } catch (err) {
          setError("Araç yüklenirken bir hata oluştu.");
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCar();
  }, [params.id]);

  useEffect(() => {
    console.log(car);
  }, [car]);

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  if (error) {
    return <div>Hata: {error}</div>;
  }

  if (!car) {
    return <div>Araç bulunamadı.</div>;
  }

  return (
    <div
      key={car.id}
      className="container text-bg-light mb-3 col-12 col-md-6 shadow mt-5 mb-5 pt-5 pb-5"
    >
      <div className="row g-0 bg-white">
        <div className="col-md-4">
          <img
            src={car.imagePath}
            className="img-fluid rounded-start"
            alt={car.modelName}
          />
        </div>
        <div className="col-md-8 mb-3">
          <div
            // style={{ backgroundColor: "#fff5f7", borderColor: "#fff5f7" }}
            className="card-body"
          >
            <h5 className="card-title fw-bold fs-4">
              {car.brandName} {car.modelName}
            </h5>
            <ul className="list-group">
              <li className="list-group-item">Year: {car.year}</li>
              <li className="list-group-item">
                Daily Price: {formatCurrency(car.dailyPrice)}
              </li>
              <li className="list-group-item">Gear Type: {car.gearType}</li>
              <li className="list-group-item">Fuel Type: {car.fuelType}</li>
              <li className="list-group-item">Color: {car.colorName}</li>
              <li className="list-group-item">Body Type: {car.bodyType}</li>
              <li className="list-group-item">Branch City: {car.branchCity}</li>
              <li className="list-group-item">Plate: {car.plate}</li>
            </ul>
            <div className="d-grid gap-2 d-md-block mt-3">
              <Link
                to={`/reservation/${car?.id}`}
                className="btn btn-danger rounded-4 btn-lg"
              >
                Rent Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDetail;
