import React from "react";
import { FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  return (
    <header className="header">
      <div className="logo-cont">
        <Link className="logo" to="/">
          goals.
        </Link>
      </div>
      <div className="user-welcome">
        <p>{user && `Welcome ${user.name}!`}</p>
      </div>
      <ul>
        {user ? (
          <li>
            <button
              className="btn"
              to="/register"
              style={{ cursor: "pointer" }}
              onClick={onLogout}
            >
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link className="btn" to="/register">
                <FaUser /> Register
              </Link>
            </li>
            <li>
              <Link className="btn" to="/login">
                <FaSignInAlt /> Login
              </Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
}

export default Header;
