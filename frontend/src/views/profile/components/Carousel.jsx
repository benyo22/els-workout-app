/* eslint-disable react/prop-types */
import Slider from "react-slick";

export const Carousel = ({ sleepData }) => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const maxSleepHour = sleepData
    .map((s) => s.durationHour)
    .reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    }, 0);

  return (
    <div className="mt-6">
      <Slider {...sliderSettings}>
        {/* Workouts */}
        <div className="p-4 bg-primary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Edzés</h3>
          <p className="text-xl font-semibold">{12}</p>
          <p className="text-sm">Összes edzés</p>
        </div>

        {/* Meals */}
        <div className="p-4 bg-secondary-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Étkezés</h3>
          <p className="text-xl font-semibold">{22}</p>
          <p className="text-sm">Összes étkezés</p>
        </div>

        {/* Sleep */}
        <div className="p-4 bg-third-blue text-primary-white rounded-lg shadow-md flex flex-col items-center">
          <h3 className="text-lg font-bold">Alvás</h3>
          <p className="text-xl font-semibold">{maxSleepHour} hrs</p>
          <p className="text-sm">Összes alvás</p>
        </div>
      </Slider>
    </div>
  );
};
