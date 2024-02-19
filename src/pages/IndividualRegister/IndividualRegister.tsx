import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { passwordRule } from "../../utils/validation/customValidationRules";
import FormikInput from "../../components/common/FormikInput/FormikInput";
import { toast } from "react-toastify";
import AuthService from "../../services/authService";
import { useNavigate } from "react-router-dom";

type Props = {};

export interface IndividualRegisterForm {
  firstName: string;
  lastName: string;
  nationalityNo: string;
  birthDate: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const IndividualRegister = (props: Props) => {
  const initialValues: IndividualRegisterForm = {
    firstName: "",
    lastName: "",
    nationalityNo: "",
    birthDate: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string()
      .required("First name field is required!")
      .min(2, "First name must be at least 2 characters long!")
      .max(50, "First name must be at most 50 characters long!"),
    lastName: Yup.string()
      .required("Last name field is required!")
      .min(2, "Last name must be at least 2 characters long!")
      .max(50, "Last name must be at most 50 characters long!"),
    nationalityNo: Yup.string()
      .required("Nationality number field is required!")
      .min(11, "Nationality number must be exactly 11 characters long!")
      .max(11, "Nationality number must be exactly 11 characters long!"),
    birthDate: Yup.string().required("Birth date field is required!"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{10}$/, "Please enter a valid phone number!")
      .required("Phone number field is required!"),
    email: Yup.string()
      .email("Please enter a valid email address!")
      .required("Email field is required!"),
    password: Yup.string()
      .required("Password field is required!")
      .min(8, "Password must be at least 8 characters long!")
      .test(
        "is strong",
        "Password must contain at least one uppercase letter, one lowercase letter, and one number!",
        passwordRule
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match!")
      .required("Confirm password is required!")
      .nullable(),
  });

  const navigate = useNavigate();

  const handleSignupSubmit = async (
    values: IndividualRegisterForm,
    { setErrors, setSubmitting }: FormikHelpers<IndividualRegisterForm>
  ) => {
    try {
      setSubmitting(true);
      await AuthService.individualRegister(values);
      navigate("/");
    } catch (error: any) {
      if (error.response.data.validationErrors) {
        const validationErrors: Record<string, string> =
          error.response.data.validationErrors;
        const formikErrors: Record<string, string> = {};
        Object.entries(validationErrors).forEach(([field, message]) => {
          formikErrors[field] = message;
        });
        setErrors(formikErrors);
      } else {
        toast.error(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
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
            Individual Information
          </h1>
        </div>
      </section>
      <div className="container">
        <div className="row container col-lg-6 col-md-12 mt-5 mb-5 pt-5 pb-5">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleSignupSubmit}
          >
            <Form>
              <div className="row mb-2">
                <div className="col-md-6 col-lg-6 mx-auto">
                  <FormikInput
                    className="form-control"
                    htmlFor="firstName"
                    id="firstName"
                    label="First Name"
                    name="firstName"
                    placeholder="Please write the first name!"
                  />
                </div>
                <div className="col-md-6, col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="lastName"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                    placeholder="Please write the last name!"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="nationalityNo"
                    id="nationalityNo"
                    label="Nationality Number"
                    name="nationalityNo"
                    placeholder="Please write the nationality number!"
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="birthDate"
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                    placeholder="Please write the birth date!"
                  />
                </div>
              </div>
              <div className="row mb-6">
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="phoneNumber"
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
                    placeholder="Please write the phone number!"
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="email"
                    id="email"
                    label="Email"
                    name="email"
                    placeholder="Please write the email!"
                  />
                </div>
              </div>
              <FormikInput
                className="form-control"
                htmlFor="password"
                id="password"
                label="Password"
                name="password"
                type="password"
                placeholder="Please write the password!"
              />

              <FormikInput
                className="form-control"
                htmlFor="confirmPassword"
                id="confirmPassword"
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Please write the confirm password!"
              />

              <button className="btn btn-danger rounded-5 mt-3" type="submit">
                Sign Up
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default IndividualRegister;
