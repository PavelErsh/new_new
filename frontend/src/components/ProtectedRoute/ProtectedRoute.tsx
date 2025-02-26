import { Navigate } from "react-router-dom";
import { ReactNode, useContext } from "react";
import { AuthContext } from "../../main";

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { store } = useContext(AuthContext);

  if (!store.isAuth) {
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
