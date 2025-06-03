import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/user/Login";
import PrivateRoute from "../security/PrivateRoute";
import Home from "../pages/Home";
import Registration from "../pages/user/Registration";
import ForgotPassword from "../pages/user/ForgotPassword";
import ResetPassword from "../pages/user/ResetPassword";
import About from "../pages/About";
import AddLand from "../components/AddLand";
import AllLands from "../components/AllLands";
import LandDetails from "../components/LandDetails";
import MakePayment from "../pages/Payment/MakePayment";

const Router = () => {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
        {/* Private Routes */}
      
          <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
          <Route path="/about" element={<PrivateRoute><About/></PrivateRoute>} />
          <Route path="/add-land" element={<PrivateRoute><AddLand/></PrivateRoute>} />
          <Route path="/lands" element={<PrivateRoute><AllLands/></PrivateRoute>} />
          <Route path="/land/:id" element={<PrivateRoute><LandDetails/></PrivateRoute>} />
          <Route path="/make-payment" element={<PrivateRoute><MakePayment/></PrivateRoute>} />
          <Route path="*" element={<Landing />} />
      </Routes>
  )
}

export default Router