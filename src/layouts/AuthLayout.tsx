import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen ">
      <h1 className="text-3xl font-bold mb-5">Cloud Final Project</h1>
      <Outlet />
    </div>
  );
}
