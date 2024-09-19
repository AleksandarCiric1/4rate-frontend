import { Folder, MessageCircle, Newspaper } from "lucide-react";
import DashboardCard from "./dashboard-card";
import { RestaurantChartComponent } from "./restaurant-chart";
import { UserChartComponent } from "./user-chart";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [numOfCategories, setNumOfCategories] = useState(0);
  const [numOfRestaurants, setNumOfRestaurants] = useState(0);
  const [numOfReviews, setNumOfReviews] = useState(0);
  useEffect(() => {
    axios
      .get("")
      .then((response) => {})
      .catch((error) => {});
  }, []);
  return (
    <>
      <div className="flex gap-3">
        <DashboardCard
          title="Categories"
          count={12}
          icon={<Folder className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Users"
          count={750}
          icon={<Newspaper className="text-slate-500" size={72} />}
        />
        <DashboardCard
          title="Reviews"
          count={100}
          icon={<MessageCircle className="text-slate-500" size={72} />}
        />
      </div>
      <div className=" flex gap-2 w-full mt-6">
        <UserChartComponent />
        <RestaurantChartComponent />
      </div>
    </>
  );
};

export default Dashboard;
