import { Dropdown, Card, Nav, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosInstance from "../../../utils/interceptors/axiosInterceptors";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../../../store/slices/authSlice";

const LoginCard: React.FC = () => {
  const dropdownStyle: React.CSSProperties = {
    width: "210px", // Genişlik ayarlayabilirsiniz
    height: "500px", // Yükseklik ayarlayabilirsiniz
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: "#f0f0f0", // Arka plan rengi
    padding: "10px", // Opsiyonel: içerik arasına boşluk ekleyebilirsiniz
  };

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
      const response = await axiosInstance.post("auth/login", {
        email: email,
        password: password,
      });
      dispatch(loginSuccess(response.data));
      console.log(response.data);
      // Burada gerekirse başka işlemler yapabilirsiniz.
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  const tabContents: Record<string, React.ReactNode> = {
    individual: (
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Individual Email address</Form.Label>
            <Form.Control
              onChange={e => setEmail(e.target.value)}
              value={email}
              type="email"
              placeholder="Enter email"
            />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Individual Password</Form.Label>
            <Form.Control
              onChange={e => setPassword(e.target.value)}
              value={password}
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button
            onClick={(e: any) => handleFormSubmit(e)}
            variant="primary"
            type="submit"
          >
            Sign In
          </Button>
        </Form>
        <div style={containerStyle} className="text-center d-grid gap-2">
          <h5>Don't have an Avis account?</h5>
          <Button variant="link" size="sm">
            <Link to="/individual-register">Sign Up</Link>
          </Button>
        </div>
      </Card.Body>
    ),
    corporate: (
      <Card.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Corporate Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Corporate Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>
          <Button variant="primary" type="submit">
            Sign In
          </Button>
        </Form>
        <div style={containerStyle} className="text-center d-grid gap-2">
          <h5>Don't have an Avis account?</h5>
          <Button variant="link" size="sm">
            <Link to="/corporate-register">Sign Up</Link>
          </Button>
        </div>
      </Card.Body>
    ),
  };

  const handleTabClick = (tab: "individual" | "corporate") => {
    setActiveTab(tab);
  };

  useEffect(() => {
    console.log(authState);
  }, [authState]);

  return (
    <div className="btn-group">
      <Dropdown className="d-inline mx-2" autoClose="outside">
        <Dropdown.Toggle id="dropdown-autoclose-outside">Login</Dropdown.Toggle>

        <Dropdown.Menu>
          <Card style={dropdownStyle}>
            <Card.Header>
              <Nav variant="tabs" defaultActiveKey="#individual">
                <Nav.Item>
                  <Nav.Link
                    href="#individual"
                    active={activeTab === "individual"}
                    onClick={() => handleTabClick("individual")}
                  >
                    Individual
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link
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
