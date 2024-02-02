import React from 'react';
import {} from 'react-bootstrap';

export default function FormikContact() {
  return (
    <form className="form">
      <h5 className="form-title">Contact Us</h5>
      <div className="row">
      <div className="col-12">
        <label htmlFor="inputSubject" className="form-label">Subject*</label>
        <select id="inputSubject" className="form-select">
          <option selected>Choose...</option>
          <option value="Proposal">Proposal</option>
            <option value="Thank">Thank</option>
            <option value="Criticism">Criticism</option>
            <option value="Request">Request</option>
            <option value="Dealer Request">DealerRequest</option>
        </select>
      </div>

      <div className="col-md-6">
        <label htmlFor="inputName" className="form-label">Your Name*</label>
        <input type="text" className="form-control" id="inputName" />
      </div>

      <div className="col-md-6">
        <label htmlFor="inputSurname" className="form-label">Your Surname*</label>
        <input type="text" className="form-control" id="inputSurname" />
      </div>

      <div className="col-6">
      <label htmlFor="inputDate" className="form-label">BirthDate*</label>
          <input type="date" placeholder="date" required />
        </div>

      <div className="col-6">
        <label htmlFor="inputEmail" className="form-label">Phone*</label>
        <input type="email" className="form-control" id="inputEmail" />
      </div>

      <div className="col-6">
        <label htmlFor="inputEmail" className="form-label">Email</label>
        <input type="email" className="form-control" id="inputEmail" />
      </div>

      <div className="col-12">
        <button type="submit" className="btn btn-primary">Formu Gönder</button>
      </div>


      </div>
    </form>
  );
}