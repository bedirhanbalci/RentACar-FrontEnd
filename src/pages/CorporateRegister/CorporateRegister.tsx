import { Formik, Form } from "formik";
import * as Yup from "yup";
import { passwordRule } from "../../utils/validation/customValidationRules";
import FormikInput from "../../components/common/FormikInput/FormikInput";
import FormikSelect from "../../components/common/FormikSelect/FormikSelect";

type Props = {};

interface CorporateRegisterForm {
  subjectId: number;
  companyName: string;
  contactName: string;
  contactTitle: string;
  taxNumber: string;
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
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

  return (
    <div className="container">
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <div className="row">
            <div className="col-6 mx-auto">
              <FormikSelect
                label="Subject"
                name="subjectId"
                options={[
                  { value: 0, label: "Select" },
                  { value: 1, label: "Price List Request" },
                  { value: 2, label: "New Corporate Customer Requests" },
                  { value: 3, label: "General Requests" },
                ]}
              ></FormikSelect>

              <FormikInput
                label="Company Name"
                name="companyName"
                placeholder="Please write the company name!"
              />

              <FormikInput
                label="Contact Name"
                name="contactName"
                placeholder="Please write the contact name!"
              />

              <FormikInput
                label="Contact Title"
                name="contactTitle"
                placeholder="Please write the contact title!"
              />

              <FormikInput
                label="Tax Number"
                name="taxNumber"
                placeholder="Please write the tax number!"
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

export default CorporateRegister;
