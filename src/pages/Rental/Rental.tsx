import { useDispatch, useSelector } from "react-redux";
import RentalService from "../../services/rentalService";
import { clearRental } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CarService from "../../services/carService";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import { formatCurrency } from "../../utils/formatCurrency";
import toastr from "toastr";
import { toast } from "react-toastify";

type Props = {};

const Rental = (props: Props) => {
  const [car, setCar] = useState<GetByIdCarResponse>();
  const rentalState = useSelector((store: any) => store.rental);
  const authState = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [totalPrice, settotalPrice] = useState(0);

  const fetchCar = async () => {
    try {
      await CarService.getById(parseInt(rentalState.carId)).then(
        (response: any) => {
          setCar(response.data.data);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    settotalPrice(
      rentalState.additionalPriceWithTotalPrice +
        rentalState.assurancePriceWithTotalPrice
    );
    fetchCar();
  }, []);

  const sendRental = async (): Promise<any> => {
    if (authState.id === 0) {
      navigate("/");
      toastr.error("Lütfen kayıt olunuz!");
      return;
    }

    type RequestData = {
      startDate: any;
      endDate: any;
      userId: any;
      carId: any;
      assurancePackageId?: any;
      additionalList?: any;
    };

    const requestData: RequestData = {
      startDate: rentalState.startDate.startDate,
      endDate: rentalState.endDate.endDate,
      userId: authState.id,
      carId: rentalState.carId,
    };

    if (rentalState.assurance) {
      requestData.assurancePackageId = rentalState.assurance;
    }

    if (rentalState.additional) {
      requestData.additionalList = rentalState.additional;
    }

    try {
      const response = await RentalService.add(requestData);

      dispatch(clearRental());
      navigate("/order-complete", {
        state: { invoice: response.data, totalPrice: totalPrice },
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="mb-5" style={{ fontFamily: "sans-serif" }}>
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
            Rental
          </h1>
        </div>
      </section>

      <div className="d-flex flex-row justify-content-center mt-5">
        <div className="border border-2 border-gray rounded col-5 mb-3">
          <img
            src={car?.imagePath}
            alt={`${car?.brandName} ${car?.modelName}`}
            className="img-fluid rounded"
          />
          <div className="card-body">
            <h5 className="card-title text-danger">
              {car?.brandName} {car?.modelName}
            </h5>
            <div className="card-text">
              <hr />
              <h6 className="text-danger">
                <strong> Car Details:</strong>
              </h6>
              <p>
                <strong>Year:</strong> {car?.year}
              </p>
              <p>
                <strong>Gear Type:</strong> {car?.gearType}
              </p>
              <p>
                <strong>Fuel Type:</strong> {car?.fuelType}
              </p>
              <p>
                <strong>Body Type:</strong> {car?.bodyType}
              </p>
              <p>
                <strong>Color:</strong> {car?.colorName}
              </p>
              <p>
                <strong>Branch City:</strong> {car?.branchCity}
              </p>

              <p>
                <strong>Plate:</strong> {car?.plate}
              </p>
              <hr />
              <h6 className="text-danger">
                <strong>Rental Details:</strong>
              </h6>
              <p>
                <strong>Start Date:</strong> {rentalState.startDate.startDate}
              </p>
              <p>
                <strong>End Date:</strong> {rentalState.endDate.endDate}
              </p>
              <p>
                <strong>Assurance Price:</strong>{" "}
                {formatCurrency(
                  rentalState.assurancePriceWithTotalPrice -
                    rentalState.rentalPrice
                )}
              </p>
              <p>
                <strong>Additional Price:</strong>{" "}
                {formatCurrency(rentalState.additionalPriceWithTotalPrice)}
              </p>
              <p>
                <strong>Car Price:</strong>{" "}
                {formatCurrency(rentalState.rentalPrice)}
              </p>

              <p>
                <strong>Total Price:</strong>{" "}
                {formatCurrency(
                  rentalState.assurancePriceWithTotalPrice +
                    rentalState.additionalPriceWithTotalPrice
                )}
              </p>
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
    </div>
  );
};

export default Rental;
