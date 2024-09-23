import { useUser } from "@/providers/user";
import { useEffect } from "react";
import defaultAvatar from "../../assets/default_avatar.png";
import logo from "../../assets/logo.png";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import DropdownMenuItemLink from "./dropdown-menu-item-link";
import { ThemeToggler } from "./theme-toggler";
import { imageEndpoints } from "@/environments/api-endpoints";

const Navbar = () => {
  const { user } = useUser();
  useEffect(() => {
    console.log(user);
  }, []);
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
                    ? imageEndpoints.getAvatarByAvatarUrl(user.avatarUrl)
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
