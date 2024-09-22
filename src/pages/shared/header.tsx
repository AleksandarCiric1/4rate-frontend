// import { useEffect, useState } from "react";
// import { Button } from "../../components/ui/button";
// import { MoonIcon, SunIcon } from "lucide-react";
// import defaultAvatar from "../../assets/default_avatar.png";
// import logo from "../../assets/logo.png";
// import { Link, useNavigate } from "react-router-dom";
// import { useUser } from "@/providers/user";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
// import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
// import { logout } from "@/services/user-service";

// export const Header = () => {
//   const navigate = useNavigate();
//   const { isLogged, user, setUser, setIsLogged } = useUser();
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   useEffect(() => {
//     const savedTheme = localStorage.getItem("theme");
//     if (savedTheme === "dark") {
//       setIsDarkMode(true);
//       document.documentElement.classList.add("dark");
//     } else {
//       setIsDarkMode(false);
//       document.documentElement.classList.remove("dark");
//     }
//   }, []);

//   const toggleTheme = () => {
//     const newTheme = !isDarkMode;
//     setIsDarkMode(newTheme);
//     if (newTheme) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("theme", "dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("theme", "light");
//     }
//   };

//   const handleLogout = () => {
//     setUser(null);
//     setIsLogged(false);
//     logout();
//   };

//   const handleReservationsClick = () => {
//     navigate(`${user?.manager.restaurantId}/reservations`);
//   };

//   return (
//     <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
//       <div className="flex items-center">
//         <Link to="">
//           <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />
//         </Link>
//         {user?.role === "manager" && (
//           <h4 className="text-xl font-medium font-sans">for manager</h4>
//         )}
//         {user?.role === "guest" && (
//           <h4 className="text-xl font-medium font-sans">for guest</h4>
//         )}
//       </div>

//       <div>
//         <div className="flex items-center space-x-4">
//           {!isLogged && (
//             <Button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md dark:hover:bg-slate-500">
//               <Link to="/login">Get started</Link>
//             </Button>
//           )}
//           {user?.role === "manager" && (
//             // <Button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-slate-600">
//             <div className="space-x-2">
//               <Button
//                 className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md "
//                 onClick={handleReservationsClick}
//               >
//                 Reservations
//               </Button>
//               <Link
//                 className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md "
//                 to="manager"
//               >
//                 Restaurant
//               </Link>
//             </div>
//             // </Button>
//           )}
//           <button
//             onClick={toggleTheme}
//             className="p-2 rounded-full border border-gray-300 dark:border-gray-700"
//           >
//             {isDarkMode ? (
//               <SunIcon className="h-6 w-6 text-yellow-400" />
//             ) : (
//               <MoonIcon className="h-6 w-6 text-gray-600" />
//             )}
//           </button>

//           {isLogged && (
//             <DropdownMenu>
//               <DropdownMenuTrigger className="focus:outline-none">
//                 <Avatar>
//                   <AvatarImage
//                     src={
//                       `http://localhost:8080/v1/images/getAvatar/${user?.id}` ??
//                       defaultAvatar
//                     }
//                   />
//                   <AvatarFallback>4Rate</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent>
//                 <DropdownMenuLabel>My Account</DropdownMenuLabel>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItemLink location="profile" name="Profile" />
//                 <DropdownMenuItemLink
//                   onAction={handleLogout}
//                   location="/login"
//                   name="Logout"
//                 />
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//     </header>
//   );
// };

import { useEffect, useState } from "react";
import { Button } from "../../components/ui/button";
import { MoonIcon, SunIcon } from "lucide-react";
import defaultAvatar from "../../assets/default_avatar.png";
import logo from "../../assets/logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "@/providers/user";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DropdownMenuItemLink from "@/components/shared/dropdown-menu-item-link";
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar";
import { logout } from "@/services/user-service";
import { NotificationBell } from "@/practice/notification-practice";

export const Header = () => {
  const navigate = useNavigate();
  const { isLogged, user, setUser, setIsLogged } = useUser();
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

  const handleLogout = () => {
    setUser(null);
    setIsLogged(false);
    logout();
  };

  const handleReservationsClick = () => {
    navigate(`${user?.manager.restaurantId}/reservations`);
  };

  return (
    <header className="flex justify-between items-center p-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="flex items-center">
        <Link to="">
          <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />
        </Link>
        {user?.role === "manager" && (
          <h4 className="text-xl font-medium font-sans">for manager</h4>
        )}
        {user?.role === "guest" && (
          <h4 className="text-xl font-medium font-sans">for guest</h4>
        )}
      </div>

      <div>
        <div className="flex items-center space-x-4">
          {!isLogged && (
            <Button className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md dark:hover:bg-slate-500">
              <Link to="/login">Get started</Link>
            </Button>
          )}
          {user?.role === "manager" && (
            <div className="space-x-2">
              <Button
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md "
                onClick={handleReservationsClick}
              >
                Reservations
              </Button>
              <Link
                className="bg-slate-600 hover:bg-slate-700 text-white px-4 py-2 rounded-md "
                to="manager"
              >
                Restaurant
              </Link>
            </div>
          )}
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

          {/* Add NotificationBell Component here */}
          {isLogged && <NotificationBell />}

          {isLogged && user?.role === "guest" && (
            <div>
              <Link to="/guest/reservations">Reservations</Link>
            </div>
          )}

          {isLogged && (
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none">
                <Avatar>
                  <AvatarImage
                    src={
                      `http://localhost:8080/v1/images/getAvatar/${user?.id}` ??
                      defaultAvatar
                    }
                  />
                  <AvatarFallback>4Rate</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItemLink location="profile" name="Profile" />
                <DropdownMenuItemLink
                  onAction={handleLogout}
                  location="/login"
                  name="Logout"
                />
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>
    </header>
  );
};
