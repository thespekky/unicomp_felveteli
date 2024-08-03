import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
import Cookies from "universal-cookie";
import { LoginUser } from "../../FetchData/FetchData";
import { useAuth } from "../../AuthContext/AuthContext";

const cookies = new Cookies();
export default function Login() {
  const navigate = useNavigate();
  const [, setAlert] = useContext(AlertContext);
  const { login } = useAuth();
  const showAlert = (text, type) => {
    setAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      navigate("/");
    }
  }, []);
  async function UserLogin(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("email").length == 0 ||
      formData.get("password").length == 0
    ) {
      showAlert("Nincs minden mező kitöltve", "warning");
      return;
    }
    const body = {
      email: formData.get("email"),
      password: formData.get("password"), // CryptoJS.SHA1(formData.get("password")).toString(),
    };
    const data = await LoginUser("/users/login", body);
    if (data.message) {
      showAlert(data.message, "warning");
    } else {
      const user = {
        lastname: data.user.lastname,
        firstname: data.user.firstname,
        email: data.user.email,
        admin: data.user.admin,
        phonenumber: data.user.phonenumber,
        authtoken: data.token,
      };
      login(user);
    }
  }
  return (
    <>
      <Alert />
      <div className="logindiv d-flex align-items-center justify-content-center align-self-center">
        <form
          onSubmit={UserLogin}
          className="loginform w-50 border border-4 border-secondary rounded p-2 mb-2 bg-secondary-subtle "
        >
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              name="email"
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              name="password"
              type="password"
              className="form-control"
              id="exampleInputPassword1"
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
