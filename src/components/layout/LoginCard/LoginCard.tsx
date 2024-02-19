import { Dropdown, Card, Nav, Form, Button, Modal } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../store/slices/authSlice";
import "./LoginCard.css";
import AuthService from "../../../services/authService";
import { IndividualLoginRequest } from "../../../models/auth/requests/IndividualLoginRequest";
import { CorporateLoginRequest } from "../../../models/auth/requests/CorporateLoginRequest";
import { encryptPassword } from "../../../utils/config/passwordHelper";

const LoginCard: React.FC = () => {
  const dispatch = useDispatch();
  const authState = useSelector((store: any) => store.auth);

  const [activeTab, setActiveTab] = useState<"individual" | "corporate">(
    "individual"
  );

  const [individualEmail, setIndividualEmail] = useState("");
  const [individualPassword, setIndividualPassword] = useState("");
  const [corporateEmail, setCorporateEmail] = useState("");
  const [corporatePassword, setCorporatePassword] = useState("");
  const [rememberMeIndividual, setRememberMeIndividual] = useState(false);
  const [rememberMeCorporate, setRememberMeCorporate] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleIndividualSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await AuthService.individualLogin({
        email: individualEmail,
        password: individualPassword,
        type: activeTab,
      } as IndividualLoginRequest);
      dispatch(loginSuccess(response.data));

      if (rememberMeIndividual) {
        const encryptedEmail = await encryptPassword(individualEmail);
        const encryptedPassword = await encryptPassword(individualPassword);
        localStorage.setItem(
          "rememberedUserIndividual",
          JSON.stringify({
            email: encryptedEmail,
            password: encryptedPassword,
          })
        );
      } else {
        localStorage.removeItem("rememberedUserIndividual");
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  const handleCorporateSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await AuthService.corporateLogin({
        email: corporateEmail,
        password: corporatePassword,
        type: activeTab,
      } as CorporateLoginRequest);
      dispatch(loginSuccess(response.data));

      if (rememberMeCorporate) {
        const encryptedEmail = await encryptPassword(corporateEmail);
        const encryptedPassword = await encryptPassword(corporatePassword);
        localStorage.setItem(
          "rememberedUserCorporate",
          JSON.stringify({ email: encryptedEmail, password: encryptedPassword })
        );
      } else {
        localStorage.removeItem("rememberedUserCorporate");
      }
    } catch (error) {
      setShowErrorModal(true);
    }
  };

  return (
    <div className="btn-group">
      <Dropdown className="d-inline mx-5" autoClose="outside">
        <Dropdown.Toggle
          style={{ backgroundColor: "#d4002a" }}
          id="dropdown-autoclose-outside"
        >
          Login
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Card
            style={{
              borderRadius: "8px",
              border: "1px solid #AD0A27",
              backgroundColor: "#fff5f7",
            }}
            className="dropdownStyle"
          >
            <Card.Header style={{ backgroundColor: "#AD0A27" }}>
              <Nav variant="tabs" defaultActiveKey="individual">
                <Nav.Item style={{ flex: 1, textAlign: "center" }}>
                  <Nav.Link
                    style={{
                      color: activeTab === "individual" ? "#D4002A" : "#fff5f7",
                      backgroundColor:
                        activeTab === "individual" ? "#fff5f7" : "#AD0A27",
                      fontWeight: "bold",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor:
                        activeTab === "individual" ? "default" : "pointer",
                    }}
                    as={Link}
                    to="#"
                    active={activeTab === "individual"}
                    onClick={() => setActiveTab("individual")}
                  >
                    Individual
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item style={{ flex: 1, textAlign: "center" }}>
                  <Nav.Link
                    style={{
                      color: activeTab === "corporate" ? "#D4002A" : "#fff5f7",
                      backgroundColor:
                        activeTab === "corporate" ? "#fff5f7" : "#AD0A27",
                      fontWeight: "bold",
                      height: "50px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: activeTab === "corporate" ? "default" : "pointer",
                    }}
                    as={Link}
                    to="#"
                    active={activeTab === "corporate"}
                    onClick={() => setActiveTab("corporate")}
                  >
                    Corporate
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            {activeTab === "individual" ? (
              <Card.Body>
                <Form onSubmit={handleIndividualSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Individual Email address *</Form.Label>
                    <Form.Control
                      onChange={e => setIndividualEmail(e.target.value)}
                      value={individualEmail}
                      type="email"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Individual Password *</Form.Label>
                    <Form.Control
                      onChange={e => setIndividualPassword(e.target.value)}
                      value={individualPassword}
                      type="password"
                      placeholder="Password"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 custom-checkbox"
                    controlId="formBasicCheckbox"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      checked={rememberMeIndividual}
                      onChange={e => setRememberMeIndividual(e.target.checked)}
                    />
                    <Button
                      className="rounded-5 ms-auto"
                      variant="danger"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Form.Group>
                </Form>
                <div className="containerStyle text-center mt-4 pb-2">
                  <h5>Don't have an 2B2 account?</h5>
                  <Button className="rounded-5" variant="danger">
                    <Link
                      className="text-decoration-none"
                      to="/individual-register"
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </Card.Body>
            ) : (
              <Card.Body>
                <Form onSubmit={handleCorporateSubmit}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Corporate Email address *</Form.Label>
                    <Form.Control
                      onChange={e => setCorporateEmail(e.target.value)}
                      value={corporateEmail}
                      type="email"
                      placeholder="Enter email"
                    />
                    <Form.Text className="text-muted">
                      We'll never share your email with anyone else.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Corporate Password *</Form.Label>
                    <Form.Control
                      onChange={e => setCorporatePassword(e.target.value)}
                      value={corporatePassword}
                      type="password"
                      placeholder="Enter password"
                    />
                  </Form.Group>
                  <Form.Group
                    className="mb-3 custom-checkbox"
                    controlId="formBasicCheckbox"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <Form.Check
                      type="checkbox"
                      label="Remember Me"
                      checked={rememberMeCorporate}
                      onChange={e => setRememberMeCorporate(e.target.checked)}
                    />
                    <Button
                      className="rounded-5 ms-auto"
                      variant="danger"
                      type="submit"
                    >
                      Sign In
                    </Button>
                  </Form.Group>
                </Form>
                <div className="containerStyle text-center mt-4 pb-2">
                  <h5>Don't have an 2B2 account?</h5>
                  <Button className="rounded-5" variant="danger">
                    <Link
                      className="text-decoration-none"
                      to="/corporate-register"
                    >
                      Sign Up
                    </Link>
                  </Button>
                </div>
              </Card.Body>
            )}
          </Card>
        </Dropdown.Menu>
      </Dropdown>
      <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)}>
        <Modal.Header closeButton className="bg-danger text-white">
          <Modal.Title className="fw-bold">Warning</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex align-items-center">
            <i className="icon modal-icon icon-error me-3"></i>
            <p className="mb-0">
              Email or password is incorrect. Please check your information.
            </p>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn rounded-4"
            variant="danger"
            onClick={() => setShowErrorModal(false)}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LoginCard;
