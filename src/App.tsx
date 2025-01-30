import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./views/Home.tsx";
import AuthLayout from "./layouts/AuthLayout.tsx";
import Login from "./views/Login.tsx";
import Register from "./views/Register.tsx";
import AuthRoute from "./util/router/AuthRoute.tsx";
import GuestRoute from "./util/router/GuestRoute.tsx";
import { useAuth } from "./context/AuthContext.tsx";

export default function App() {
  const { user } = useAuth();
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRoute isAuth={!!user} redirectPath="/login" />}>
          <Route index element={<Home />} />
        </Route>
        <Route element={<GuestRoute isAuth={!!user} redirectPath="/" />}>
          <Route element={<AuthLayout />}>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
