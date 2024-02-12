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
                  You can contact our Reservation Center at res@avis.com.tr or
                  call 444 28 47/444 Avis from 09:00-19:00 daily. Reservations
                  can also be made online via www.avis.com.tr. For international
                  calls, dial +90 (216) 444 28 47.
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
                  For all your suggestions, requests, criticisms and comments,
                  you can contact us from our Contact Center by pressing 3 on
                  our 444 28 47 / 444 Avis&nbsp;line between 08:00-17:00 on
                  weekdays, our contact form on our website, or our e-mail
                  address <Link to={email}> @.com.tr </Link>{" "}
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
                  You can reach us 24 / 7 by dialing 2 on 444 28 47 / 444 Avis
                  line in case of any kind of emergency, such as breakdowns,
                  accidents, or roadside assistance.
                  <br />
                  You can also benefit from Avis Full Support Services when you
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
