import { Navigate, Outlet } from "react-router";

export default function AuthRoute({
  isAuth,
  redirectPath = "/",
}: {
  isAuth: boolean;
  redirectPath?: string;
}) {
  return !isAuth ? <Navigate to={redirectPath} replace /> : <Outlet />;
}
