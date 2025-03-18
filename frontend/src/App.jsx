import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "./state/slices/darkModeSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "./views/home/Home";
import { Sleep } from "./views/sleep/Sleep";
import { Layout } from "./views/layout/Layout";
import { Weight } from "./views/weight/Weight";
import { Profile } from "./views/profile/Profile";
import { Welcome } from "./views/welcome/Welcome";
import { Workout } from "./views/workout/Workout";
import { Settings } from "./views/settings/Settings";
import { RequireAuth } from "./views/auth/RequireAuth";
import { AuthPage } from "./views/loginregister/AuthPage";
import { Statistics } from "./views/statistics/Statistics";
import { WelcomeLayout } from "./views/welcomelayout/WelcomeLayout";
import { RedirectIfAuthenticated } from "./views/auth/RedirectIfAuthenticated";

function App() {
  const darkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const loadTheme = (theme) => {
      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = theme;
      link.id = "dynamic-theme";
      document.head.appendChild(link);
    };

    const removeTheme = () => {
      const currentTheme = document.getElementById("dynamic-theme");
      if (currentTheme) currentTheme.remove();
    };

    removeTheme();

    if (darkMode) {
      loadTheme(
        "node_modules/primereact/resources/themes/lara-dark-blue/theme.css"
      );
    } else {
      loadTheme(
        "node_modules/primereact/resources/themes/lara-light-blue/theme.css"
      );
    }

    return () => {
      removeTheme();
    };
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Routes for NOT logged in users */}
        <Route element={<RedirectIfAuthenticated />}>
          {/* Welcome layout (this is where users arrives first) */}
          <Route element={<WelcomeLayout />}>
            <Route index element={<Welcome />} />
            <Route path="auth" element={<AuthPage />} />
          </Route>
        </Route>

        {/* Routes for LOGGED IN users */}
        <Route element={<RequireAuth />}>
          {/* Logged in layout */}
          <Route element={<Layout />}>
            <Route path="home" index element={<Home />} />
            <Route path="workouts" element={<Workout />} />
            <Route path="sleep" element={<Sleep />} />
            <Route path="weight" element={<Weight />} />
            <Route path="statistics" element={<Statistics />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
