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
  onAction: (id: number, path: string, action: string) => void;
}

export type User = {
  id: number;
  username: string;
  role: string;
  status: string;
  confirmed: boolean;
  email: string;
  created_at: string;
  avatar_url: string;
  date_of_birth: string;
  first_name: string;
  last_name: string;
};

export const columns = (props: ColumnProps): ColumnDef<User>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "username",
    header: "Username",
  },
  {
    accessorKey: "first_name",
    header: "First name",
  },
  {
    accessorKey: "last_name",
    header: "Last name",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === "active")
        return <Badge variant="success">active</Badge>;
      else if (statusValue === "suspended")
        return <Badge variant="warning">suspended</Badge>;
      else if (statusValue === "blocked")
        return <Badge variant="destructive">blcoked</Badge>;
    },
  },
  {
    accessorKey: "confirmed",
    header: "Confirmed",
    cell: ({ row }) => {
      const confirmedValue = row.getValue("confirmed");

      if (confirmedValue === true) return <Badge variant="success">true</Badge>;
      else return <Badge variant="destructive">false</Badge>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "created_at",
    header: "Created at",
    cell: ({ row }) => {
      const createdAt = new Date(row.getValue("created_at"));
      const formattedDate = createdAt.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });

      return <div>{formattedDate}</div>;
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
              {row.getValue("confirmed") !== true && (
                <DropdownMenuItem
                  onClick={() =>
                    props.onAction(
                      id,
                      "/userAccounts/confirmAccount",
                      "confirm"
                    )
                  }
                >
                  Confirm
                </DropdownMenuItem>
              )}
              {row.getValue("status") !== "active" && (
                <DropdownMenuItem
                  onClick={() =>
                    props.onAction(id, "/admin/unsuspend", "activate")
                  }
                >
                  Activate
                </DropdownMenuItem>
              )}
              {row.getValue("status") !== "suspended" && (
                <DropdownMenuItem
                  onClick={() =>
                    props.onAction(id, "/admin/suspend", "suspend")
                  }
                >
                  Suspend
                </DropdownMenuItem>
              )}
              {row.getValue("status") !== "blocked" && (
                <DropdownMenuItem
                  onClick={() => props.onAction(id, "/admin/block", "block")}
                >
                  Block
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
