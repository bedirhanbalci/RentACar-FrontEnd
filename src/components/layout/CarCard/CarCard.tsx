import { Link } from "react-router-dom";
import "./CarCard.css";
type Props = { car: any };

const CarCard = ({ car }: Props) => {
  return (
    <div key={car.id} className="card" style={{ width: "18rem" }}>
      <img src={car.imagePath} className="card-img-top" alt={car.modelName} />
      <div className="card-body">
        <h5 className="card-title">
          {car.brandName} {car.modelName}
        </h5>
      </div>
      <ul className="list-group list-group-flush">
        <li className="list-group-item">Year: ${car.year}</li>
        <li className="list-group-item">Daily Price: ${car.dailyPrice}</li>
        <li className="list-group-item">Gear Type: {car.gearType}</li>
        <li className="list-group-item">Fuel Type: {car.fuelType}</li>
      </ul>
      <div className="card-body">
        <Link to={`/car-detail/${car.id}`} className="btn btn-primary">
          {" "}
          Car Details{" "}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
