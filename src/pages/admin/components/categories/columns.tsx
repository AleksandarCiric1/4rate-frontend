import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface ColumnProps {
  onAction: (id: number, action: string) => void;
  onEdit: (category: Category) => void;
}

export type Category = {
  id: number;
  name: string;
  status: boolean;
};

export const columns = (props: ColumnProps): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === true) return <Badge variant="success">active</Badge>;
      else if (statusValue === false)
        return <Badge variant="destructive">blocked</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const id = user.id;

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
              {row.getValue("status") === false && (
                <DropdownMenuItem
                  onClick={() => props.onAction(id, "activate")}
                >
                  Activate
                </DropdownMenuItem>
              )}
              {row.getValue("status") === true && (
                <DropdownMenuItem onClick={() => props.onAction(id, "block")}>
                  Block
                </DropdownMenuItem>
              )}
              <DropdownMenuItem onClick={() => props.onEdit(row.original)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
