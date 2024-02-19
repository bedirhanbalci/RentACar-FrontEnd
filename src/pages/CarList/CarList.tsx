import { useEffect, useState } from "react";
import CarCard from "../../components/layout/CarCard/CarCard";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import CarService from "../../services/carService";

type Props = {};

const CarList = (props: Props) => {
  const [cars, setCars] = useState<GetByIdCarResponse[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchCars = async () => {
      try {
        setIsLoading(true);
        CarService.getAll().then((response: any) => {
          setCars(response.data.data);
        });
      } catch (error) {
        console.error("Araçlar yüklenirken bir hata oluştu!", error);
        setError("Araçlar yüklenirken bir hata oluştu.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCars();
  }, []);

  if (isLoading) {
    return <div className="container mt-3">Yükleniyor...</div>;
  }

  if (error) {
    return <div className="container mt-3">{error}</div>;
  }

  if (cars.length === 0) {
    return <div className="container mt-3">Hiç araç bulunamadı.</div>;
  }

  return (
    <>
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
            Cars
          </h1>
        </div>
      </section>
      <div className="container mb-5">
        <div className="row">
          {cars.map(car => (
            <div
              key={car.id}
              className="col-lg-4 col-md-4 col-sm-6 col-12 mb-3 mb-sm-0 mt-3"
            >
              <CarCard car={car} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CarList;
