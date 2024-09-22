import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import defaultAvatar from "../../assets/default_avatar.png";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DropdownMenuItemLink from "./dropdown-menu-item-link";
import { ThemeToggler } from "./theme-toggler";
import { useUser } from "@/providers/user";

const Navbar = () => {
  const { user } = useUser();
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <img src={logo} alt="Logo" className="h-10 object-cover mr-3" />

      <div className="flex items-center">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage
                src={
                  user
                    ? `http://localhost:8080/v1/images/getAvatar/${user.id}`
                    : defaultAvatar
                }
              />
              <AvatarFallback>4Rate</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItemLink location="profile" name="Profile" />
            <DropdownMenuItemLink location="/login" name="Logout" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
