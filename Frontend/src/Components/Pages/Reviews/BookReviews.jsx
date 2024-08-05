import { useParams } from "react-router-dom";
import { useEffect, useState, useContext, Suspense } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import {
  GetAllData,
  UpdateDataToken,
  DeleteDataBody,
} from "../../FetchData/FetchData";
import AlertContext from "../../../Components/Alert/alert.context";
import { Alert } from "../../../Components/Alert/Alert";
import { useNavigate } from "react-router-dom";
export default function BookReviews() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [oneReview, setOneReview] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [, sertAlert] = useContext(AlertContext);
  const { loggedUser } = useAuth();
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  const getData = async () => {
    const data = await GetAllData("/books/" + id + "/reviews");
    if (data.allReviews) {
      setReviews(data.allReviews);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  async function UpdateReview(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    if (loggedUser.id !== oneReview.userid) {
      showAlert("Nem te vagy aki ezt létrehozta", "danger");
      return;
    }
    const body = {
      review: {
        rating: formData.get("rating"),
        description: formData.get("description"),
      },
      user: {
        email: loggedUser.email,
      },
    };
    const data = await UpdateDataToken("/reviews/" + oneReview._id, body);
    if (data.message == "sikeres frissítés") {
      showAlert(data.message, "success");
    } else {
      showAlert(data.message, "danger");
    }
  }

  async function DeleteReview() {
    if (loggedUser.id !== oneReview.userid) {
      showAlert("Nem te vagy aki ezt létrehozta", "danger");
      return;
    }
    let text = "Biztos hogy törölni akarod ezt a könyvet?";
    if (confirm(text) == true) {
      const data = await DeleteDataBody("/reviews/" + oneReview._id, {
        email: loggedUser.email,
      });
      if (data.message == "Sikeres törlés") {
        showAlert(data.message, "success");
      } else {
        showAlert(data.message, "danger");
      }
    }
  }

  return (
    <>
      <Alert />

      <Suspense fallback={<div>Töltés...</div>}>
        <div className="d-flex flex-row flex-wrap">
          {reviews.length === 0 ? (
            <div style={{ width: "100%", textAlign: "center", padding: "3px" }}>
              Nincsenek ennek a könyvnek értékelései
            </div>
          ) : (
            reviews.map((review) => (
              <div
                onClick={() => {
                  setOneReview(review);
                }}
                className="card konyvekcard m-1"
                key={review._id}
                style={{ width: "18rem", minWidth: "18rem" }}
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
              >
                <div className="card-body">
                  <h5 className="card-title">{review.rating}</h5>
                  <p className="card-text">{review.description}</p>
                </div>
              </div>
            ))
          )}
        </div>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title fs-5" id="exampleModalLabel">
                  Értékelés módosítása
                </h1>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={UpdateReview} className="p-2">
                  <label htmlFor="">Értékelés: </label>
                  <input
                    type="number"
                    name="rating"
                    min={1}
                    max={5}
                    defaultValue={oneReview.rating}
                    className="m-2"
                    disabled={loggedUser.id !== oneReview.userid}
                  />
                  <div
                    className="form-floating"
                    style={{ marginBottom: "3px" }}
                  >
                    <textarea
                      name="description"
                      className="form-control"
                      placeholder="Leave a comment here"
                      id="floatingTextarea2"
                      style={{ height: "100px", width: "100%" }}
                      defaultValue={oneReview.description}
                      disabled={loggedUser.id !== oneReview.userid}
                    ></textarea>
                    <label htmlFor="floatingTextarea2">Értékelés</label>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-warning"
                    disabled={loggedUser.id !== oneReview.userid}
                  >
                    Módosítás
                  </button>
                  <button
                    type="button"
                    className="btn btn-danger"
                    style={{ float: "right" }}
                    onClick={() => {
                      DeleteReview();
                    }}
                    disabled={loggedUser.id !== oneReview.userid}
                  >
                    Törlés
                  </button>
                </form>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}
