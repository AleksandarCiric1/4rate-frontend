import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Folders,
  LayoutDashboard,
  Newspaper,
  StickyNote,
  User,
  Utensils,
} from "lucide-react";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <Command className="bg-slate-200 rounded-none dark:bg-slate-700 border dark:border-y-white">
      {/* <CommandInput placeholder="Type a command or search..." /> */}
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading="General">
          <CommandItem>
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <Link to="">Dashboard</Link>
          </CommandItem>
          <CommandItem>
            <Newspaper className="mr-2 h-4 w-4" />
            <Link to="users">Users</Link>
          </CommandItem>
          <CommandItem>
            <Folders className="mr-2 h-4 w-4" />
            <Link to="categories">Categories</Link>
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Restaurant">
          <CommandItem>
            <Utensils className="mr-2 h-4 w-4" />
            <Link to="restaurants">Restaurants</Link>
          </CommandItem>
          <CommandItem>
            <StickyNote className="mr-2 h-4 w-4" />
            <Link to="resturant-requests">Resturant requests</Link>
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading="Settings">
          <CommandItem>
            <User className="mr-2 w-4 h-4" />
            <Link to="profile">Profile</Link>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default Sidebar;
