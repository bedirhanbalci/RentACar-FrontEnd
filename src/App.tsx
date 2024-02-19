import { ReactElement } from "react";
import "./app.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
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
import Branches from "./pages/Branches/Branches";
import OverlayLoader from "./components/layout/OverlayLoader/OverlayLoader";
import About from "./pages/About/About";
import NotFound from "./pages/NotFound/NotFound";
import AssurancePackage from "./pages/AssurancePackage/AssurancePackage";
import AdditionalFeature from "./pages/AdditionalFeature/AdditionalFeature";
import Rental from "./pages/Rental/Rental";
import OrderComplete from "./pages/OrderComplete/OrderComplete";
import Profile from "./pages/Profile/Profile";
import Invoice from "./pages/Invoice/Invoice";
import ProtectedRoute from "./guards/ProtectedRoute";
function App(): ReactElement {
  return (
    <>
      <OverlayLoader />
      <Navbar />
      <div className="app">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/car-list" element={<CarList />}></Route>
          <Route path="/branches" element={<Branches />}></Route>

          <Route path="/about" element={<About />}></Route>
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
          <Route path="/reservation" element={<Reservation />} />
          <Route path="*" element={<NotFound />} />
          <Route
            path="/assurance-package"
            element={<AssurancePackage />}
          ></Route>
          <Route
            path="/additional-feature"
            element={<AdditionalFeature />}
          ></Route>
          <Route path="/rental" element={<Rental />}></Route>
          <Route
            path="/order-complete"
            element={
              <ProtectedRoute>
                <OrderComplete />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          ></Route>
          <Route
            path="/invoice"
            element={
              <ProtectedRoute>
                <Invoice />
              </ProtectedRoute>
            }
          ></Route>
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
