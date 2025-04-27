import { RedirectIfAuthenticated } from "@features/authentication/RedirectIfAuthenticated";
import { RequireAuth } from "@features/authentication/RequireAuth";
import { ThemeProvider } from "@features/theme/ThemeProvider";
import { Layout } from "@layouts/Layout";
import { WelcomeLayout } from "@layouts/WelcomeLayout";
import { AuthenticationPage } from "@pages/AuthenticationPage";
import { Home } from "@pages/Home";
import { Meal } from "@pages/Meal";
import { Profile } from "@pages/Profile";
import { Settings } from "@pages/Settings";
import { Sleep } from "@pages/Sleep";
import { Weight } from "@pages/Weight";
import { Welcome } from "@pages/Welcome";
import { Workout } from "@pages/Workout";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <>
      <ThemeProvider />

      <BrowserRouter>
        <Routes>
          {/* Routes for NOT logged in users */}
          <Route element={<RedirectIfAuthenticated />}>
            {/* Welcome layout (this is where users arrives first) */}
            <Route element={<WelcomeLayout />}>
              <Route index element={<Welcome />} />
              <Route path="auth" element={<AuthenticationPage />} />
            </Route>
          </Route>

          {/* Routes for LOGGED IN users */}
          <Route element={<RequireAuth />}>
            {/* Logged in layout */}
            <Route element={<Layout />}>
              <Route path="home" index element={<Home />} />
              <Route path="workouts" element={<Workout />} />
              <Route path="meals" element={<Meal />} />
              <Route path="sleep" element={<Sleep />} />
              <Route path="weight" element={<Weight />} />
              <Route path="profile" element={<Profile />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
