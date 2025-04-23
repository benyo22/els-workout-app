import { NavLink } from "react-router";
import { useDispatch } from "react-redux";

import { FaBalanceScale } from "react-icons/fa";
import { FaDumbbell, FaUtensils, FaBed, FaChartLine } from "react-icons/fa6";

import { FeatureCard } from "@features";
import { DarkModeToggle } from "@features";
import { setLoginActive, setRegisterActive } from "@store/slices/authViewSlice";

export const Welcome = () => {
  const dispatch = useDispatch();

  return (
    <div className="h-screen w-screen text-primary-white flex flex-col items-center">
      <header className="welcome-header">
        <h2 className="text-2xl font-bold text-primary-green ">
          Eat Lift Sleep
        </h2>
        <div className="ml-5">
          <DarkModeToggle />
        </div>
      </header>

      <main className="w-full max-w-4xl text-center py-20 px-4">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
          Alakítsd át a fitnesz utadat az{" "}
          <span className="text-primary-green">ELS</span> segítségével
        </h1>
        <p className="text-lg md:text-xl mb-6">
          Kövesd nyomon az edzéseidet, az étkezéseidet és az alvásodat
          könnyedén, hogy gyorsabban elérd a fitnesz céljaidat!
        </p>
        <nav className="flex justify-center gap-4">
          <NavLink
            to="auth"
            className="green-button"
            onClick={() => dispatch(setLoginActive())}
          >
            Bejelentkezés
          </NavLink>
          <NavLink
            to="auth"
            className="white-blue-button"
            onClick={() => dispatch(setRegisterActive())}
          >
            Regisztráció
          </NavLink>
        </nav>
      </main>

      <section className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 p-10">
        <FeatureCard
          icon={<FaDumbbell />}
          title="Edzés"
          description="Rögzítsd és elemezd az edzési rutinodat."
        />
        <FeatureCard
          icon={<FaUtensils />}
          title="Táplálkozás"
          description="Kövesd nyomon az étkezéseidet és a kalóriabeviteled."
        />
        <FeatureCard
          icon={<FaBed />}
          title="Alvás"
          description="Rögzítsd és fejleszd az alvási szokásaidat."
        />
        <FeatureCard
          icon={<FaBalanceScale />}
          title="Testtömeg"
          description="Rögzítsd és kövesd a súlyod változásait."
        />
        <FeatureCard
          icon={<FaChartLine />}
          title="Elemzések"
          description="Vizuális statisztikák a fejlődésed követésére."
        />
      </section>
    </div>
  );
};
