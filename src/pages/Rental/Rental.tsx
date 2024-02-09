import { useDispatch, useSelector } from "react-redux";
import RentalService from "../../services/rentalService";
import { clearRental } from "../../store/slices/rentalSlice";
import { useNavigate } from "react-router-dom";

type Props = {};

const Rental = (props: Props) => {
  const rentalState = useSelector((store: any) => store.rental);
  const authState = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      navigate("/order-complete");
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <button
        onClick={() => {
          sendRental();
        }}
        className="btn btn-danger"
      >
        Order Confirmed
      </button>
    </>
  );
};

export default Rental;
