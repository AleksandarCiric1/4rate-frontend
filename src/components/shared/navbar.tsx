import { Link } from "react-router-dom";
import logo from "../../assets/4rate-logo.png";
import defaultAvatar from "../../assets/default_avatar.png";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DropdownMenuItemLink from "./dropdown-menu-item-link";
import { ThemeToggler } from "./theme-toggler";

const Navbar = () => {
  return (
    <div className="bg-primary dark:bg-slate-700 text-white py-2 px-5 flex justify-between">
      <Link to="/">
        <Avatar>
          <AvatarImage src={logo} />
          <AvatarFallback>4Rate</AvatarFallback>
        </Avatar>
      </Link>

      <div className="flex items-center">
        <ThemeToggler />
        <DropdownMenu>
          <DropdownMenuTrigger className="focus:outline-none">
            <Avatar>
              <AvatarImage src={defaultAvatar} />
              <AvatarFallback>4Rate</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItemLink location="/profile" name="Profile" />
            <DropdownMenuItemLink location="/login" name="Logout" />
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
