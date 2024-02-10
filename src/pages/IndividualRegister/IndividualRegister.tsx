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
        console.log(error);
        toast.error(error.response.data.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={handleSignupSubmit}
      >
        <Form>
          <div className="row">
            <div className="col-6 mx-auto">
              <FormikInput
                label="First Name"
                name="firstName"
                placeholder="Please write the first name!"
              />

              <FormikInput
                label="Last Name"
                name="lastName"
                placeholder="Please write the last name!"
              />

              <FormikInput
                label="Nationality Number"
                name="nationalityNo"
                placeholder="Please write the nationality number!"
              />

              <FormikInput
                label="Birth Date"
                name="birthDate"
                type="date"
                placeholder="Please write the birth date!"
              />

              <FormikInput
                label="Phone Number"
                name="phoneNumber"
                placeholder="Please write the phone number!"
              />

              <FormikInput
                label="Email"
                name="email"
                placeholder="Please write the email!"
              />

              <FormikInput
                label="Password"
                name="password"
                type="password"
                placeholder="Please write the password!"
              />

              <FormikInput
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Please write the confirm password!"
              />

              <button className="btn btn-danger mt-3" type="submit">
                Sign Up
              </button>
            </div>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default IndividualRegister;
