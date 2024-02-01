import "./Navbar.css";

type Props = {};

function Navbar({}: Props) {
  return (
    <div className="nav">
      <div className="nav-logo">2B2 Rent A Car</div>
      <ul className="nav-menu">
        <li>Home</li>
        <li>Cars</li>
        <li>About</li>
        <li className="nav-contact">Contact</li>
      </ul>
    </div>
  );
}

export default Navbar;
