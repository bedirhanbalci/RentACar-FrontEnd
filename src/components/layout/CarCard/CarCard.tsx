import React from "react";
import { GetByIdCarResponse } from "../../../models/car/responses/GetByIdCarResponse";
import CarService from "../../../services/carService";
import { HttpStatusCode } from "axios";
import { Link } from "react-router-dom";

type Props = {
  car: GetByIdCarResponse;
  onDelete: (id: number) => void;
  title?: string;
};

const CarCard = (props: Props) => {
  const deleteCar = async () => {
    try {
      let response = await CarService.delete(props.car.id);
      if (response.status == HttpStatusCode.Ok) {
        props.onDelete(props.car.id);
        alert("Veri başarıyla silindi.");
      }
    } catch (error) {
      alert("Veri silinemedi!");
    }
  };

  return (
    <div className="card">
      <img src={props.car.imagePath} className="card-img-top" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.car.modelName}</h5>
        <p className="card-text">{props.car.colorName}</p>
        <p>{props.car.branchCity} ₺</p>
        <Link
          to={"/product-detail/" + props.car.id}
          className="btn btn-primary"
        >
          Details
        </Link>
      </div>
    </div>
  );
};

export default CarCard;
