import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "./views/home/Home";
import { Layout } from "./views/layout/Layout";
import { AuthPage } from "./views/loginregister/AuthPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" index element={<Home />}></Route>
          <Route path="auth" element={<AuthPage />}></Route>
          <Route path="*" element={<Navigate to="/" />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
