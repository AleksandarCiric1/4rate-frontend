import { Button } from "@/components/ui/button";
import {
  DropdownMenuItem,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RestaurantRequest } from "@/types/restaurant";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

interface ColumnProps {
  onAction: (action: string, requestId: number) => void;
}

export const columns = (props: ColumnProps): ColumnDef<RestaurantRequest>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name of restaurant",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "workTime",
    header: "Work time",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const request = row.original;

      return (
        <div className="flex justify-cente">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => props.onAction("approve", request.id)}
              >
                Approve
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => props.onAction("decline", request.id)}
              >
                Decline
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
