import { UserRegisztration } from "../../FetchData/FetchData";
import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AlertContext from "../../../Components/Alert/alert.context";
import { Alert } from "../../../Components/Alert/Alert";
import Cookies from "universal-cookie";
const cookies = new Cookies();
export default function Reg() {
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (cookies.get("userData")) {
      navigate("/");
    }
  }, []);

  async function Regisztralas(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("email").length == 0 ||
      formData.get("password").length == 0 ||
      formData.get("password2").length == 0 ||
      formData.get("lastname").length == 0 ||
      formData.get("firstname").length == 0
    ) {
      showAlert("Nincs minden mező kitöltve", "warning");
      return;
    }
    if (formData.get("password") != formData.get("password2")) {
      showAlert("A jelszó nem egyezik", "warning");
      return;
    }
    if (!/^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(formData.get("password"))) {
      showAlert(
        "A jelszó nem tartalmaz 8 karkaraktert vagy kicsi vagy nagybetűt",
        "warning"
      );
      return;
    }
    const body = {
      email: formData.get("email"),
      password: CryptoJS.SHA1(formData.get("password")).toString(),
      lastname: formData.get("lastname"),
      firstname: formData.get("firstname"),
      phonenumber: formData.get("phonenumber"),
      admin: false,
    };
    const data = await UserRegisztration("/users", body);
    if (data.message == "Felhasználó létrehozva") {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "danger");
    }
  }

  return (
    <>
      <Alert />
      <div className="logindiv d-flex align-items-center justify-content-center align-self-center">
        <form
          onSubmit={Regisztralas}
          className="loginform w-50 border border-4 border-secondary rounded p-2 mb-2 bg-secondary-subtle "
        >
          <div className=" form-floating mb-3">
            <input
              name="email"
              type="email"
              className="form-control"
              id="floatingInput"
              aria-describedby="emailHelp"
              placeholder="name@example.com"
            />
            <label className="floatingInput">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password"
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              aria-describedby="passwordHelp"
            />
            <label className="floatingPassword">Jelszó</label>
            <div id="passwordHelp" className="form-text">
              A jelszó minimum 8 karakterből,nagy és kis betűkből álljon
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              name="password2"
              type="password"
              className="form-control"
              id="floatingPassword2"
              placeholder="Password"
              aria-describedby="passwordHelp2"
            />
            <label className="floatingPassword2">Jelszó még egyszer</label>
            <div id="passwordHelp2" className="form-text">
              A jelszó minimum 8 karakterből,nagy és kis betűkből álljon
            </div>
          </div>
          <div className="form-floating mb-3">
            <input
              name="firstname"
              type="text"
              className="form-control"
              id="floatingfirstname"
              placeholder=""
            />
            <label className="floatingfirstname">Vezeték név</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="lastname"
              type="text"
              className="form-control"
              id="floatinglastname"
              placeholder=""
            />
            <label className="floatinglastname">Kereszt név</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="phonenumber"
              type="tel"
              className="form-control"
              id="floatingphonenumber"
              placeholder=""
              pattern="[0-9]{2}-[0-9]{2}-[0-9]{3}-[0-9]{4}"
              aria-describedby="TelefonHelp"
            />
            <label className="floatingphonenumber">Telefonszám</label>
            <div id="TelefonHelp" className="form-text">
              A telefon szám nem kötelező, példa a formára 06-70-435-0000
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Regisztálás
          </button>
        </form>
      </div>
    </>
  );
}
