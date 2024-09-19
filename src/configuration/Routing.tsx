import UserProfile from "@/components/shared/user-details";
import Admin from "@/pages/admin/admin";
import CategoriesTable from "@/pages/admin/components/categories/page";
import RestaurantRequestsTable from "@/pages/admin/components/restaurant-requests/page";
import RestaurantsTable from "@/pages/admin/components/restaurants/page";
import UsersTable from "@/pages/admin/components/users/page";
import { LoginForm } from "@/pages/auth/login/login";
import { RegisterForm } from "@/pages/auth/register/register";
import { NotFoundPage } from "@/pages/errors/not-found";
import { DefaultLayout } from "@/pages/layouts/default-layout";
import { PracticeForm } from "@/practice/practice-form";
import { FileUpload } from "@/practice/style-file-upload";
import { FileExport } from "@/practice/test-file";
import { createBrowserRouter, Navigate } from "react-router-dom";
import AdminRoute from "./admin-route";
import { MainPage, RestaurantsGrid } from "@/pages/main-page/main";
import { About } from "@/components/shared/about";
import ManagerDashboard from "@/pages/manager/manager";
import RestaurantPage from "@/pages/manager/components/restaurant-page";
import EditRestaurantPage from "@/pages/manager/components/edit-restaurant-form";
import RestaurantImageUpload from "@/pages/manager/components/image-upload";
import GuestDashboard from "@/pages/guest/guest";
import { RestaurantDetailsPage } from "@/pages/shared/restaurant-details";
import AddReview from "@/pages/guest/components/review-add";
import { UserChartComponent } from "@/pages/admin/components/dashboard/user-chart";
import Dashboard from "@/pages/admin/components/dashboard/dashboard";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <MainPage />,
        children: [
          {
            path: "",
            element: <RestaurantsGrid />,
          },
          {
            path: "about",
            element: <About />,
          },
          {
            path: ":id/restaurant",
            element: <RestaurantDetailsPage />,
          },
          {
            path: "manager",
            element: <ManagerDashboard />,
            children: [
              {
                path: "",
                element: <RestaurantPage />,
              },
              {
                path: ":id/edit",
                element: <EditRestaurantPage />,
              },
              {
                path: ":id/addImages",
                element: <RestaurantImageUpload />,
              },
            ],
          },
          {
            path: "guest",
            element: <GuestDashboard />,
            children: [
              {
                path: ":id/restaurant",
                element: <>AA</>,
              },
              {
                path: ":id/addReview",
                element: <AddReview />,
              },
            ],
          },
        ],
      },
      {
        path: "admin",
        element: (
          <AdminRoute>
            <Admin />
          </AdminRoute>
        ),
        children: [
          {
            path: "",
            element: <Dashboard />,
          },
          { path: "users", element: <UsersTable /> },
          { path: "categories", element: <CategoriesTable /> },
          { path: "restaurants", element: <RestaurantsTable /> },
          { path: "resturant-requests", element: <RestaurantRequestsTable /> },
          { path: "profile", element: <UserProfile /> },
        ],
      },
    ],
  },
  {
    path: "practice",
    element: <PracticeForm />,
  },
  {
    path: "login",
    element: <LoginForm />,
  },
  {
    path: "register",
    element: <RegisterForm />,
  },
  {
    path: "file-export",
    element: <FileExport />,
  },
  {
    path: "file-upload",
    element: <FileUpload />,
  },
  {
    path: "profile",
    element: <UserProfile />,
  },
]);

export default router;
