import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import CarService from "../../services/carService";

import { formatCurrency } from "../../utils/validation/formatCurrency";
import { Container } from "react-bootstrap";

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
    <div style={{ fontFamily: "sans-serif" }}>
      <section
        className="page-header mb-5"
        style={{
          background: `linear-gradient(to top, #c31432, #ff4e50)`,
          minHeight: "80px",
        }}
      >
        <Container
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
        </Container>
      </section>
      <div key={car.id} className="container mb-3 col-12 col-md-6 shadow">
        <div className="row g-0 border bg-white rounded border-3 p-md-5">
          <div className="col-md-4">
            <img
              src={car.imagePath}
              className="img-fluid rounded-start"
              alt={car.modelName}
            />
          </div>
          <div className="col-md-8 mb-3">
            <div className="card-body">
              <h5 className="card-title fw-bold fs-4">
                {car.brandName} {car.modelName}
              </h5>

              <ul className="list-group list-group-flush">
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ffcccc" }}
                >
                  Year: {car.year}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ffcccc" }}
                >
                  Daily Price: {formatCurrency(car.dailyPrice)}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ffcccc" }}
                >
                  Gear Type: {car.gearType}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ffcccc" }}
                >
                  Fuel Type: {car.fuelType}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ff9999" }}
                >
                  Color: {car.colorName}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#ffcccc" }}
                >
                  Body Type: {car.bodyType}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#fffdd0" }}
                >
                  Branch City: {car.branchCity}
                </li>
                <li
                  className="list-group-item"
                  style={{ backgroundColor: "#f5f5dc" }}
                >
                  Plate: {car.plate}
                </li>
              </ul>
              <div className="d-grid gap-2 d-md-block mt-3">
                <Link
                  to={`/reservation/${car?.id}`}
                  className="btn btn-primary btn-lg"
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
