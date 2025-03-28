/* eslint-disable react/prop-types */
import Slider from "react-slick";

export const Carousel = ({ sleepData, weightData, workoutData }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
  };

  const maxSleepHour = sleepData
    ?.map((s) => s.durationSec)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);
  const hours = Math.floor(maxSleepHour / 3600);
  const minutes = Math.floor((maxSleepHour % 3600) / 60);

  const maxWeightCount = weightData?.length;
  const maxWorkoutCount = workoutData?.length;

  return (
    <div className="mt-6">
      <Slider {...sliderSettings}>
        {/* Workouts */}
        <div className="p-4 bg-secondary-blue dark:bg-dark-secondary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Összes edzés bejegyzés:</h3>
          <p className="text-xl font-semibold">{maxWorkoutCount}</p>
          <p className="text-sm">Edzés</p>
        </div>

        {/* Meals */}
        <div className="p-4 bg-secondary-blue dark:bg-dark-secondary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Összes étkezés bejegyzés:</h3>
          <p className="text-xl font-semibold">{22}</p>
          <p className="text-sm">Étkezés</p>
        </div>

        {/* Sleep */}
        <div className="p-4 bg-secondary-blue dark:bg-dark-secondary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Összes alvással töltött idő:</h3>
          <p className="text-xl font-semibold">
            {hours} óra {minutes} perc
          </p>
          <p className="text-sm">Alvás</p>
        </div>

        {/* Weight */}
        <div className="p-4 bg-secondary-blue dark:bg-dark-secondary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Összes súly bejegyzés:</h3>
          <p className="text-xl font-semibold">{maxWeightCount}</p>
          <p className="text-sm">Súly</p>
        </div>
      </Slider>
    </div>
  );
};
