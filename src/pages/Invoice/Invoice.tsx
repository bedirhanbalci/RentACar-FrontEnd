import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/formatCurrency";
import RentalService from "../../services/rentalService";
import "./Invoice.css";

type Props = {};

const Invoice = (props: Props) => {
  const authState = useSelector((store: any) => store.auth);

  const [info, setInfo] = useState([[{ id: 0 }]]);

  const fetchInfo = async () => {
    try {
      await RentalService.getByUserId(parseInt(authState.id)).then(
        (response: any) => {
          setInfo(response.data);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

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

      {info.map((innerList: any, outerIndex: any) => (
        <div key={outerIndex} className="invoice-card">
          <div className="invoice-item">
            <span className="item-label">Name: </span>
            <span className="item-value">
              {innerList[2]?.firstName} {innerList[2]?.lastName || "N/A"}
            </span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Company Name: </span>
            <span className="item-value">
              {innerList[2]?.companyName || "N/A"}
            </span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Contact Name: </span>
            <span className="item-value">
              {innerList[2]?.contactName || "N/A"}
            </span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Invoice No: </span>
            <span className="item-value">{innerList[1]?.invoiceNo}</span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Invoice Date: </span>
            <span className="item-value">{innerList[1]?.createdDate}</span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Rental Start Date: </span>
            <span className="item-value">{innerList[0]?.startDate}</span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Rental End Date: </span>
            <span className="item-value">{innerList[0]?.endDate}</span>
          </div>
          <div className="invoice-item">
            <span className="item-label">Total Price: </span>
            <span className="item-value">
              {formatCurrency(innerList[0]?.totalPrice)}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Invoice;
