import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

export const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    if (newTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />
      </div>

      <div className="flex items-center space-x-4">
        <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-slate-600">
          <Link to="/login">Get started</Link>
        </Button>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-gray-300 dark:border-gray-700"
        >
          {isDarkMode ? (
            <SunIcon className="h-6 w-6 text-yellow-400" />
          ) : (
            <MoonIcon className="h-6 w-6 text-gray-600" />
          )}
        </button>
      </div>
    </header>
  );
};
