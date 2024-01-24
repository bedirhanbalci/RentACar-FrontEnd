import { ReactElement } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import Footer from "./components/layout/Footer/Footer";
import Navbar from "./components/layout/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CarList from "./pages/CarList/CarList";

function App(): ReactElement {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/car-list" element={<CarList />}></Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
