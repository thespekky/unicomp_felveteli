import { Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Components/AuthContext/AuthContext";
import { AlertPRovider } from "./Components/Alert/alert.context";
import Home from "./Components/Pages/Home/home.jsx";
import Navbar from "./Components/Pages/Navbar/navbar.jsx";
function App() {
  return (
    <>
      <AuthProvider>
        <AlertPRovider>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
        </AlertPRovider>
      </AuthProvider>
    </>
  );
}

export default App;
