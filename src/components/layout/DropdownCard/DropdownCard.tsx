import { useEffect, useState } from "react";
import { Nav, NavDropdown, NavLink } from "react-bootstrap";
import UserService from "../../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { logoutSuccess } from "../../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { GetByIdUserResponse } from "../../../models/user/responses/GetByIdUserResponse";

type Props = {};

const DropdownCard = (props: Props) => {
  const [user, setUser] = useState<GetByIdUserResponse | undefined>();
  const authState = useSelector((store: any) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUser = async () => {
    try {
      await UserService.getById(parseInt(authState.id)).then(
        (response: any) => {
          console.log(response);
          setUser(response.data.data);
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
    <>
      <Nav className="d-flex align-items-center me-5">
        <NavLink className="text-dark">
          <i className="bi bi-person" />
        </NavLink>
        <NavDropdown
          menuVariant="dark"
          title="Hi, Bedirhan"
          id="profile-dropdown"
        >
          <NavDropdown.Item>My Profile</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item>Invoices</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item
            onClick={() => {
              dispatch(logoutSuccess());
              navigate("/");
            }}
          >
            Logout
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </>
  );
};

export default DropdownCard;
