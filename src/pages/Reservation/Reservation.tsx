import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CarService from "../../services/carService";
import { useDispatch } from "react-redux";
import {
  addCarId,
  addRental,
  addRentalPrice,
} from "../../store/slices/rentalSlice";
import { formatCurrency } from "../../utils/formatCurrency";
import RentalService from "../../services/rentalService";
import BranchService from "../../services/branchService";
import { toast } from "react-toastify";

type Props = {};

type CarSearchValues = {
  startDate: string;
  endDate: string;
};

export const Reservation = (props: Props) => {
  const location = useLocation();
  const { branch } = location.state || {};
  const { id } = useParams();
  const [car, setCar] = useState<GetByIdCarResponse>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [initialValues, setInitialValues] = useState<CarSearchValues>({
    startDate: "",
    endDate: "",
  });
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const fetchCar = async () => {
    try {
      await CarService.getById(parseInt(`${id}`)).then((response: any) => {
        setCar(response.data.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  const fetchCarByBrandId = async () => {
    try {
      await BranchService.getCarById(parseInt(`${branch}`)).then(
        (response: any) => {
          setCar(response.data.data);
        }
      );
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  const fetchTotalPrice = async () => {
    try {
      await CarService.addTotalPrice({
        carId: car?.id,
        startDate: initialValues.startDate,
        endDate: initialValues.endDate,
      }).then((response: any) => {
        setTotalPrice(response.data);
      });
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    if (
      car?.id &&
      initialValues.startDate !== "" &&
      initialValues.endDate !== ""
    )
      fetchTotalPrice();
  }, [initialValues]);

  useEffect(() => {
    if (parseInt(id ? id : "0") > 0) fetchCar();
    if (branch > 0) fetchCarByBrandId();
  }, []);

  const validationSchema = Yup.object({
    startDate: Yup.string().required("Start date field is required."),
    endDate: Yup.string().required("End date field is required."),
  });

  const handleOnSubmit = async (values: CarSearchValues) => {
    let name;
    await RentalService.dateValid({
      startDate: initialValues.startDate,
      endDate: initialValues.endDate,
    }).then((response: any) => {
      name = response.name;
    });
    if (name !== "AxiosError") {
      dispatch(addRental(values));
      dispatch(addCarId(car?.id));
      dispatch(addRentalPrice(totalPrice));
      navigate("/assurance-package");
    }
  };

  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container row justify-content-center align-items-center mt-5 mb-5 pt-5 pb-5">
      <div className="col-12 col-md-6 ">
        <img className="img-fluid rounded" src={car?.imagePath} alt="" />
      </div>
      <div className="col-12 col-md-6 border rounded border-3 p-md-5">
        <div className="text-center text-danger fs-1 text-capitalize fw-bolder">
          {car?.brandName} {car?.modelName}
        </div>
        <div>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleOnSubmit}
          >
            {({ values, handleChange, handleBlur }) => (
              <Form className="container mt-4">
                <div className="row">
                  <div className="mb-3">
                    <label htmlFor="startDate" className="form-label fw-bold">
                      {"Start Date"}
                    </label>
                    <Field
                      type="date"
                      id="startDate"
                      name="startDate"
                      className="form-control"
                      onChange={(e: any) => {
                        onChangeInput(handleChange, e, values);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="startDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="endDate" className="form-label fw-bold">
                      {"End Date"}
                    </label>
                    <Field
                      type="date"
                      id="endDate"
                      name="endDate"
                      className="form-control"
                      onChange={(e: any) => {
                        onChangeInput(handleChange, e, values);
                      }}
                      onBlur={handleBlur}
                    />
                    <ErrorMessage
                      name="endDate"
                      component="div"
                      className="text-danger"
                    />
                  </div>
                  {totalPrice !== 0 && (
                    <div> Total Price : {formatCurrency(totalPrice)}</div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <button
                    type="submit"
                    className="btn btn-danger rounded-4 btn-lg"
                  >
                    Pay Now
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};
