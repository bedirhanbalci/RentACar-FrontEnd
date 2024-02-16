import React from "react";
import { Link } from "react-router-dom";

export default function ContactCard() {
  const email = " @.com.tr ";
  return (
    <div>
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
                <h6 className="card-title" style={{ color: "#c31432" }}>
                  {" "}
                  For Your Reservations
                </h6>
                <p
                  className="card-text"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    overflowY: "auto",
                    minHeight: "200px",
                    textAlign: "justify",
                  }}
                >
                  You can contact our Reservation Center at res@2B2.com.tr or
                  call 000 28 47/444 2B2 from 09:00-19:00 daily. Reservations
                  can also be made online via www.2B2.com.tr. For international
                  calls, dial +90 (216) 000 28 47.
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
                <h6 className="card-title" style={{ color: "#c31432" }}>
                  Customer Relations
                </h6>
                <p
                  className="card-text"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    overflowY: "auto",
                    minHeight: "200px",
                    textAlign: "justify",
                  }}
                >
                  For all your suggestions, requests, criticisms and comments,
                  you can contact us from our Contact Center by pressing 3 on
                  our 000 28 47 / 000 2B2&nbsp;line between 08:00-17:00 on
                  weekdays, our contact form on our website, or our e-mail
                  address <Link to={email}> cs@2B2.com.tr </Link>{" "}
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
                <h6 className="card-title" style={{ color: "#c31432" }}>
                  2B2 Full Support Service
                </h6>
                <p
                  className="card-text"
                  style={{
                    fontFamily: '"Open Sans", sans-serif',
                    overflowY: "auto",
                    minHeight: "200px",
                    textAlign: "justify",
                  }}
                >
                  You can reach us 24 / 7 by dialing 2 on 000 28 47 / 000 2B2
                  line in case of any kind of emergency, such as breakdowns,
                  accidents, or roadside assistance.
                  <br />
                  You can also benefit from 2B2 Full Support Services when you
                  log in to our website as a member.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
