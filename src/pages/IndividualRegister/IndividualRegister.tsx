import { Formik, Form } from "formik";
import * as Yup from "yup";
import { passwordRule } from "../../utils/validation/customValidationRules";
import FormikInput from "../../components/common/FormikInput/FormikInput";

type Props = {};

interface IndividualRegisterForm {
  firstName: string;
  lastName: string;
  nationalityNo: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
}

const IndividualRegister = (props: Props) => {
  // const dispatch = useDispatch();

  const initialValues: IndividualRegisterForm = {
    firstName: "",
    lastName: "",
    nationalityNo: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name field is required.")
      .min(2, "First name must be at least 2 characters long.")
      .max(50, "First name must be at most 50 characters long."),
    lastName: Yup.string()
      .required("Last name field is required.")
      .min(2, "Last name must be at least 2 characters long.")
      .max(50, "Last name must be at most 50 characters long."),
    nationalityNo: Yup.string()
      .required("Nationality number field is required.")
      .min(11, "Nationality number must be exactly 11 characters long.")
      .max(11, "Nationality number must be exactly 11 characters long."),
    birthDate: Yup.string().required("Birth date field is required."),

    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid phone number")
      .required("Phone number field is required."),
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email field is required."),
    password: Yup.string()
      .required("Password field is required.")
      .min(8, "Password must be at least 8 characters long.")
      .test(
        "is strong",
        "Password must contain at least one uppercase letter, one lowercase letter, and one number!",
        passwordRule
      ),
  });

  return (
    <div className="container">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          // dispatch(addProduct(values));
          console.log(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="col-6 mx-auto">
              <FormikInput
                label="First Name"
                name="firstName"
                placeholder="Please write the product name!"
              />

              <FormikInput
                label="Last Name"
                name="lastName"
                placeholder="Please write the product description!"
              />

              <FormikInput
                label="Nationality Number"
                name="nationalityNo"
                placeholder="Please write the product price!"
              />

              <FormikInput
                label="Birth Date"
                name="birthDate"
                type="date"
                placeholder="Please write the product stock condition!"
              />

              <button className="btn btn-success mt-3" type="submit">
                Add
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default IndividualRegister;
