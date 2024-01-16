import React from "react";
import Navbar from "../Navbar/Navbar";

type Props = {};

const Header = (props: Props) => {
  return (
    <header className="header has-sticky">
      <Navbar></Navbar>
    </header>
  );
};

export default Header;
