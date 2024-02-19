import { UpdateUserRequest } from "../../../models/user/requests/UpdateUserRequest";
import { Form, Formik } from "formik";
import FormikInput from "../../common/FormikInput/FormikInput";
import * as Yup from "yup";
import UserService from "../../../services/userService";

type Props = { user: any; customer: any; setUpdate: any };

const UserUpdateForm = ({ user, customer, setUpdate }: Props) => {
  const initialValues: UpdateUserRequest = {
    id: user?.id || 0,
    firstName: customer?.firstName || "",
    lastName: customer?.lastName || "",
    nationalityNo: customer?.nationalityNo || "",
    birthDate: customer?.birthDate || "",
    phoneNumber: user?.phoneNumber || "",
    email: user?.email || "",
    password: "",
    address: user?.address || "",
    companyName: customer?.companyName || "",
    contactName: customer?.contactName || "",
    contactTitle: customer?.contactTitle || "",
    taxNumber: customer?.taxNumber || "",
    rows: 5,
  };

  const validationSchema = Yup.object({
    firstName: Yup.string(),
    lastName: Yup.string(),
    nationalityNo: Yup.string(),
    birthDate: Yup.string(),
    phoneNumber: Yup.string(),
    email: Yup.string(),
    password: Yup.string(),
  });

  const handleOnSubmit = async (values: UpdateUserRequest) => {
    try {
      await UserService.update(values);
      setUpdate(true);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="container">
        <div className="row container  col-md-12 mt-3 mb-5  pb-5">
          <Formik
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={handleOnSubmit}
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
                  />
                </div>
                <div className="col-md-6, col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="lastName"
                    id="lastName"
                    label="Last Name"
                    name="lastName"
                  />
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="birthDate"
                    id="birthDate"
                    label="Birth Date"
                    name="birthDate"
                    type="date"
                  />
                </div>

                <div className="col-md-6 col-lg-6">
                  <FormikInput
                    className="form-control"
                    htmlFor="phoneNumber"
                    id="phoneNumber"
                    label="Phone Number"
                    name="phoneNumber"
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
              />

              <FormikInput
                className="form-control"
                htmlFor="companyName"
                id="companyName"
                label="Company Name"
                name="companyName"
              />

              <FormikInput
                className="form-control"
                htmlFor="contactName"
                id="contactName"
                label="Contact Name"
                name="contactName"
              />

              <FormikInput
                className="form-control"
                htmlFor="contactTitle"
                id="contactTitle"
                label="Contact Title"
                name="contactTitle"
              />

              <FormikInput
                className="form-control"
                htmlFor="address"
                id="address"
                label="Address"
                name="address"
                as="textarea"
                rows={5}
              />

              <button className="btn btn-danger rounded-4 mt-3" type="submit">
                Update My Information
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default UserUpdateForm;
