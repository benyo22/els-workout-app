import { useState } from "react";

import { Chart } from "primereact/chart";
// import { Button } from "primereact/button";
import { TabView, TabPanel } from "primereact/tabview";
import { FaTrophy, FaAppleAlt, FaMoon, FaBalanceScale } from "react-icons/fa";

import { SleepStatistics } from "./components/SleepStatistics";
import { WeightStatistics } from "./components/WeightStatistics";
import { WorkoutStatistics } from "./components/WorkoutStatistics";

export const Statistics = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const mealData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Calories",
        data: [2000, 2200, 1800, 2100, 1900],
        backgroundColor: "#8884d8",
      },
    ],
  };

  return (
    <>
      <div className="settings-container">
        {/* <div className="flex justify-between gap-x-4">
          <Button
            icon={<FaTrophy className="ml-1" />}
            onClick={() => setActiveIndex(0)}
            className={`flex justify-center items-center rounded-full cursor-pointer h-10 w-10 ${
              activeIndex !== 0
                ? "bg-primary-white text-black border-2 border-primary-blue hover:bg-secondary-blue active:bg-secondary-blue hover:text-primary-white dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue dark:bg-dark-light dark:text-primary-white"
                : "bg-primary-blue text-primary-white hover:bg-secondary-blue active:bg-secondary-blue dark:bg-dark-primary-blue dark:hover:bg-secondary-blue dark:active:bg-secondary-blue"
            }`}
            unstyled
          />
          <Button
            label="2"
            onClick={() => setActiveIndex(1)}
            className={`rounded-full cursor-pointer h-10 w-10 ${
              activeIndex !== 1
                ? "bg-primary-white text-black border-2 border-primary-blue hover:bg-secondary-blue active:bg-secondary-blue hover:text-primary-white dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue dark:bg-dark-light dark:text-primary-white"
                : "bg-primary-blue text-primary-white hover:bg-secondary-blue active:bg-secondary-blue dark:bg-dark-primary-blue dark:hover:bg-secondary-blue dark:active:bg-secondary-blue"
            }`}
            unstyled
          />
          <Button
            label="3"
            onClick={() => setActiveIndex(2)}
            className={`rounded-full cursor-pointer h-10 w-10 ${
              activeIndex !== 2
                ? "bg-primary-white text-black border-2 border-primary-blue hover:bg-secondary-blue active:bg-secondary-blue hover:text-primary-white dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue dark:bg-dark-light dark:text-primary-white"
                : "bg-primary-blue text-primary-white hover:bg-secondary-blue active:bg-secondary-blue dark:bg-dark-primary-blue dark:hover:bg-secondary-blue dark:active:bg-secondary-blue"
            }`}
            unstyled
          />
          <Button
            label="4"
            onClick={() => setActiveIndex(3)}
            className={`rounded-full cursor-pointer h-10 w-10 ${
              activeIndex !== 3
                ? "bg-primary-white text-black border-2 border-primary-blue hover:bg-secondary-blue active:bg-secondary-blue hover:text-primary-white dark:hover:bg-dark-secondary-blue dark:active:bg-dark-secondary-blue dark:bg-dark-light dark:text-primary-white"
                : "bg-primary-blue text-primary-white hover:bg-secondary-blue active:bg-secondary-blue dark:bg-dark-primary-blue dark:hover:bg-secondary-blue dark:active:bg-secondary-blue"
            }`}
            unstyled
          />
        </div> */}

        <TabView
          activeIndex={activeIndex}
          onTabChange={(e) => setActiveIndex(e.index)}
        >
          <TabPanel leftIcon={<FaTrophy className="mr-1" />}>
            <WorkoutStatistics />
          </TabPanel>

          <TabPanel leftIcon={<FaAppleAlt className="mr-1" />}>
            <div className="bg-white p-4 shadow rounded-lg">
              <Chart type="bar" data={mealData} />
            </div>
          </TabPanel>

          <TabPanel leftIcon={<FaMoon className="mr-1" />}>
            <SleepStatistics />
          </TabPanel>

          <TabPanel leftIcon={<FaBalanceScale className="mr-1" />}>
            <WeightStatistics />
          </TabPanel>
        </TabView>
      </div>
    </>
  );
};
