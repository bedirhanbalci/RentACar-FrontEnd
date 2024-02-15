import { useDispatch, useSelector } from "react-redux";
import RentalService from "../../services/rentalService";
import { clearRental } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import CarService from "../../services/carService";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import { formatCurrency } from "../../utils/validation/formatCurrency";
import toastr from "toastr";
import { Container } from "reactstrap";

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
    if (authState.id === 0) {
      navigate("/");
      toastr.error("Lütfen kayıt olunuz!");
      return;
    }

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
    <div className="mb-5" style={{ fontFamily: "sans-serif" }}>
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
            Rental
          </h1>
        </Container>
      </section>

      <div className="d-flex flex-row justify-content-center mt-5">
        <div className="border border-1 border-gray rounded col-5 mb-3">
          <img
            src={car?.imagePath}
            alt={`${car?.brandName} ${car?.modelName}`}
            className="card-img-top"
          />
          <div className="card-body">
            <h5 className="card-title" style={{ color: "#c31432" }}>
              {car?.brandName} {car?.modelName}
            </h5>
            <div className="card-text">
              <hr />
              <h6 style={{ color: "#c31432" }}>
                <strong> Car Details:</strong>
              </h6>

              <p>
                <strong>Body Type:</strong> {car?.bodyType}
              </p>
              <p>
                <strong>Gear Type:</strong> {car?.gearType}
              </p>
              <p>
                <strong>Fuel Type:</strong> {car?.fuelType}
              </p>
              <p>
                <strong>Branch City:</strong> {car?.branchCity}
              </p>
              <p>
                <strong>Color:</strong> {car?.colorName}
              </p>
              <p>
                <strong>Year:</strong> {car?.year}
              </p>
              <p>
                <strong>Plate:</strong> {car?.plate}
              </p>
              <hr />
              <h6 style={{ color: "#c31432" }}>
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
