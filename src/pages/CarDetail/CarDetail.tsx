import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import CarService from "../../services/carService";
import { formatCurrency } from "../../utils/formatCurrency";

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

  if (isLoading) {
    return <div>Lodading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!car) {
    return <div>Car not found!</div>;
  }

  return (
    <div style={{ fontFamily: "sans-serif" }}>
      <section
        className="page-header mb-5"
        style={{
          background: `linear-gradient(to top, #c31432, #ff4e50)`,
          minHeight: "80px",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "80px",
            textAlign: "center",
          }}
        >
          <h1
            className="title"
            style={{
              color: "white",
              fontFamily: '"Open Sans", sans-serif',
              fontSize: "25px",
              fontWeight: "bold",
            }}
          >
            Car Details
          </h1>
        </div>
      </section>

      <div
        key={car.id}
        className="container border border-3 rounded mb-3 col-12 col-md-6 shadow p-md-5 mb-5 pt-5"
      >
        <div className="row g-0">
          <div className="col-md-5">
            <img
              src={car.imagePath}
              className="img-fluid  rounded-start zoom"
              style={{
                transform: "scale(1.15) translateY(20px) translateX(-15px)",
              }}
              alt={car.modelName}
            />
          </div>
          <div className="col-md-7 mb-3">
            <div className="card-body">
              <h5 className="card-title text-danger fw-bold fs-4">
                {car.brandName} {car.modelName}
              </h5>

              <ul className="list-group list-group-flush border border-1">
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Year: {car.year}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Daily Price: {formatCurrency(car.dailyPrice)}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Gear Type: {car.gearType}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Fuel Type: {car.fuelType}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Body Type: {car.bodyType}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Color: {car.colorName}
                </li>

                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Branch City: {car.branchCity}
                </li>
                <li
                  className="list-group-item border-bottom"
                  style={{ backgroundColor: "#fafaf5" }}
                >
                  Plate: {car.plate}
                </li>
              </ul>
              <div className="d-grid gap-2 d-md-block mt-3">
                <Link
                  to={`/reservation/${car?.id}`}
                  className="btn btn-danger rounded-4 "
                >
                  Reservation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CarDetail;
