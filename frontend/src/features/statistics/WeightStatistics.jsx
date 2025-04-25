/* eslint-disable react/prop-types */
import { useGetWeightByUserIdQuery } from "@api/endpoints/weightEndpoints";
import { selectUserId } from "@store/slices/authSlice";
import { formatWeight } from "@utils/formatWeight";
import { getEndOfWeek } from "@utils/getEndOfWeek";
import { getStartOfWeek } from "@utils/getStartOfWeek";
import { Button } from "primereact/button";
import { Calendar } from "primereact/calendar";
import { Chart } from "primereact/chart";
import { useCallback, useEffect, useState } from "react";
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from "react-icons/fa";
import { useSelector } from "react-redux";

export const WeightStatistics = ({ setVisible }) => {
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
          <div className="flex flex-col justify-center">
            <div className="flex justify-between">
              <h3 className="font-bold text-xl">Súly statisztika</h3>
              <Button
                label="Napló"
                onClick={() => setVisible(false)}
                className="edit-button py-1 mb-4"
                unstyled
              />
            </div>

            <div className="flex justify-between items-center gap-x-1 md:gap-x-0">
              <Button
                icon={<FaArrowAltCircleLeft className="ml-1" />}
                onClick={handlePreviousWeek}
                className="blue-button flex justify-center items-center h-10 w-10 rounded-full"
                unstyled
              />

              <Calendar
                name="date"
                value={getStartOfWeek(selectedDate)}
                onChange={(e) => setSelectedDate(e.target.value)}
                showIcon
              />

              <Button
                icon={<FaArrowAltCircleRight className="ml-1" />}
                onClick={handleNextWeek}
                className="blue-button flex justify-center items-center h-10 w-10 rounded-full"
                unstyled
              />
            </div>
          </div>

          <Chart type="line" data={weightData} options={chartOptions} />
        </>
      )}
    </>
  );
};
