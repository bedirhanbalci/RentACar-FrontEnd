import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { GetByIdCarResponse } from "../../models/car/responses/GetByIdCarResponse";
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from "formik";
import CarService from "../../services/carService";
import { useDispatch } from "react-redux";
import { addRental } from "../../store/slices/rentalSlice";

type Props = {};

type CarSearchValues = {
  startDate: string;
  endDate: string;
};

export const Reservation = (props: Props) => {
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
        console.log(response);
        setCar(response.data.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCar();
  }, []);

  const validationSchema = Yup.object({
    startDate: Yup.string().required(),
    endDate: Yup.string().required(),
  });

  const handleOnSubmit = async (values: CarSearchValues) => {
    dispatch(addRental(values));
    navigate("/assurance-package");
  };

  const onChangeInput = (handleChange: any, e: any, values: any) => {
    handleChange(e);
    setInitialValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="container row  justify-content-center align-items-center">
      <div className="col-12 col-md-6 ">
        <img className="img-fluid rounded" src={car?.imagePath} alt="" />
      </div>
      <div className="col-12 col-md-6 border   rounded border-3 p-md-5">
        <div className="text-center fs-1 text-capitalize fw-bolder">
          {car?.brandName}
        </div>
        <div className="text-center fs-1 text-capitalize fw-bolder">
          {car?.modelName}
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
                    <label htmlFor="startDate" className="form-label">
                      {"Rental Date"}
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
                    <label htmlFor="endDate" className="form-label">
                      {"Return Date"}
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
                  {totalPrice !== 0 && <div> Total Price : {totalPrice}</div>}
                </div>

                <div className="text-center mt-4">
                  <button type="submit" className="btn btn-primary">
                    Continue
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
