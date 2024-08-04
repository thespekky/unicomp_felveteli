import { Link, useResolvedPath, useMatch } from "react-router-dom";
import { useAuth } from "../../AuthContext/AuthContext";
import { useEffect } from "react";
import Cookies from "universal-cookie";
const cookies = new Cookies();
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
export default function Navbar() {
  const { isLoggedIn, logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link to={"/"} className="navbar-brand">
            Unicomp
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <CostumeLink to={"/"}>Könyvek</CostumeLink>
              {isLoggedIn ? (
                <CostumeLink to={"/felhasznalo"}>Felhasználó</CostumeLink>
              ) : (
                <></>
              )}
            </ul>
            <ul className="navbar-nav mb-2 mb-lg-0">
              {!isLoggedIn ? (
                <CostumeLink to={"/belepes"} className="btn btn-primary">
                  Belépés
                </CostumeLink>
              ) : (
                <CostumeLink onClick={logout} className="btn btn-danger">
                  Kilépés
                </CostumeLink>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
function CostumeLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({ path: resolvedPath.pathname, end: true });
  return (
    <li className={isActive ? "nav-item active" : "nav-item"}>
      <Link className="nav-link" aria-current="page" to={to} {...props}>
        {children}
      </Link>
    </li>
  );
}
