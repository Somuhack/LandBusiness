// src/routes/PrivateRoute.js
import { Navigate} from "react-router-dom";

const PrivateRoute = ({children}) => {
  const token = sessionStorage.getItem("userToken");
  return token ? children : <Navigate to="/login" replace />;
};

export default PrivateRoute;
