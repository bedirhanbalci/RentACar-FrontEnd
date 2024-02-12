import React, { useEffect, useState } from "react";
import ContactMap from "../../components/layout/ContactMap/ContactMap";
import { Container } from "react-bootstrap";
import { GetByIdBranchResponse } from "../../models/branch/responses/GetByIdBranchResponse";
import branchService from "../../services/branchService";
import { Form, Formik } from "formik";
import FormikSelect from "../../components/common/FormikSelect/FormikSelect";
import FormikInput from "../../components/common/FormikInput/FormikInput";
import * as Yup from "yup";
import ContactCard from "../../components/layout/ContactCard/ContactCard";

type Props = {};
interface ContactForm {
  subject: string;
  firstName: string;
  lastName: string;
  birthDate: string;
  nationalityNo: string;
  phoneNumber: string;
  email: string;
  yourMessage: string;
  acceptTerms: boolean;
  rows: number;
}
const Contact = (props: Props) => {
  const [branch, setBranch] = useState<GetByIdBranchResponse>();

  const fetchBranch = async () => {
    try {
      const response = await branchService.getById(1);
      setBranch(response.data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBranch();
  }, []);

  const Initialvalues: ContactForm = {
    subject: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    nationalityNo: "",
    phoneNumber: "",
    email: "",
    yourMessage: "",
    acceptTerms: false,
    rows: 5,
  };

  const SubjectOptions = [
    { value: "", label: "Choose..." },
    { value: "Proposal", label: "Proposal" },
    { value: "Thank", label: "Thank" },
    { value: "Criticism", label: "Criticism" },
    { value: "Request", label: "Request" },
    { value: "DealerRequest", label: "Dealer Request" },
  ];

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
    yourMessage: Yup.string().required("Message field is required."),
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
        <Container
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
        </Container>
      </section>

      <section className="primary-section">
        <Container>
          <ContactCard />
          <div className="row">
            <div className="col-lg-6 col-md-12" style={{ padding: "24px" }}>
              <div className="map-card" style={{ overflow: "hidden" }}>
                {" "}
                <h4 className="title" style={{ color: "#c31432" }}>
                  Headquarters
                </h4>
                <p className="desc">
                  Avis Türkiye Aydınevler Mah. Saygı Cad.No: 60 34854 Küçükyalı
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
                initialValues={Initialvalues}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                  console.log(values);
                }}
              >
                <Form
                  className="form"
                  style={{ fontFamily: '"Open Sans", sans-serif' }}
                >
                  <h5 className="form-title mb-5" style={{ color: "#c31432" }}>
                    Contact Us
                  </h5>
                  <div>
                    <div className="col-12,mb-3">
                      <FormikSelect
                        label="Subject"
                        name="subject"
                        options={SubjectOptions}
                      />
                    </div>
                    <div className="row mb-2">
                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          label="Your Name"
                          name="firstName"
                          placeholder="Please write the first name!"
                        />
                      </div>

                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          label="Your Surname"
                          name="lastName"
                          placeholder="Please write the surname!"
                        />
                      </div>
                    </div>

                    <div className="row mb-2">
                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          label="Birth Date"
                          name="birthDate"
                          type="date"
                          placeholder="Please write the birth date!"
                        />
                      </div>

                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
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
                          label="Phone Number"
                          name="phoneNumber"
                          placeholder="Please write the phone number!"
                        />
                      </div>

                      <div className="col-md-6, col-lg-6">
                        <FormikInput
                          className="form-control"
                          label="Email"
                          name="email"
                          placeholder="Please write the email!"
                        />
                      </div>
                    </div>
                    <div className="col-12 mb-3">
                      <FormikInput
                        className="form-control"
                        as="textarea"
                        label="Your Message"
                        name="yourMessage"
                        placeholder="Please write the message here!"
                        rows={5}
                      />
                    </div>
                  </div>
                  <div className="col-12 mb-3">
                    <p>
                      Pursuant to the Privacy Notice, I accept the following
                      processing activities conducted by Otokoç Otomotiv Ticaret
                      ve Sanayi Anonim Şirketi:
                    </p>
                    <div className="col-12 mb-3">
                      <FormikInput
                        type="checkbox"
                        className="form-check-label"
                        name="acceptTerms"
                        label="Processing of my identity, communication, customer transaction, marketing, and vehicle-insurance data for the purposes of tailoring the goods and services provided, based on my likes, usage habits and needs, and in this regard, sending commercial electronic messages such as advertisements, promotions, and campaigns to my contact information, and for sharing this information with the suppliers whom Otokoç procures their services for these activities."
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <FormikInput
                        type="checkbox"
                        className="form-check-label"
                        name="acceptTerms"
                        label=" Processing of my identity, vehicle, location, customer
                        transaction and marketing data for the purposes of
                        analyzing my Connected Car driving and service usage
                        performance for calculating the points on the basis of
                        driving and offering me tailored vehicle insurance."
                      />
                    </div>

                    <div className="col-md-12, text-end">
                      <button type="submit" className="btn btn-danger ms-3">
                        Submit{" "}
                        <i className="bi bi-arrow-right-circle ps-3 fs-4" />
                      </button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};
export default Contact;
