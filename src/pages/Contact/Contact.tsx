import { useEffect, useState } from "react";
import ContactMap from "../../components/layout/ContactMap/ContactMap";
import { GetByIdBranchResponse } from "../../models/branch/responses/GetByIdBranchResponse";
import BranchService from "../../services/branchService";
import { Form, Formik } from "formik";
import FormikSelect from "../../components/common/FormikSelect/FormikSelect";
import FormikInput from "../../components/common/FormikInput/FormikInput";
import * as Yup from "yup";
import ContactCard from "../../components/layout/ContactCard/ContactCard";
import { toast } from "react-toastify";

type Props = {};
interface ContactForm {
  subjectId: number;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationalityNo: string;
  phoneNumber: string;
  email: string;
  message: string;
  terms1: boolean;
  terms2: boolean;
  rows: number;
}
const Contact = (props: Props) => {
  const [branch, setBranch] = useState<GetByIdBranchResponse>();

  const fetchBranch = async () => {
    try {
      const response = await BranchService.getById(1);
      setBranch(response.data);
    } catch (error: any) {
      toast.error(error.response.data.message);
    }
  };
  useEffect(() => {
    fetchBranch();
  }, []);

  const initialValues: ContactForm = {
    subjectId: 0,
    firstName: "",
    lastName: "",
    birthDate: "",
    nationalityNo: "",
    phoneNumber: "",
    email: "",
    message: "",
    terms1: false,
    terms2: false,
    rows: 5,
  };

  const subjectOptions = [
    { value: 0, label: "Choose..." },
    { value: 1, label: "Proposal" },
    { value: 2, label: "Thank" },
    { value: 3, label: "Criticism" },
    { value: 4, label: "Request" },
    { value: 5, label: "Dealer Request" },
  ];

  const validationSchema = Yup.object({
    subjectId: Yup.number()
      .required("Subject field is required!")
      .min(1, "Select a valid subject!"),
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
    message: Yup.string().required("Message field is required."),
  });

  return (
    <>
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
            Contact
          </h1>
        </div>
      </section>

      <section className="primary-section">
        <div className="container">
          <ContactCard />
          <div className="row">
            <div className="col-lg-6 col-md-12" style={{ padding: "24px" }}>
              <div className="map-card" style={{ overflow: "hidden" }}>
                {" "}
                <h5 className="title fw-bold" style={{ color: "#c31432" }}>
                  Headquarters
                </h5>
                <p className="desc">
                  2B2 Atatürk Neighborhood, Saygı Avenue No: 19, Ataşehir 34019
                  / İstanbul
                </p>
                <div
                  className="map-item"
                  style={{ width: "100%", height: "100%", border: "0" }}
                >
                  {branch && <ContactMap branch={branch} />}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12" style={{ padding: "24px" }}>
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={values => {
                  console.log(values);
                }}
              >
                <Form
                  className="form"
                  style={{ fontFamily: '"Open Sans", sans-serif' }}
                >
                  <h5
                    className="form-title mb-5 fw-bold"
                    style={{ color: "#c31432" }}
                  >
                    Contact Us
                  </h5>
                  <div>
                    <div className="col-12,mb-3">
                      <FormikSelect
                        htmlFor="subjectId"
                        id="subjectId"
                        label="Subject"
                        name="subjectId"
                        options={subjectOptions}
                      />
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6, col-lg-6">
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
                          label="Last name"
                          name="lastName"
                          placeholder="Please write the last name!"
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6, col-lg-6">
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

                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          htmlFor="nationalityNo"
                          id="nationalityNo"
                          label="Nationality Number"
                          name="nationalityNo"
                          placeholder="Please write the nationality number!"
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          htmlFor="phoneNumber"
                          id="phoneNumber"
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Please write the phone number!"
                        />
                      </div>

                      <div className="col-md-6, col-lg-6">
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
                    <div className="col-12 mb-3">
                      <FormikInput
                        className="form-control"
                        htmlFor="message"
                        id="message"
                        as="textarea"
                        label="Your Message"
                        name="message"
                        placeholder="Please write the message here!"
                        rows={5}
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <p>
                      Pursuant to the Privacy Notice, I accept the following
                      processing activities conducted by 2B2 Otomotiv Ticaret ve
                      Sanayi Anonim Şirketi:
                    </p>
                    <div className="col-12 mb-3">
                      <FormikInput
                        className="form-check-input"
                        type="checkbox"
                        id="terms1"
                        name="terms1"
                      />
                      <label htmlFor="terms1" style={{ textAlign: "justify" }}>
                        {" "}
                        Processing of my identity, communication, customer
                        transaction, marketing, and vehicle-insurance data for
                        the purposes of tailoring the goods and services
                        provided, based on my likes, usage habits and needs, and
                        in this regard, sending commercial electronic messages
                        such as advertisements, promotions, and campaigns to my
                        contact information, and for sharing this information
                        with the suppliers whom 2B2 procures their services for
                        these activities.
                      </label>
                    </div>

                    <div className="col-12 mb-3">
                      <FormikInput
                        className="form-check-input"
                        type="checkbox"
                        id="terms2"
                        name="terms2"
                      />
                      <label htmlFor="terms2" style={{ textAlign: "justify" }}>
                        Processing of my identity, vehicle, location, customer
                        transaction and marketing data for the purposes of
                        analyzing my Connected Car driving and service usage
                        performance for calculating the points on the basis of
                        driving and offering me tailored vehicle insurance.
                      </label>
                    </div>

                    <div className="col-md-12, text-end">
                      <button
                        type="submit"
                        className="btn btn-danger rounded-5"
                      >
                        Submit
                        <i className="bi bi-arrow-right-circle ps-3 fs-4" />
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Contact;
