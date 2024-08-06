import { useNavigate } from "react-router-dom";
import { useEffect, useContext } from "react";
import AlertContext from "../../Alert/alert.context";
import { Alert } from "../../Alert/Alert";
import Cookies from "universal-cookie";
import { PostData } from "../../FetchData/FetchData";
const cookies = new Cookies();
export default function NewBook() {
  const navigate = useNavigate();
  const [, setAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    setAlert({
      text,
      type,
    });
  };
  useEffect(() => {
    if (!cookies.get("userData")) {
      navigate("/");
    }
  }, []);
  async function NewBook(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (
      formData.get("name").length == 0 ||
      formData.get("description").length == 0 ||
      formData.get("image").length == 0
    ) {
      showAlert("Nincs minden mező kitöltve", "warning");
      return;
    }
    const body = {
      name: formData.get("name"),
      description: formData.get("description"),
      image: formData.get("image"),
    };
    const data = await PostData("/books", body);
    if (data.message == "Könyv hozzáadva") {
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
          onSubmit={NewBook}
          className="loginform w-50 border border-4 border-secondary rounded p-2 mb-2 bg-secondary-subtle "
        >
          <div className=" form-floating mb-3">
            <input
              name="name"
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name"
            />
            <label className="floatingInput">Név</label>
          </div>
          <div className="form-floating mb-3">
            <textarea
              name="description"
              type="text"
              className="form-control"
              id="floatingdescription"
              placeholder="description"
              style={{ height: "100px" }}
            />
            <label className="floatingdescription">Leírás</label>
          </div>
          <div className="form-floating mb-3">
            <input
              name="image"
              type="text"
              className="form-control"
              id="floatingimage"
              placeholder="image"
            />
            <label className="floatingimage">kép neve</label>
          </div>
          <button type="submit" className="btn btn-success">
            Felvétel
          </button>
        </form>
      </div>
    </>
  );
}
