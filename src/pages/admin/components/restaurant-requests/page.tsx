import { RestaurantRequest } from "@/types/restaurant";
import axios from "axios";
import { act, useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";

export default function RestaurantRequestsTable() {
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
    if (action === "approve") {
      // TODO
    } else {
      // TODO
    }
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
