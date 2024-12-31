import { Navigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import Loading from "../pages/Loading";

export default function PrivateRouter({ children }: { children: JSX.Element }) {
  const { user, isLoading } = useAuth();
  if (isLoading) {
    return <Loading />;
  }
  if (!user) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}
