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
import { Reservation } from "@/types/restaurant";
import { ReservationStatus } from "@/types/reservation";

interface ColumnProps {
  onAction: (reservationId: number, path: string, action: string) => void;
}

export const columns = (props: ColumnProps): ColumnDef<Reservation>[] => [
  {
    accessorKey: "id",
    header: "Id",
  },
  {
    accessorKey: "description",
    header: "description",
  },
  {
    accessorKey: "guest.userAccount.firstName",
    header: "First name",
  },
  {
    accessorKey: "guest.userAccount.lastName",
    header: "Last name",
  },
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "time",
    header: "Time",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const statusValue = row.getValue("status");
      if (statusValue === ReservationStatus.APPROVED)
        return <Badge variant="success">approved</Badge>;
      else if (statusValue === ReservationStatus.PENDING)
        return <Badge variant="default">pending</Badge>;
      else if (statusValue === ReservationStatus.CANCELED)
        return <Badge variant="warning">canceled</Badge>;
      else if (statusValue === ReservationStatus.DENIED)
        return <Badge variant="destructive">denied</Badge>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const reservation: Reservation = row.original;

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
              {reservation.status === "pending" && (
                <div>
                  <DropdownMenuItem
                    onClick={() =>
                      props.onAction(
                        reservation.id,
                        "approveReservation",
                        "approve"
                      )
                    }
                  >
                    Approve
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() =>
                      props.onAction(reservation.id, "denyReservation", "deny")
                    }
                  >
                    Deny
                  </DropdownMenuItem>
                </div>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
