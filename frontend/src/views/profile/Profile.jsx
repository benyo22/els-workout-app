import { Carousel } from "./components/Carousel";
import { UserData } from "./components/UserData";

export const Profile = () => {
  return (
    <div className="w-full max-w-sm md:max-w-md shadow-lg rounded-xl p-6 border border-primary-grey">
      <UserData />
      <Carousel />
    </div>
  );
};
