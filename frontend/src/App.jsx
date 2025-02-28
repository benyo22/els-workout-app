import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "./views/home/Home";
import { Layout } from "./views/layout/Layout";
import { Profile } from "./views/profile/Profile";
import { Welcome } from "./views/welcome/Welcome";
import { RequireAuth } from "./views/auth/RequireAuth";
import { AuthPage } from "./views/loginregister/AuthPage";
import { WelcomeLayout } from "./views/welcomelayout/WelcomeLayout";
import { RedirectIfAuthenticated } from "./views/auth/RedirectIfAuthenticated";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for NOT logged in users */}
        <Route element={<RedirectIfAuthenticated />}>
          {/* Welcome layout (this is where users arrives first) */}
          <Route element={<WelcomeLayout />}>
            <Route index element={<Welcome />} />
            <Route path="auth" element={<AuthPage />} />
            {/* <Route path="*" element={<Navigate to="/" />}></Route> */}
          </Route>
        </Route>

        {/* Routes for LOGGED IN users */}
        <Route element={<RequireAuth />}>
          {/* Logged in layout */}
          <Route element={<Layout />}>
            <Route path="home" index element={<Home />} />
            <Route path="profile" element={<Profile />} />
            {/* <Route path="*" element={<Navigate to="/home" />} /> */}
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
