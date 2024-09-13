import { RestaurantRequest } from "@/types/restaurant";
import axios from "axios";
import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { useToast } from "@/hooks/use-toast";

export default function RestaurantRequestsTable() {
  const { toast } = useToast();
  const [data, setData] = useState<RestaurantRequest[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<RestaurantRequest[]>(
          "http://localhost:8080/v1/requestForRestaurants/getAllRequest"
        );
        setData(response.data);
      } catch (err: any) {
        if (err.response) setError(err.response.data);
        else setError("Faild to load data...");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleActions = (action: string, requestId: number) => {
    const endpoint = action === "approve" ? "approveRequest" : "denyRequest";
    const toastMessage =
      action === "approve"
        ? {
            title: "Request successfully approved!",
            description: "Restaurant can be used now.",
          }
        : {
            title: "Request successfully denied!",
            description: "Restaurant can't be used now.",
          };

    axios
      .put(
        `http://localhost:8080/v1/requestForRestaurants/${endpoint}/${requestId}`
      )
      .then(() => {
        toast({
          variant: "default",
          title: toastMessage.title,
          description: toastMessage.description,
        });

        setData((prevData) => {
          return (
            prevData?.filter((request) => request.id !== requestId) || null
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
    // if (action === "approve") {
    //   axios
    //     .post(
    //       `http://localhost:8080/v1/requestForRestaurants/approveRequest/${requestId}`
    //     )
    //     .then(() => {
    //       toast({
    //         variant: "default",
    //         title: "Request successfully approved!",
    //         description: "Restaurant can be used now.",
    //       });
    //       setData((prevData) => {
    //         return (
    //           prevData?.filter((request) => request.id !== requestId) || null
    //         );
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // } else {
    //   axios
    //     .post(
    //       `http://localhost:8080/v1/requestForRestaurants/denyRequest/${requestId}`
    //     )
    //     .then(() => {
    //       toast({
    //         variant: "default",
    //         title: "Request successfully denied!",
    //         description: "Restaurant can't be used now.",
    //       });
    //       setData((prevData) => {
    //         return (
    //           prevData?.filter((request) => request.id !== requestId) || null
    //         );
    //       });
    //     })
    //     .catch((error) => {
    //       console.log(error);
    //     });
    // }
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Restaurants</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable columns={columns({ onAction: handleActions })} data={data}>
          <></>
        </DataTable>
      </div>
    </div>
  );
}
