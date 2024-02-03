import { ReactElement } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CarList from "./pages/CarList/CarList";
import CarDetail from "./pages/CarDetail/CarDetail";
import CorporateRegister from "./pages/CorporateRegister/CorporateRegister";
import IndividualRegister from "./pages/IndividualRegister/IndividualRegister";
import Contact from "./pages/Contact/Contact";
import { Reservation } from "./pages/Reservation/Reservation";
import LoginCard from "./components/layout/LoginCard/LoginCard";
import Branches from "./pages/Branches/Branches";
function App(): ReactElement {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/car-list" element={<CarList />}></Route>
        <Route path="/branches" element={<Branches />}></Route>
        <Route path="/about" element={<Reservation />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/corporate-register"
          element={<CorporateRegister />}
        ></Route>
        <Route
          path="/individual-register"
          element={<IndividualRegister />}
        ></Route>
        <Route path="/car-detail/:id" element={<CarDetail />}></Route>

        <Route path="/reservation/:id" element={<Reservation />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
