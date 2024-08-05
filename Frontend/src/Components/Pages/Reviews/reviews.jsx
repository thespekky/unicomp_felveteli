import { useEffect, useState, useContext, Suspense } from "react";
import { useAuth } from "../../AuthContext/AuthContext";
import { GetAllData } from "../../FetchData/FetchData";
import AlertContext from "../../../Components/Alert/alert.context";
import { Alert } from "../../../Components/Alert/Alert";
import cover_photo from "../../../assets/cover_photo.jpg";
import { useNavigate } from "react-router-dom";
export default function Reviews() {
  const [konyvek, setKonyvek] = useState([]);
  const navigate = useNavigate();
  const [, sertAlert] = useContext(AlertContext);
  const showAlert = (text, type) => {
    sertAlert({
      text,
      type,
    });
  };
  const getData = async () => {
    const data = await GetAllData("/books");
    if (data.books) {
      setKonyvek(data.books);
    } else {
      showAlert(data.message, "danger");
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Alert />
      <div style={{ textAlign: "center", padding: "3px" }}>
        Kapcsoljon a könyvre és nézze meg az értékeléseket
      </div>
      <Suspense fallback={<div>Töltés...</div>}>
        <div className="d-flex flex-row flex-wrap">
          {konyvek.map((konyv) => (
            <div
              onClick={() => {
                navigate("/ertekelesek/" + konyv._id);
              }}
              className="card konyvekcard"
              key={konyv._id}
              style={{ width: "18rem", minWidth: "18rem" }}
            >
              <img
                src={cover_photo}
                className="card-img-top konyvekimage"
                alt="..."
              />
              <div className="card-body">
                <h5 className="card-title">{konyv.name}</h5>
                <p className="card-text">{konyv.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Suspense>
    </>
  );
}
