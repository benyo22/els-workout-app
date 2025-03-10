/* eslint-disable react/prop-types */
export const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white text-black p-6 rounded-2xl shadow-md flex flex-col items-center text-center">
      <div className="text-4xl text-blue-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
};
