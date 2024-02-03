import { Link } from "react-router-dom";
import "./Navbar.css";
import LoginCard from "../LoginCard/LoginCard";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="nav">
      <Link className="text-black text-decoration-none" to={"/"}>
        <div className="nav-logo">2B2 Rent A Car</div>
      </Link>
      <ul className="nav-menu">
        <Link className="text-black text-decoration-none" to={"/"}>
          <li>Home</li>
        </Link>
        <Link className="text-black text-decoration-none" to={"/car-list"}>
          <li>Cars</li>
        </Link>
        <Link className="text-black text-decoration-none" to={"/branches"}>
          <li>Branches</li>
        </Link>
        <Link className="text-black text-decoration-none" to={"/about"}>
          <li>About</li>
        </Link>
        <Link className="text-black text-decoration-none" to={"/contact"}>
          <li className="nav-contact">Contact</li>
        </Link>
        <div className="text-black text-decoration-none">
          <li>
            <LoginCard />
          </li>
        </div>
      </ul>
    </div>
  );
}

export default Navbar;
