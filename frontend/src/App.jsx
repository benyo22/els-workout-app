import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "./views/home/Home";
import { Login } from "./views/loginregister/login/Login";
import { Layout } from "./views/layout/Layout";
import { Register } from "./views/loginregister/register/Register";
import { AuthPage } from "./views/loginregister/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />}></Route>
          <Route path="auth" element={<AuthPage />}></Route>
          {/* <Route path="register" element={<Register />}></Route> */}
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
