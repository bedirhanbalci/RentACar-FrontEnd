import React from "react";
import {} from "react-bootstrap";

export default function FormikContact() {
  return (
    <form className="form" style={{ fontFamily: '"Open Sans", sans-serif' }}>
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
          <input type="text" className="form-control" id="inputName" />
        </div>

        <div className="col-md-6">
          <label htmlFor="inputSurname" className="form-label">
            Your Surname*
          </label>
          <input type="text" className="form-control" id="inputSurname" />
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
          <input type="tel" className="form-control" id="inputPhone" required />
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
            Pursuant to the Privacy Notice, I accept the following processing
            activities conducted by Otokoç Otomotiv Ticaret ve Sanayi Anonim
            Şirketi:
          </p>
          <div className="form-check">
            <input
              type="checkbox"
              className="form-check-input"
              id="privacyPolicyCheck"
              required
            />
            <label className="form-check-label" htmlFor="privacyPolicyCheck">
              Processing of my identity, communication, customer transaction,
              marketing, and vehicle-insurance data for the purposes of
              tailoring the goods and services provided, based on my likes,
              usage habits and needs, and in this regard, sending commercial
              electronic messages such as advertisements, promotions, and
              campaigns to my contact information, and for sharing this
              information with the suppliers whom Otokoç procures their services
              for these activities.
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
            <label className="form-check-label" htmlFor="privacyPolicyCheck">
              Processing of my identity, vehicle, location, customer transaction
              and marketing data for the purposes of analyzing my Connected Car
              driving and service usage performance for calculating the points
              on the basis of driving and offering me tailored vehicle
              insurance.
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
    </form>
  );
}
