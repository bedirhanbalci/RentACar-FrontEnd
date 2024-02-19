import { useEffect, useState } from "react";
import { Nav, NavDropdown } from "react-bootstrap";
import UserService from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../store/slices/authSlice";
import { Link, useNavigate } from "react-router-dom";
import "./DropdownCard.css";

type Props = {};

const DropdownCard = (props: Props) => {
  const [user, setUser] = useState<any>([{ firstName: "", contactName: "" }]);
  const authState = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await UserService.getById(parseInt(authState.id)).then(
        (response: any) => {
          setUser(response.data);
        }
      );
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="mt-2">
      <Nav className="d-flex align-items-center me-5">
        <i className="bi bi-person" />
        <NavDropdown
          title={`Hi, ${user[0].firstName ? user[0].firstName : ""} ${
            user[0].contactName ? user[0].contactName : ""
          } `}
          id="profile-dropdown"
        >
          {/* Dropdown Mobile Screen - Start*/}
          <div className="d-flex flex-column d-lg-none">
            <NavDropdown.Item as={Link} to="/" className="text-dark">
              Home
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/car-list" className="text-dark">
              Cars
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/branches" className="text-dark">
              Branches
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/about" className="text-dark">
              About
            </NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item as={Link} to="/contact" className="text-dark">
              Contact
            </NavDropdown.Item>
            <NavDropdown.Divider />
          </div>
          {/* Dropdown Mobile Screen - End*/}

          {/* Dropdown All Screen - Start*/}
          <NavDropdown.Item as={Link} to="/profile" className="text-dark">
            My Profile
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item as={Link} to="/invoice" className="text-dark">
            Invoices
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            className="text-dark"
            onClick={() => {
              dispatch(logoutSuccess());
              navigate("/");
            }}
          >
            Logout
          </NavDropdown.Item>
          {/* Dropdown All Screen - End*/}
        </NavDropdown>
      </Nav>
    </div>
  );
};

export default DropdownCard;
