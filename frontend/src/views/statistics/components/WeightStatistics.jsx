import { useSelector } from "react-redux";
import { useCallback, useEffect, useState } from "react";

import { Chart } from "primereact/chart";
import { Button } from "primereact/button";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

import {
  formatWeight,
  getEndOfWeek,
  getStartOfWeek,
} from "../../../utils/helper";
import { selectUserId } from "../../../state/slices/authSlice";
import { useGetWeightByUserIdQuery } from "../../../state/endpoints/weightEndpoints";

export const WeightStatistics = () => {
  const userId = useSelector(selectUserId);
  const { data, isLoading } = useGetWeightByUserIdQuery(userId);
  const [filteredData, setFilteredData] = useState(data);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const filterDataByWeek = useCallback(
    (selectedDate) => {
      const startOfWeek = getStartOfWeek(selectedDate);
      const endOfWeek = getEndOfWeek(selectedDate);

      const weekData = data?.filter((weight) => {
        const weightDate = new Date(weight.date);
        return weightDate >= startOfWeek && weightDate <= endOfWeek;
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

  const weightData = {
    labels: filteredData?.map((weight) => {
      const weekday = new Date(weight.date).toLocaleString("hu-HU", {
        weekday: "long",
      });
      return weekday.charAt(0).toUpperCase() + weekday.slice(1);
    }),
    datasets: [
      {
        label: "Súly",
        data: filteredData?.map((weight) => weight.weight),
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
            return formatWeight(tooltipItem.raw);
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
          </div>

          <Chart type="line" data={weightData} options={chartOptions} />
        </>
      )}
    </>
  );
};
