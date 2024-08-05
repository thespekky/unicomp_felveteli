import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { AlertPRovider } from "./Components/Alert/alert.context";
import Home from "./Components/Pages/Home/home.jsx";
import Navbar from "./Components/Pages/Navbar/navbar.jsx";
import Login from "./Components/Pages/Login/login.jsx";
import Book from "./Components/Pages/Book/book.jsx";
import Reg from "./Components/Pages/Reg/reg.jsx";
import User from "./Components/Pages/User/user.jsx";
import NewBook from "./Components/Pages/Book/newBook.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <AlertPRovider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/belepes" element={<Login />} />
            <Route path="/konyvek/:id" element={<Book />} />
            <Route path="/regisztralas" element={<Reg />} />
            <Route path="/felhasznalo" element={<User />} />
            <Route path="/ujkonyv" element={<NewBook />}></Route>
          </Routes>
        </AlertPRovider>
      </AuthProvider>
    </>
  );
}

export default App;
