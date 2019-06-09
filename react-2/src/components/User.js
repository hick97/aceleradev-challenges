import React from "react";
import { Link } from "react-router-dom";
import { logout } from "../services/loginService";

const User = () => (
  <Link to="/">
    <button className="btn" onClick={logout}>
      Logout
    </button>
  </Link>
);

export default User;
