import React, { useEffect, useState } from "react";
import ContactMap from "../../components/layout/ContactMap/ContactMap";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { GetByIdBranchResponse } from "../../models/branch/responses/GetByIdBranchResponse";
import branchService from "../../services/branchService";
import { Form, Formik } from "formik";

type Props = {};

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

  const email = " @.com.tr ";

  const Initialvalues = {
    name: "",
  };

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
          <div className="card-list">
            <div className="row">
              <div className="col-sm-4 mb-3 mb-sm-0">
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fafaf5",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <h5 className="card-title" style={{ color: "#c31432" }}>
                      {" "}
                      For Your Reservations
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: '"Open Sans", sans-serif',
                        overflowY: "auto",
                        minHeight: "200px",
                      }}
                    >
                      You can reach our Reservation Center from res@avis.com.tr
                      e-mail address or 444 28 47/444 Avis between the hours
                      09:00-19:00 on weekdays and weekends. You can also make
                      your reservations online from our www.avis.com.tr website.
                      Our number for international calls is + 90 (216) 444 28 47
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fafaf5",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <h5 className="card-title" style={{ color: "#c31432" }}>
                      Customer Relations
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: '"Open Sans", sans-serif',
                        overflowY: "auto",
                        minHeight: "200px",
                      }}
                    >
                      For all your suggestions, requests, criticisms and
                      comments, you can contact us from our Contact Center by
                      pressing 3 on our 444 28 47 / 444 Avis&nbsp;line between
                      08:00-17:00 on weekdays, our contact form on our website,
                      or our e-mail address <Link to={email}> @.com.tr </Link>{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-4">
                <div
                  className="card"
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "#fafaf5",
                  }}
                >
                  <div
                    className="card-body"
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      overflow: "hidden",
                    }}
                  >
                    <h5 className="card-title" style={{ color: "#c31432" }}>
                      Avis Full Support Service
                    </h5>
                    <p
                      className="card-text"
                      style={{
                        fontFamily: '"Open Sans", sans-serif',
                        overflowY: "auto",
                        minHeight: "200px",
                      }}
                    >
                      You can reach us 24 / 7 by dialing 2 on 444 28 47 / 444
                      Avis line in case of any kind of emergency, such as
                      breakdowns, accidents, or roadside assistance.
                      <br />
                      You can also benefit from Avis Full Support Services when
                      you log in to our website as a member.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <Formik initialValues={Initialvalues} onSubmit={() => {}}>
                <Form
                  className="form"
                  style={{ fontFamily: '"Open Sans", sans-serif' }}
                >
                  <h5 className="form-title mb-5" style={{ color: "#c31432" }}>
                    Contact Us
                  </h5>
                  <div className="row">
                    <div className="col-12,mb-3">
                      <label htmlFor="inputSubject" className="form-label">
                        Subject*
                      </label>
                      <select id="inputSubject" className="form-select">
                        <option value="">Choose...</option>
                        <option value="Proposal">Proposal</option>
                        <option value="Thank">Thank</option>
                        <option value="Criticism">Criticism</option>
                        <option value="Request">Request</option>
                        <option value="Dealer Request">DealerRequest</option>
                      </select>
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputName" className="form-label">
                        Your Name*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputName"
                      />
                    </div>

                    <div className="col-md-6">
                      <label htmlFor="inputSurname" className="form-label">
                        Your Surname*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputSurname"
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="startDate" className="form-label">
                        BirthDate*
                      </label>
                      <input
                        type="date"
                        className="form-control"
                        id="startDate"
                        placeholder="date"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="inputTC" className="form-label">
                        TC*
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="inputTC"
                        placeholder="TC Number"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="inputPhone" className="form-label">
                        Phone*
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="inputPhone"
                        required
                      />
                    </div>

                    <div className="col-md-6 mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email*
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="inputEmail"
                        required
                      />
                    </div>

                    <div className="col-12 mb-3">
                      <label htmlFor="yourMessage" className="form-label">
                        Your Message*
                      </label>
                      <textarea
                        className="form-control"
                        id="yourMessage"
                        rows={5}
                        placeholder="Write your message here..."
                        required
                      ></textarea>
                    </div>

                    <div className="col-12 mb-3">
                      <p>
                        Pursuant to the Privacy Notice, I accept the following
                        processing activities conducted by Otokoç Otomotiv
                        Ticaret ve Sanayi Anonim Şirketi:
                      </p>
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="privacyPolicyCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="privacyPolicyCheck"
                        >
                          Processing of my identity, communication, customer
                          transaction, marketing, and vehicle-insurance data for
                          the purposes of tailoring the goods and services
                          provided, based on my likes, usage habits and needs,
                          and in this regard, sending commercial electronic
                          messages such as advertisements, promotions, and
                          campaigns to my contact information, and for sharing
                          this information with the suppliers whom Otokoç
                          procures their services for these activities.
                        </label>
                      </div>
                    </div>

                    <div className="col-12 mb-3">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="privacyPolicyCheck"
                          required
                        />
                        <label
                          className="form-check-label"
                          htmlFor="privacyPolicyCheck"
                        >
                          Processing of my identity, vehicle, location, customer
                          transaction and marketing data for the purposes of
                          analyzing my Connected Car driving and service usage
                          performance for calculating the points on the basis of
                          driving and offering me tailored vehicle insurance.
                        </label>
                      </div>
                    </div>

                    <div className="col-md-12, text-end">
                      <button type="submit" className="btn btn-danger ms-3">
                        {" "}
                        {/* ms-3 sınıfı ile checkbox'tan biraz boşluk bırakıyoruz */}
                        SUBMIT <i className="bi bi-arrow-right"></i>{" "}
                        {/* Bootstrap ikonlarını kullanıyoruz */}
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
