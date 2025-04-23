import { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectDarkMode } from "@store/slices/darkModeSlice";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import { Home } from "@pages";
import { Meal } from "@pages";
import { Sleep } from "@pages";
import { Weight } from "@pages";
import { Profile } from "@pages";
import { Welcome } from "@pages";
import { Workout } from "@pages";
import { Settings } from "@pages";
import { AuthenticationPage } from "@pages";

import { RequireAuth } from "@features";
import { RedirectIfAuthenticated } from "@features";

import { Layout } from "@layouts";
import { WelcomeLayout } from "@layouts";

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
  );
}

export default App;
