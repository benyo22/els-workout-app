/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import {
  FaTable,
  FaArrowAltCircleRight,
  FaArrowAltCircleLeft,
} from "react-icons/fa";
import { Chart } from "primereact/chart";
import { Button } from "primereact/button";

import { getEndOfWeek, getStartOfWeek } from "../../utils/helper";
import { selectUserId } from "../../state/slices/authSlice";
import { useGetWorkoutByUserIdQuery } from "../../state/endpoints/workoutEndpoints";

export const WorkoutStatistics = ({ setVisible }) => {
  const userId = useSelector(selectUserId);
  const { data, isLoading } = useGetWorkoutByUserIdQuery(userId);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filterDataByWeek = useCallback(
    (selectedDate) => {
      const startOfWeek = getStartOfWeek(selectedDate);
      const endOfWeek = getEndOfWeek(selectedDate);

      const weekData = data?.filter((workout) => {
        const workoutDate = new Date(workout.date);
        return workoutDate >= startOfWeek && workoutDate <= endOfWeek;
      });

      const sortedWeekData = weekData.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      const groupedByDate = sortedWeekData?.reduce((acc, workout) => {
        const workoutDate = new Date(workout.date).toLocaleDateString("hu-HU");
        if (!acc[workoutDate]) {
          acc[workoutDate] = 0;
        }
        acc[workoutDate] += 1;
        return acc;
      }, {});

      const sortedGroupedData = Object.entries(groupedByDate).map(
        ([date, count]) => ({
          date,
          count,
        })
      );

      setFilteredData(sortedGroupedData);
    },
    [data]
  );

  useEffect(() => {
    if (data) {
      filterDataByWeek(selectedDate);
    }
  }, [data, selectedDate, filterDataByWeek]);

  const handlePreviousWeek = () => {
    const previousWeek = new Date(selectedDate);
    previousWeek.setDate(previousWeek.getDate() - 7);
    setSelectedDate(previousWeek);
    filterDataByWeek(previousWeek);
  };

  const handleNextWeek = () => {
    const nextWeek = new Date(selectedDate);
    nextWeek.setDate(nextWeek.getDate() + 7);
    setSelectedDate(nextWeek);
    filterDataByWeek(nextWeek);
  };

  const workoutData = {
    labels: filteredData?.map((workout) => {
      const weekday = new Date(workout.date).toLocaleString("hu-HU", {
        weekday: "long",
      });
      return weekday.charAt(0).toUpperCase() + weekday.slice(1);
    }),
    datasets: [
      {
        label: "Alkalmak",
        data: filteredData?.map((workout) => workout.count),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgb(75, 192, 192)",
        borderWidth: 1,
        fill: false,
      },
    ],
  };

  return (
    <>
      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">Edzés statisztika</h3>

              <Button
                icon={<FaTable className="ml-1" />}
                onClick={() => setVisible(false)}
                className="edit-button flex items-center mb-2"
                unstyled
              />
            </div>

            <div className="flex justify-around">
              <Button
                icon={<FaArrowAltCircleLeft className="ml-1" />}
                onClick={handlePreviousWeek}
                className="blue-button flex justify-center items-center h-10 w-10 rounded-full"
                unstyled
              />

              {/* Current week */}
              <span className="">
                Hét: {getStartOfWeek(selectedDate).toLocaleDateString("hu-HU")}
              </span>

              <Button
                icon={<FaArrowAltCircleRight className="ml-1" />}
                onClick={handleNextWeek}
                className="blue-button flex justify-center items-center h-10 w-10 rounded-full"
                unstyled
              />
            </div>
          </div>
          <Chart type="bar" data={workoutData} />
        </>
      )}
    </>
  );
};
