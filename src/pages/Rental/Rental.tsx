import { useDispatch, useSelector } from "react-redux";
import RentalService from "../../services/rentalService";
import { clearRental } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CarService from "../../services/carService";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import { formatCurrency } from "../../utils/validation/formatCurrency";

type Props = {};

const Rental = (props: Props) => {
  const [car, setCar] = useState<GetByIdCarResponse>();
  const rentalState = useSelector((store: any) => store.rental);
  const authState = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchCar = async () => {
    try {
      await CarService.getById(parseInt(rentalState.carId)).then(
        (response: any) => {
          console.log(response);
          setCar(response.data.data);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const sendRental = async (): Promise<any> => {
    try {
      const response = await RentalService.add({
        startDate: rentalState.startDate.startDate,
        endDate: rentalState.endDate.endDate,
        assurancePackageId: rentalState.assurance,
        additionalList: rentalState.additional,
        userId: authState.id,
        carId: rentalState.carId,
      });

      dispatch(clearRental());
      navigate("/order-complete", {
        state: { invoice: response.data },
      });
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-row justify-content-center mt-5">
      <div className="border border-1 border-gray rounded col-5 mb-3">
        <img
          src={car?.imagePath}
          alt={`${car?.brandName} ${car?.modelName}`}
          className="card-img-top"
        />
        <div className="card-body">
          <h5 className="card-title">
            {car?.brandName} {car?.modelName}
          </h5>
          <div className="card-text">
            <hr />
            <p>
              <strong>Start Date:</strong> {rentalState.startDate.startDate}
            </p>
            <p>
              <strong>End Date:</strong> {rentalState.endDate.endDate}
            </p>
            <p>
              <strong>Total Assurance Price:</strong>{" "}
              {formatCurrency(
                rentalState.assurancePriceWithTotalPrice -
                  rentalState.rentalPrice
              )}
            </p>
            <p>
              <strong>Rental Price:</strong>{" "}
              {formatCurrency(rentalState.rentalPrice)}
            </p>
            <hr />
            <p>
              <strong>Details:</strong>
            </p>
            <ul className="list-group">
              <li className="list-group-item">
                <strong>Body Type:</strong> {car?.bodyType}
              </li>
              <li className="list-group-item">
                <strong>Gear Type:</strong> {car?.gearType}
              </li>
              <li className="list-group-item">
                <strong>Fuel Type:</strong> {car?.fuelType}
              </li>
              <li className="list-group-item">
                <strong>Branch City:</strong> {car?.branchCity}
              </li>
              <li className="list-group-item">
                <strong>Color:</strong> {car?.colorName}
              </li>
              <li className="list-group-item">
                <strong>Year:</strong> {car?.year}
              </li>
              <li className="list-group-item">
                <strong>Plate:</strong> {car?.plate}
              </li>
            </ul>
          </div>
          <button
            onClick={() => {
              sendRental();
            }}
            className="btn btn-danger rounded-4 btn-lg mt-3"
          >
            Order Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Rental;
