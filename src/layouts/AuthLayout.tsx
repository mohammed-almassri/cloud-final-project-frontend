import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className=" flex flex-col md:grid grid-cols-1 md:grid-cols-2 items-center justify-center min-h-screen max-h-screen">
      <div className="p-4 text-center md:text-start max-w-sm md:w-lg mx-auto h-48 flex flex-col justify-center items-center md:items-start  md:h-screen">
        <h1 className="text-3xl font-bold mb-5">CloudAuth</h1>
        <h2 className="text-lg text-blue-900">
          A simple authentication app built with AWS
        </h2>
      </div>
      <div className="grow-1 bg-white h-screen  flex items-center justify-center w-full">
        <Outlet />
      </div>
    </div>
  );
}
