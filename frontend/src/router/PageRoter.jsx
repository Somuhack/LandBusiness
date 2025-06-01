import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/user/Login";
import PrivateRoute from "../security/PrivateRoute";
import Home from "../pages/Home";
import Registration from "../pages/user/Registration";

const Roter = () => {
  return (
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration/>} />

        {/* Private Routes */}
      
          <Route path="/home" element={<PrivateRoute><Home/></PrivateRoute>} />
          
       
      </Routes>
  )
}

export default Roter