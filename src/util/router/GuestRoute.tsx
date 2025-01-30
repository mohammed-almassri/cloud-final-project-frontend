import { Navigate, Outlet } from "react-router";

export default function GuestRoute({
  isAuth,
  redirectPath = "/",
}: {
  isAuth: boolean;
  redirectPath?: string;
}) {
  return isAuth ? <Navigate to={redirectPath} replace /> : <Outlet />;
}
