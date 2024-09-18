import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-800 py-6 border-t border-gray-200 dark:border-gray-700 ">
      <div className="container mx-auto text-center px-4 h-40">
        <div className="flex flex-col justify-center items-center h-full">
          <div className="flex  justify-center space-x-6 mb-4">
            <Link
              to="/"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              Home
            </Link>
            <Link
              to="about"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              About
            </Link>
            <a
              href="#"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition"
            >
              Contact
            </a>
          </div>

          <div className="text-sm text-gray-500 dark:text-gray-400">
            <p>Copyright © 2004–2024 4Rate Inc. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};
