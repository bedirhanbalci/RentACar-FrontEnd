import { Dropdown, Card, Nav, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../store/slices/authSlice";
import "./LoginCard.css";
import AuthService from "../../../services/authService";

const LoginCard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"individual" | "corporate">(
    "individual"
  );

  const dispatch = useDispatch();

  const authState = useSelector((store: any) => store.auth);

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleFormSubmit = async (e: any) => {
    console.log(email);
    e.preventDefault();
    try {
      await AuthService.login({ email: email, password: password }).then(
        (response: any) => {
          console.log(response.data);
          dispatch(loginSuccess(response.data));
          console.log(response.data);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const tabContents: Record<string, React.ReactNode> = {
    individual: (
      <Card.Body>
        <Form onSubmit={e => handleFormSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Individual Email address *</Form.Label>
            <Form.Control
              onChange={e => setEmail(e.target.value)}
              value={email || ""}
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
              onChange={e => setPassword(e.target.value)}
              value={password || ""}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 custom-checkbox"
            controlId="formBasicCheckbox"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Form.Check type="checkbox" label="Remember Me" />
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
            <Link className="text-decoration-none" to="/individual-register">
              Sign Up
            </Link>
          </Button>
        </div>
      </Card.Body>
    ),
    corporate: (
      <Card.Body>
        <Form onSubmit={e => handleFormSubmit(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Corporate Email address *</Form.Label>
            <Form.Control
              onChange={e => setEmail(e.target.value)}
              value={email || ""}
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
              onChange={e => setPassword(e.target.value)}
              value={password || ""}
              type="password"
              placeholder="Enter password"
            />
          </Form.Group>
          <Form.Group
            className="mb-3 custom-checkbox"
            controlId="formBasicCheckbox"
            style={{ display: "flex", alignItems: "center" }}
          >
            <Form.Check type="checkbox" label="Remember Me" />
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
            <Link className="text-decoration-none" to="/corporate-register">
              Sign Up
            </Link>
          </Button>
        </div>
      </Card.Body>
    ),
  };

  const handleTabClick = (tab: "individual" | "corporate") => {
    setActiveTab(tab);
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
            style={{ backgroundColor: "#fff5f7" }}
            className="dropdownStyle"
          >
            <Card.Header style={{ backgroundColor: "#AD0A27" }}>
              <Nav variant="tabs" defaultActiveKey="#individual">
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
                    }}
                    href="#individual"
                    active={activeTab === "individual"}
                    onClick={() => handleTabClick("individual")}
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
                    }}
                    href="#corporate"
                    active={activeTab === "corporate"}
                    onClick={() => handleTabClick("corporate")}
                  >
                    Corporate
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Card.Header>

            {tabContents[activeTab]}
          </Card>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default LoginCard;
