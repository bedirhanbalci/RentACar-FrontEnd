import { Link } from "react-router-dom";
import "./Navbar.css";

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
        <li>About</li>
        <li className="nav-contact">Contact</li>
      </ul>
    </div>
  );
}

export default Navbar;
