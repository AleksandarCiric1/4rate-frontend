import { useNavigate } from "react-router-dom";
import { DropdownMenuItem } from "../ui/dropdown-menu";

type DropdownMenuItemLinkProps = {
  location: string;
  name: string;
};

const DropdownMenuItemLink = ({
  location,
  name,
}: DropdownMenuItemLinkProps) => {
  const navigate = useNavigate();
  const handleOnMenuItemClick = () => {
    navigate(location);
  };
  return (
    <DropdownMenuItem onClick={handleOnMenuItemClick}>{name}</DropdownMenuItem>
  );
};

export default DropdownMenuItemLink;
