import React from "react";
import { motion } from "framer-motion"; // For smooth animations
import { format } from "date-fns"; // To format the date
import defaultAvatar from "../../assets/default_avatar.png";

interface ReviewProps {
  avatarUrl: string;
  username: string;
  rating: number; // Assume the rating is between 1 and 5
  comment: string;
  createdAt: string; // ISO date string
}

const Review: React.FC<ReviewProps> = ({
  avatarUrl,
  username,
  rating,
  comment,
  createdAt,
}) => {
  // Function to render stars based on the rating
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <motion.span
        key={index}
        whileHover={{ scale: 1.2 }} // Smooth animation on hover
        className={`text-2xl ${
          index < rating ? "text-yellow-500" : "text-gray-300"
        }`}
      >
        ★
      </motion.span>
    ));
  };

  return (
    <div className="p-4 ">
      {/**border-b border-gray-300 dark:border-gray-600 */}
      {/* User Info */}
      <div className="flex items-center mb-3">
        <img
          src={avatarUrl === "" ? defaultAvatar : avatarUrl}
          alt={`${username}'s avatar`}
          className="w-12 h-12 rounded-full object-cover mr-4"
        />
        <div>
          <h3 className="text-lg font-semibold">{username}</h3>
          <p className="text-sm text-gray-500">
            {format(new Date(createdAt), "PPP")} {/* Formats the date */}
          </p>
        </div>
      </div>
      {/* Rating */}
      <div className="flex items-center mb-3">{renderStars(rating)}</div>
      {/* Comment */}
      <p className="text-base text-gray-800 dark:text-gray-200">{comment}</p>
    </div>
  );
};

export default Review;
