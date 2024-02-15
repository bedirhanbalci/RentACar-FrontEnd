import { Link } from "react-router-dom";
import "./CarCard.css";
import { formatCurrency } from "../../../utils/formatCurrency";
type Props = { car: any };

const CarCard = ({ car }: Props) => {
  return (
    <div key={car.id} className="card" style={{ width: "24 rem" }}>
      <img src={car.imagePath} className="card-img-top" alt={car.modelName} />
      <div className="card-body">
        <p className=" fw-bold" style={{ color: "#c31432" }}>
          {car.brandName} {car.modelName}
        </p>
      </div>
      <ul className="list-group list-group-flush no-border">
        <li className="list-group-item">
          <i className="bi bi-calendar text-muted" /> Year: {car.year}
        </li>
        <li className="list-group-item">
          <i className="bi bi-tag text-muted" /> Daily Price:{" "}
          {formatCurrency(car.dailyPrice)}
        </li>

        <li className="list-group-item">
          <i className="bi bi-gear text-muted" /> Gear Type: {car.gearType}
        </li>
        <li className="list-group-item">
          <i className="bi bi-fuel-pump text-muted" /> Fuel Type: {car.fuelType}
        </li>
      </ul>
      <div className="card-body">
        <Link to={`/car-detail/${car.id}`} className="btn btn-danger rounded-4">
          Car Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
