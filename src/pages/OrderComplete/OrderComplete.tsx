import { Link, useLocation } from "react-router-dom";
import { Container } from "reactstrap";

type Props = {};

const OrderComplete = (props: Props) => {
  const location = useLocation();
  const { invoice } = location.state || {};

  return (
    <div className="mb-5" style={{ fontFamily: "sans-serif" }}>
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
            Order Complete
          </h1>
        </Container>
      </section>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <div className="p-4 shadow rounded">
              <h2 className="card-title mb-4">Order Complete</h2>
              <p className="lead">
                Your order has been successfully completed.
              </p>
              <p className="lead">Thank you for your rental!</p>
              <div className="invoice-info mt-4">
                <p className="fw-bold">Invoice Date:</p>
                <p>{invoice.createdDate}</p>
                <p className="fw-bold">Invoice No:</p>
                <p>{invoice.invoiceNo}</p>
              </div>
              <p className="card-text text-center mb-4">
                We will contact you shortly regarding delivery details.
              </p>
              <Link to="/" className="btn btn-danger btn-lg rounded-5 mt-3">
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderComplete;
