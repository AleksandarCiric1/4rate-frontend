import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import axios from "axios";
import { columns, Restaurant } from "./columns";
import { RestaurantBlockFormData } from "@/types/restaurant";
import { RestaurantBlockDialog } from "./restaurant-dialogs";

export default function RestaurantsTable() {
  const [isBlockDialogOpen, setBlockDialogOpen] = useState<boolean>(false);
  const [restaurantToBlock, setRestaurantToBlock] = useState<Restaurant | null>(
    null
  );
  const [data, setData] = useState<Restaurant[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<Restaurant[]>(
          "http://localhost:8080/v1/restaurants/getAll"
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

  const handleColumnsBlock = (restaurant: Restaurant) => {
    setRestaurantToBlock(restaurant);
    setBlockDialogOpen(true);
  };

  const handleRestaurantBlock = (formData: RestaurantBlockFormData) => {
    let obj = { description: formData.description, id: formData.restaurantId };
    axios
      .put("http://localhost:8080/v1/restaurants/block", obj)
      .then(() => {
        setData(
          (prevData) =>
            prevData?.map((restaurant) => {
              if (restaurant.id === formData.restaurantId) {
                restaurant.status = "blocked";
              }
              return restaurant;
            }) || null
        );
        setBlockDialogOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error || !data) return <p>{error}</p>;

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-bold text-2xl">Restaurants</h1>
      </div>
      <div className="container mx-auto py-6">
        <DataTable
          columns={columns({ onBlock: handleColumnsBlock })}
          data={data}
        >
          {restaurantToBlock && (
            <RestaurantBlockDialog
              onEdit={handleRestaurantBlock}
              restaurant={restaurantToBlock}
              isOpen={isBlockDialogOpen}
              onOpenChange={setBlockDialogOpen}
            ></RestaurantBlockDialog>
          )}
        </DataTable>
      </div>
    </div>
  );
}
