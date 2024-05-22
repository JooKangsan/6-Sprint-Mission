import React from "react";
import logo from "../../assets/img/logo.svg";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";

function getLinkStyle({ isActive }) {
  return { color: isActive ? "blue" : undefined };
}

const Header = () => {
  return (
    <div className="Header">
      <div className="HeaderLeft">
        <Link to="/" className="HeaderLogo">
          <img src={logo} alt="판다마켓 로고" />
        </Link>
        <div className="HeaderLink">
          <NavLink to="/community" style={getLinkStyle}>
            자유게시판
          </NavLink>
          <NavLink to="/items" style={getLinkStyle}>
            중고마켓
          </NavLink>
        </div>
      </div>
      <Link to="/login" className="loginButton">
        로그인
      </Link>
    </div>
  );
};

export default Header;
