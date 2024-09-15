import { Link } from "react-router-dom";

interface RestaurantCardProps {
  imageUrl: string;
  name: string;
  description: string;
  link: string;
}

const RestaurantCard: React.FC<RestaurantCardProps> = ({
  imageUrl,
  name,
  description,
  link,
}) => {
  return (
    <Link
      to={link}
      className="block bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-transform duration-300 hover:scale-105"
    >
      <img src={imageUrl} alt={name} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
          {name}
        </h2>
        <p className="text-gray-700 dark:text-gray-300">{description}</p>
      </div>
    </Link>
  );
};

export default RestaurantCard;
