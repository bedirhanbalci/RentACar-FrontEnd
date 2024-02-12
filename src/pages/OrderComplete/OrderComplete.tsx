import React from "react";
import { Link, useLocation } from "react-router-dom";

type Props = {};

const OrderComplete = (props: Props) => {
  const location = useLocation();
  const { invoice } = location.state || {};
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8 text-center">
          <h2 className="mb-4">Order Complete</h2>
          <p>Your order has been successfully completed.</p>
          <p>Thank you for your purchase!</p>
          <p>{invoice.createdDate}</p>
          <p>{invoice.invoiceNo}</p>
          <Link to="/" className="btn btn-primary mt-3">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
