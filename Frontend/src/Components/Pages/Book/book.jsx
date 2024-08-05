import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, Suspense } from "react";
import {
  GetAData,
  GetAllData,
  PostData,
  UpdateData,
  DeleteData,
} from "../../FetchData/FetchData";
import AlertContext from "../../../Components/Alert/alert.context";
import { Alert } from "../../../Components/Alert/Alert";
import cover_photo from "../../../assets/cover_photo.jpg";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";
import { useAuth } from "../../AuthContext/AuthContext";
const cookie = new Cookies();

export default function Book() {
  let { loggedUser } = useAuth();
  const id = useParams().id;
  const [konyv, setKonyv] = useState([]);
  const [ertekeles, setErtekeles] = useState(0);
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  const getData = async () => {
    const data = await GetAData("/books/" + id);
    if (data.book) {
      setKonyv(data.book);
    } else {
      showAlert(data.message, "danger");
    }
  };
  const getErtekeles = async () => {
    const data = await GetAllData("/books/" + id + "/reviews");
    if (data.allReviews) {
      let sum = 0;
      let count = 0;
      data.allReviews.forEach((review) => {
        sum += review.rating;
        count++;
      });
      setErtekeles(sum / count);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    if (cookie.get("userData")) {
      getData();
      getErtekeles();
    } else {
      navigate("/");
    }
  }, []);

  async function UserReview(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (formData.get("szam") == 0 || formData.get("ertekeles").length == 0) {
      showAlert("Nincs minden mező kitöltve", "warning");
      return;
    }
    const body = {
      rating: formData.get("szam"),
      description: formData.get("ertekeles"),
      userid: loggedUser.id,
      bookid: id,
    };
    const data = await PostData("/books/" + id + "/reviews", body);
    if (data.message == "Hozzáadva") {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "danger");
    }
  }
  async function UpdateBook(e) {
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
    const data = await UpdateData("/books/" + id, body);
    if (data.message == "Könyv frissitve") {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "danger");
    }
  }

  return (
    <>
      <Alert />
      <Suspense fallback={<div>Töltés...</div>}>
        {loggedUser.admin ? (
          <>
            <form onSubmit={UpdateBook} className="loginform  ">
              <div style={{ width: "100%" }}>
                <img
                  src={cover_photo}
                  className="card-img-top konyvekimage"
                  alt="..."
                />
                <div className="form-floating mb-3">
                  <input
                    name="name"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    defaultValue={konyv.name}
                  />
                  <label className="floatingInput">Név</label>
                </div>
                <div className="form-floating mb-3">
                  <textarea
                    name="description"
                    type="text"
                    className="form-control"
                    id="floatingInputdescription"
                    defaultValue={konyv.description}
                  />
                  <label className="floatingInputdescription">leírás</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    name="image"
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    defaultValue={konyv.image}
                  />
                  <label className="floatingInputimage">Kép neve</label>
                </div>
              </div>
              <p className="card-text p-2">A könyv értékelése: {ertekeles}</p>
              <button type="submit" className="btn btn-primary">
                Módosítás
              </button>
              <button
                type="button"
                style={{ float: "right" }}
                className="btn btn-primary btn-danger"
                onClick={() => {
                  let text = "Biztos hogy törölni akarod ezt a könyvet?";
                  if (confirm(text) == true) {
                    DeleteData("/books/" + id);
                    navigate("/");
                  }
                }}
              >
                Törlés
              </button>
            </form>
          </>
        ) : (
          <>
            <div className="card konyvekcard" style={{ width: "100%" }}>
              <img
                src={cover_photo}
                className="card-img-top konyvekimage"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{konyv.name}</h5>

                <p className="card-text">{konyv.description}</p>
                <p className="card-text">A könyv értékelése: {ertekeles}</p>
              </div>
            </div>
          </>
        )}
      </Suspense>
      <form onSubmit={UserReview} className="p-2">
        <select
          className="form-select"
          aria-label="Default select example"
          name="szam"
          style={{ marginBottom: "3px" }}
        >
          <option value="0" defaultValue={0}>
            Kérem válasszon értékelést
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="form-floating" style={{ marginBottom: "3px" }}>
          <textarea
            name="ertekeles"
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", width: "100%" }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Értékelés</label>
        </div>
        <button type="submit" className="btn btn-primary">
          Értékelem
        </button>
      </form>
    </>
  );
}
