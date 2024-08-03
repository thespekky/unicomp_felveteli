import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "universal-cookie";

const AutchContext = createContext();

export const AuthProvider = ({ children }) => {
  const cookies = new Cookies();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedUser, setLoggedUser] = useState({
    lastname: "",
    firstname: "",
    email: "",
    admin: 0,
    phonenumber: "",
  });
  useEffect(() => {
    if (cookies.get("userData")) {
      setIsLoggedIn(true);
      setLoggedUser({
        lastname: cookies.get("userData").lastname,
        firstname: cookies.get("userData").firstname,
        email: cookies.get("userData").email,
        admin: cookies.get("userData").admin,
        phonenumber: cookies.get("userData").phonenumber,
      });
    }
  }, []);
  const navigate = useNavigate();
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
      console.log(isLoggedIn);
    }
  }, [isLoggedIn]);

  const login = (datas) => {
    cookies.set("userData", datas, { path: "/" });
    setLoggedUser({
      lastname: datas.lastname,
      firstname: datas.firstname,
      email: datas.email,
      admin: datas.admin,
      phonenumber: datas.phonenumber,
    });
    setIsLoggedIn(true);
  };
  const logout = () => {
    if (isLoggedIn) {
      cookies.remove("userData", { path: "/" });
      setIsLoggedIn(false);
      setLoggedUser({
        lastname: "",
        firstname: "",
        email: "",
        admin: 0,
        phonenumber: "",
      });

      navigate("/");
    }
  };
  return (
    <AutchContext.Provider value={{ login, logout, isLoggedIn, loggedUser }}>
      {children}
    </AutchContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(AutchContext);
};
