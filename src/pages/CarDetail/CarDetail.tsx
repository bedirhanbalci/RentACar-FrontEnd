import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { GetByIdCarResponse } from '../../models/car/responses/GetByIdCarResponse';
import carService from '../../services/carService';

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
          setIsLoading(true);
          const response = await carService.getById(parseInt(params.id));
          setCar(response.data);
        } catch (err) {
          setError('Araç yüklenirken bir hata oluştu.');
          console.error(err);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchCar();
  }, [params.id]);

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
    <div key={car.id} className="text-bg-light mb-3 col-12 col-md-6 shadow">
    <div className="row g-0">
      <div className="col-md-4">
        <img src="..." className="img-fluid rounded-start" alt={car.modelName}/>
      </div>
      <div className="col-md-8">
        <div className="card-body">
          <h5 className="card-title fw-bold fs-4">{car.modelName}</h5>
          <ul className="list-group list-group-flush">
            <li className="list-group-item">Year: {car.year}</li>
            <li className="list-group-item">Daily Price: {car.dailyPrice}</li>
            <li className="list-group-item">Gear Type: {car.gearType}</li>
            <li className="list-group-item">Fuel Type: {car.fuelType}</li>
            <li className="list-group-item">Color: {car.colorName}</li>
            <li className="list-group-item">Body Type: {car.bodyType}</li>
            <li className="list-group-item">Branch City: {car.branchCity}</li>
            <li className="list-group-item">Plate: {car.plate}</li>
          </ul>
          {/* <link
                to={`/reservation/${car?.id}`}
                className="btn btn-primary "
              > 
              Reservation
              </link> */}
        </div>
      </div>
    </div>
  </div>
)
};

export default CarDetail;