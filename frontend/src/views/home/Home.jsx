import { NavLink } from "react-router-dom";

import { FaBalanceScale } from "react-icons/fa";
import { FaDumbbell, FaUtensils, FaBed } from "react-icons/fa6";

export const Home = () => {
  return (
    <div className="p-8 bg-gradient-to-br from-primary-blue to-third-blue dark:from-dark-dark dark:to-dark-medium rounded-lg">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary-white dark:text-dark-primary-blue">
          Üdv újra az ELS-ben! 💪
        </h1>
        <p className="text-lg text-gray-100 dark:text-dark-secondary-blue mb-8">
          Itt az ideje, hogy ma is tegyél magadért! Nézd meg az eddigi
          haladásod, rögzíts új adatokat, vagy csak nézz körül.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-primary-white rounded-2xl shadow-md p-6 hover:shadow-lg transition dark:bg-dark-light">
            <h2 className="flex items-center gap-x-4 text-xl font-semibold mb-2 text-primary-blue dark:text-dark-primary-blue">
              <FaUtensils /> Étkezések
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Kövesd, mit ettél ma, és rögzíts új ételeket.
            </p>
            <NavLink to="/meals" className="blue-button px-4">
              Étkezések megtekintése
            </NavLink>
          </div>

          <div className="bg-primary-white rounded-2xl shadow-md p-6 hover:shadow-lg transition dark:bg-dark-light">
            <h2 className="flex items-center gap-x-4 text-xl font-semibold mb-2 text-primary-blue dark:text-dark-primary-blue">
              <FaDumbbell /> Edzések
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Nézd meg a legutóbbi edzéseid vagy kezdj egy újat.
            </p>
            <NavLink to="/workouts" className="blue-button px-4">
              Edzések megtekintése
            </NavLink>
          </div>

          <div className="bg-primary-white rounded-2xl shadow-md p-6 hover:shadow-lg transition dark:bg-dark-light">
            <h2 className="flex items-center gap-x-4 text-xl font-semibold mb-2 text-primary-blue dark:text-dark-primary-blue">
              <FaBed /> Alvás
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Rögzítsd az alvásod és kövesd a pihenésed minőségét.
            </p>
            <NavLink to="/sleep" className="blue-button px-4">
              Alvás naplózása
            </NavLink>
          </div>

          <div className="bg-primary-white rounded-2xl shadow-md p-6 hover:shadow-lg transition dark:bg-dark-light">
            <h2 className="flex items-center gap-x-4 text-xl font-semibold mb-2 text-primary-blue dark:text-dark-primary-blue">
              <FaBalanceScale /> Súly
            </h2>
            <p className="text-gray-600 mb-4 dark:text-gray-200">
              Rögzítsd a súlyod és kövesd a fejlődséd.
            </p>
            <NavLink to="/weight" className="blue-button px-4">
              Súly naplózása
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};
