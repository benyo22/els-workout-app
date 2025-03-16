/* eslint-disable react/prop-types */
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white dark:bg-dark-light dark:text-primary-white text-black p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
      <div className="text-4xl text-primary-green dark:text-dark-primary-green mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  );
};
