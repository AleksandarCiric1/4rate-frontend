import { reservationEndpoints } from "@/environments/api-endpoints";
import { toast } from "@/hooks/use-toast";
import { ReservationStatus } from "@/types/reservation";
import { Reservation } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function ReservationsPage() {
  const { id: restaurantId } = useParams();
  const [data, setData] = useState<Reservation[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    const fetchData = async () => {
      try {
        const response = await axios.get<Reservation[]>(
          reservationEndpoints.getAllRestaurantReservations(restaurantId)
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActions = (
    reservationId: number,
    path: string,
    action: string
  ) => {
    let apiPath = reservationEndpoints.reservationActions(path, reservationId);
    axios
      .put(apiPath)
      .then((response) => {
        console.log(response);
        const message =
          action === "approve"
            ? "Successfuly approved reservation!"
            : "Successfully denied reservation!";
        toast({
          variant: "success",
          title: "Reservation",
          description: message,
        });
        setData(
          (prevData) =>
            prevData?.reduce<Reservation[]>((acc, reservation) => {
              if (reservation.id === reservationId) {
                if (action === "deny") {
                  return acc;
                } else if (action === "approve") {
                  acc.push({
                    ...reservation,
                    status: ReservationStatus.APPROVED,
                  });
                }
              } else {
                acc.push(reservation);
              }
              return acc;
            }, []) || null
        );
      })
      .catch((error) => {
        console.error(error);
        toast({
          variant: "destructive",
          title: "Reservation",
          description: error.response.data,
        });
      });
  };

  const handleDateSelect = (date: Date) => {
    const formattedDate = date.toLocaleDateString("en-CA").split("T")[0];

    const dateRequest = {
      date: formattedDate,
    };
    console.log(dateRequest);
    axios
      .post(
        `http://localhost:8080/v1/reservations/getAllRestaurantReservationsByDate/${restaurantId}`,
        dateRequest
      )
      .then((response) => {
        setData(response.data);
      })
      .catch(() => {});
  };

  if (loading) return <p>Loading...</p>;
  //   if (error || !data) return <p>{error}</p>;

  return (
    <div className="m-1 md:m-3 lg:m-10">
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Reservations</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({
            onAction: handleActions,
          })}
          data={data || []}
          onDateChange={handleDateSelect}
        >
          <></>
        </DataTable>
      </div>
    </div>
  );
}
