import Navbar from "@/components/shared/navbar";
import Sidebar from "../admin/components/sidebar";
import DashboardCard from "../admin/components/dashboard/dashboard-card";
import { Folder, MessageCircle, Newspaper } from "lucide-react";
import AnalyticsChart from "../admin/components/dashboard/analytics-chart";
import BackButton from "../admin/components/back-button";
import { ThemeProvider } from "@/components/shared/theme-provider";

const AdminLayout = () => {
  return (
    <div>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Navbar />
        <div className="flex">
          <div className="hidden md:block h-screen w-[250px]">
            <Sidebar />
          </div>
          <div className="p-5 w-full md:max-w-[1140px]">
            <div className="flex flex-row">
              <BackButton text="Go back" link="/" />
            </div>
            <div className="flex flex-col md:flex-row justify-between gap-5 mb-5">
              <DashboardCard
                title="Posts"
                count={100}
                icon={<Newspaper className="text-slate-500" size={72} />}
              />
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
                title="Comments"
                count={100}
                icon={<MessageCircle className="text-slate-500" size={72} />}
              />
            </div>
            <AnalyticsChart />
          </div>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default AdminLayout;
