import { Link } from "react-router-dom";
type Props = { car: any };

const CarCard = ({ car }: Props) => {
  return (
    <div key={car.id} className="card" style={{ width: "24 rem" }}>
      <img src={car.imagePath} className="card-img-top" alt={car.modelName} />
      <div className="card-body">
        <p className="card-text text-danger">{car.modelName}</p>
      </div>
      <ul className="list-group list-group-flush no-border">
        <li className="list-group-item">Year: {car.year}</li>
        <li className="list-group-item">Daily Price: {car.dailyPrice}</li>
        <li className="list-group-item">Gear Type: {car.gearType}</li>
        <li className="list-group-item">Fuel Type: {car.fuelType}</li>
      </ul>
      <div className="card-body">
        <Link to={`/car-detail/${car.id}`} className="btn btn-danger">
          {" "}
          Car Details{" "}
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
