import { Formik, Form, FormikHelpers } from "formik";
import * as Yup from "yup";
import { passwordRule } from "../../utils/validation/customValidationRules";
import FormikInput from "../../components/common/FormikInput/FormikInput";
import FormikSelect from "../../components/common/FormikSelect/FormikSelect";
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/authService";
import { toast } from "react-toastify";

type Props = {};

export interface CorporateRegisterForm {
  subjectId: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  taxNumber: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const CorporateRegister = (props: Props) => {
  const initialValues: CorporateRegisterForm = {
    subjectId: 0,
    companyName: "",
    contactName: "",
    contactTitle: "",
    taxNumber: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const subjectOptions = [
    { value: 0, label: "Select" },
    { value: 1, label: "Price List Request" },
    { value: 2, label: "New Corporate Customer Requests" },
    { value: 3, label: "General Requests" },
  ];

  const validationSchema = Yup.object({
    subjectId: Yup.number()
      .required("Subject field is required!")
      .min(1, "Select a valid subject!"),
    companyName: Yup.string()
      .required("Company name field is required!")
      .min(2, "Company name must be at least 2 characters long!")
      .max(50, "Company name must be at most 50 characters long!"),
    contactName: Yup.string()
      .required("Contact name field is required!")
      .min(2, "Contact name must be at least 2 characters long!")
      .max(50, "Contact name must be at most 50 characters long!"),
    contactTitle: Yup.string()
      .required("Contact title field is required!")
      .min(2, "Contact title must be at least 2 characters long!")
      .max(50, "Contact title must be at most 50 characters long!"),
    taxNumber: Yup.string()
      .required("Tax number field is required!")
      .min(10, "Tax number must be a minimum of 10 characters!"),
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
    values: CorporateRegisterForm,
    { setErrors, setSubmitting }: FormikHelpers<CorporateRegisterForm>
  ) => {
    try {
      setSubmitting(true);
      await AuthService.corporateRegister(values);
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
            Corporate Information
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
              <div className="row">
                <div>
                  <FormikSelect
                    htmlFor="subjectId"
                    id="subjectId"
                    label="Subject"
                    name="subjectId"
                    options={subjectOptions}
                  ></FormikSelect>
                  <div className="row mb-2">
                    <div className="col-md-6 col-lg-6 mx-auto"></div>
                    <FormikInput
                      className="form-control"
                      htmlFor="companyName"
                      id="companyName"
                      label="Company Name"
                      name="companyName"
                      placeholder="Please write the company name!"
                    />
                  </div>
                  <div className="col-md-6, col-lg-6"></div>
                  <FormikInput
                    className="form-control"
                    htmlFor="contactName"
                    id="contactName"
                    label="Contact Name"
                    name="contactName"
                    placeholder="Please write the contact name!"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="contactTitle"
                    id="contactTitle"
                    label="Contact Title"
                    name="contactTitle"
                    placeholder="Please write the contact title!"
                  />
                </div>
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="taxNumber"
                    id="taxNumber"
                    label="Tax Number"
                    name="taxNumber"
                    placeholder="Please write the tax number!"
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

export default CorporateRegister;
