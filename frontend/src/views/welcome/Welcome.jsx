import { useDispatch } from "react-redux";
import {
  setLoginActive,
  setRegisterActive,
} from "../../state/slices/authViewSlice";
import { NavLink } from "react-router-dom";

import { FeatureCard } from "./components/FeatureCard";
import { FaDumbbell, FaUtensils, FaBed, FaChartLine } from "react-icons/fa";

export const Welcome = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-[100%] bg-gradient-to-b from-primary-blue to-third-blue text-white flex flex-col items-center">
      <div className="w-full bg-primary-blue py-4 px-6 flex items-center shadow-md">
        <h2 className="text-2xl font-bold text-primary-green">ELS</h2>
      </div>

      <div className="w-full max-w-4xl text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Alakítsd át a fitnesz utadat az{" "}
          <span className="text-primary-green">ELS</span> segítségével
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Kövesd nyomon az edzéseidet, az étkezéseidet és az alvásodat
          könnyedén, hogy gyorsabban elérd a fitnesz céljaidat!
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="auth"
            className="login-button"
            onClick={() => dispatch(setLoginActive())}
          >
            Bejelentkezés
          </NavLink>
          <NavLink
            to="auth"
            className="register-button"
            onClick={() => dispatch(setRegisterActive())}
          >
            Regisztráció
          </NavLink>
        </div>
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-10">
        <FeatureCard
          icon={<FaDumbbell />}
          title="Edzések Nyomon Követése"
          description="Rögzítsd és elemezd az edzési rutinodat."
        />
        <FeatureCard
          icon={<FaUtensils />}
          title="Táplálkozás Figyelése"
          description="Kövesd nyomon az étkezéseidet és a kalóriabeviteled."
        />
        <FeatureCard
          icon={<FaBed />}
          title="Alvás Javítása"
          description="Rögzítsd és fejleszd az alvási szokásaidat."
        />
        <FeatureCard
          icon={<FaChartLine />}
          title="Részletes Elemzések"
          description="Vizuális statisztikák a fejlődésed követésére."
        />
      </div>
    </div>
  );
};
