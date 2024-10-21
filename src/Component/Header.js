import React from "react";
import logo from "../assets/logo192.png";
function Header() {
  return (
    <header className="app-header">
      <img src={logo} alt="react-logo" />
      <h1 className="p-4">The React Quiz</h1>
    </header>
  );
}

export default Header;
