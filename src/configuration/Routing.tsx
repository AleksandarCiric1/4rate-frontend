import Admin from "@/pages/admin/admin";
import CategoriesTable from "@/pages/admin/components/categories/page";
import RestaurantsTable from "@/pages/admin/components/restaurants/page";
import UsersTable from "@/pages/admin/components/users/page";
import { LoginForm } from "@/pages/auth/login/login";
import { RegisterForm } from "@/pages/auth/register/register";
import { NotFoundPage } from "@/pages/errors/not-found";
import { DefaultLayout } from "@/pages/layouts/default-layout";
import { PracticeForm } from "@/practice/practice-form";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <NotFoundPage />,
    element: <DefaultLayout />,
    children: [
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "",
            element: "",
          },
          { path: "users", element: <UsersTable /> },
          { path: "categories", element: <CategoriesTable /> },
          { path: "restaurants", element: <RestaurantsTable /> },
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
]);

export default router;
