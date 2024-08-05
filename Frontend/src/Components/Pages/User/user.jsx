import { useNavigate } from "react-router-dom";
import { useEffect, useContext, Suspense, useState } from "react";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
import Cookies from "universal-cookie";
import { GetAData } from "../../FetchData/FetchData";
import { useAuth } from "../../AuthContext/AuthContext";
const cookies = new Cookies();
export default function User() {
  const navigate = useNavigate();
  const [, setAlert] = useContext(AlertContext);
  const [user, setUser] = useState({});
  const { login, loggedUser } = useAuth();
  const showAlert = (text, type) => {
    setAlert({
      text,
      type,
    });
  };
  const GetData = async () => {
    const data = await GetAData("/users/me");
    if (data.user) {
      setUser(data.user);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    if (!cookies.get("userData")) {
      navigate("/");
    } else {
      GetData();
    }
  }, []);

  return (
    <>
      <Alert />
      <Suspense fallback={<div>Loading...</div>}>
        <div className="card konyvekcard" style={{ width: "100%" }}>
          <div className="card-body">
            <h5 className="card-title">Email cím: {user.email}</h5>
            <p className="card-text">
              Név: {user.firstname + " " + user.lastname}
            </p>
            <p className="card-text">Telefonszám: {user.phonenumber}</p>
            <p className="card-text">
              Jogosultság: {user.admin ? "Admin" : "User"}
            </p>
          </div>
        </div>
      </Suspense>
    </>
  );
}
