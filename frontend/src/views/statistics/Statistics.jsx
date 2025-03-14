import { Chart } from "primereact/chart";
import { FaUtensils, FaDumbbell, FaMoon, FaBalanceScale } from "react-icons/fa";

export const Statistics = () => {
  const sleepData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Hours",
        data: [7, 6, 8, 5, 7.5],
        borderColor: "#82ca9d",
        fill: false,
      },
    ],
  };

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

  const weightData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Weight (kg)",
        data: [75, 74.5, 74, 73.8],
        borderColor: "#ff7300",
        fill: false,
      },
    ],
  };

  const workoutData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      { label: "Sessions", data: [1, 0, 2, 1, 1], backgroundColor: "#4caf50" },
    ],
  };

  return (
    <div className="p-6 grid gap-6 grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaMoon className="mr-2" /> Alvási szokások
        </h2>
        <Chart type="line" data={sleepData} />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaUtensils className="mr-2" /> Étkezési szokások
        </h2>
        <Chart type="bar" data={mealData} />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaBalanceScale className="mr-2" /> Súly statisztika
        </h2>
        <Chart type="line" data={weightData} />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaDumbbell className="mr-2" /> Edzések
        </h2>
        <Chart type="bar" data={workoutData} />
      </div>
    </div>
  );
};
