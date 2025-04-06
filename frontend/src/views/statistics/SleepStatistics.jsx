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

import {
  getEndOfWeek,
  getStartOfWeek,
  formatSecToHourMin,
} from "../../utils/helper";
import { selectUserId } from "../../state/slices/authSlice";
import { useGetSleepByUserIdQuery } from "../../state/endpoints/sleepEndpoints";

export const SleepStatistics = ({ setVisible }) => {
  const userId = useSelector(selectUserId);
  const { data, isLoading } = useGetSleepByUserIdQuery(userId);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filterDataByWeek = useCallback(
    (selectedDate) => {
      const startOfWeek = getStartOfWeek(selectedDate);
      const endOfWeek = getEndOfWeek(selectedDate);

      const weekData = data?.filter((sleep) => {
        const sleepDate = new Date(sleep.date);
        return sleepDate >= startOfWeek && sleepDate <= endOfWeek;
      });

      const sortedWeekData = weekData?.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );

      setFilteredData(sortedWeekData);
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

  const sleepData = {
    labels: filteredData?.map((sleep) => {
      const weekday = new Date(sleep.date).toLocaleString("hu-HU", {
        weekday: "long",
      });
      return weekday.charAt(0).toUpperCase() + weekday.slice(1);
    }),
    datasets: [
      {
        label: "Óra",
        data: filteredData?.map((sleep) => sleep.durationSec / 3600),
        borderColor: "#31dcb7",
        fill: false,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const durationSec = tooltipItem.raw * 3600;
            return formatSecToHourMin(durationSec);
          },
        },
      },
    },
  };

  return (
    <>
      {isLoading ? (
        <p>Adatok betöltése...</p>
      ) : (
        <>
          <div className="flex justify-around items-center">
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

            <Button
              icon={<FaTable className="ml-1" />}
              onClick={() => setVisible(false)}
              className="edit-button flex items-center mb-2"
              unstyled
            />
          </div>

          <Chart type="line" data={sleepData} options={chartOptions} />
        </>
      )}
    </>
  );
};
