import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, Suspense } from "react";
import { GetAData, GetAllData, PostData } from "../../FetchData/FetchData";
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

  return (
    <>
      <Alert />
      <Suspense fallback={<div>Töltés...</div>}>
        {
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
        }
      </Suspense>
      <form onSubmit={UserReview} className="p-2">
        <select
          className="form-select"
          aria-label="Default select example"
          name="szam"
        >
          <option value="0" defaultValue={0}>
            Kérem válasszon rétékelést
          </option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
        <div className="form-floating">
          <textarea
            name="ertekeles"
            className="form-control"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style={{ height: "100px", width: "100%" }}
          ></textarea>
          <label htmlFor="floatingTextarea2">Értékelés</label>
        </div>
        <div className="mb-3"></div>
        <div className="mb-3 form-check"></div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </>
  );
}
