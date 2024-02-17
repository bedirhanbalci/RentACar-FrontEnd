import { Col, Container, ListGroup, ListGroupItem, Row } from "reactstrap";
import "./Footer.css";
import { Link } from "react-router-dom";

const quickLinks = [
  {
    path: "/",
    display: "Home",
  },

  {
    path: "car-list",
    display: "Cars",
  },

  {
    path: "branches",
    display: "Branches",
  },

  {
    path: "about",
    display: "About",
  },
  {
    path: "contact",
    display: "Contact",
  },
];

type Props = {};

const Footer = (props: Props) => {
  const date = new Date();
  const year = date.getFullYear();
  return (
    <footer className="footer mt-4">
      <Container>
        <Row>
          <Col lg="4" md="4" sm="12">
            <div className="logo footer__logo">
              <h1>
                <Link
                  to="/"
                  className="d-flex align-items-center gap-2 text-white list-t text-decoration-none"
                >
                  <span>2B2</span>
                </Link>
              </h1>
            </div>
            <p className="footer__logo-content text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Consequuntur, distinctio, itaque reiciendis ab cupiditate harum ex
              quam veniam, omnis expedita animi quibusdam obcaecati mollitia?
              Delectus et ad illo recusandae temporibus?
            </p>
          </Col>

          <Col lg="2" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title text-white">Quick Links</h5>
              <ListGroup>
                {quickLinks.map((item, index) => (
                  <ListGroupItem key={index} className="p-0 mt-3 quick__link">
                    <Link to={item.path} className="text-white">
                      {item.display}
                    </Link>
                  </ListGroupItem>
                ))}
              </ListGroup>
            </div>
          </Col>

          <Col lg="3" md="4" sm="6">
            <div className="mb-4">
              <h5 className="footer__link-title mb-4 text-white">
                Head Office
              </h5>
              <p className="office__info text-white">Atasehir, Istanbul</p>
              <p className="office__info text-white">
                Phone: +90 500 000 00 00
              </p>

              <p className="office__info text-white">Email: 2b2@gmail.com</p>

              <p className="office__info text-white">
                Office Time: 09:00-21:00
              </p>
            </div>
          </Col>

          <Col lg="3" md="4" sm="12">
            <div className="mb-4">
              <h5 className="footer__link-title text-white">Newsletter</h5>
              <p className="section__description text-white">
                Subscribe our newsletter
              </p>
              <div className="newsletter">
                <input
                  type="email"
                  placeholder="Email"
                  className="text-black"
                />
                <span>
                  <i className="ri-send-plane-line"></i>
                </span>
              </div>
            </div>
          </Col>

          <Col lg="12">
            <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top text-white">
              <p className="mb-0">
                © {year} Company, Inc. All rights reserved.
              </p>
              <ul className="list-unstyled d-flex mb-0">
                <li className="ms-3">
                  <Link
                    className="link-body-emphasis text-white"
                    to="https://twitter.com/"
                    target="blank"
                  >
                    <i className="bi bi-twitter-x fs-4"></i>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link
                    className="link-body-emphasis text-white"
                    to="https://www.facebook.com/"
                    target="blank"
                  >
                    <i className="bi bi-facebook fs-4"></i>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link
                    className="link-body-emphasis text-white"
                    to="https://www.instagram.com/"
                    target="blank"
                  >
                    <i className="bi bi-instagram fs-4"></i>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link
                    className="link-body-emphasis text-white"
                    to="https://www.linkedin.com/"
                    target="blank"
                  >
                    <i className="bi bi-linkedin fs-4"></i>
                  </Link>
                </li>
                <li className="ms-3">
                  <Link
                    className="link-body-emphasis text-white"
                    to="https://www.threads.net/"
                    target="blank"
                  >
                    <i className="bi bi-threads fs-4"></i>
                  </Link>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
