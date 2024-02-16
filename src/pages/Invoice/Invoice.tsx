import React from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./Invoice.css";
import { formatCurrency } from "../../utils/formatCurrency";

type Props = {};

const Invoice = (props: Props) => {
  const rentalState = useSelector((store: any) => store.rental);
  const authState = useSelector((store: any) => store.auth);
  const location = useLocation();
  const { invoice } = location.state || {};
  const { totalPrice } = location.state || {};
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
            Invoices
          </h1>
        </div>
      </section>
      <div className="invoice-detail" onClick={() => console.log("Clicked!")}>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title fw-bold">Invoice Detail</h5>
            <div className="d-flex justify-content-between mb-3">
              <p className="fw-bold">Invoice No:</p>
              <p>{invoice?.invoiceNo}</p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <p className="fw-bold">Invoice Date:</p>
              <p>{invoice?.createdDate}</p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <p className="fw-bold">Total Price:</p>
              <p>{formatCurrency(invoice?.totalPrice)}</p>
            </div>
            <div className="d-flex justify-content-between mb-3">
              <p className="fw-bold">User:</p>
              <p>{invoice?.userName}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
