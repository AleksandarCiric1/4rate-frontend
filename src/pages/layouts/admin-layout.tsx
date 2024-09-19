import Navbar from "@/components/shared/navbar";
import Sidebar from "../admin/components/sidebar";
import BackButton from "../admin/components/back-button";
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Outlet } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import { UserChartComponent } from "../admin/components/dashboard/user-chart";

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
              <BackButton text="Go back" link="/admin" />
            </div>

            <Outlet />
          </div>
        </div>
        <Toaster />
      </ThemeProvider>
    </div>
  );
};

export default AdminLayout;
