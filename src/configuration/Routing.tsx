import Admin from "@/pages/admin/admin";
import DemoPage from "@/pages/admin/components/payments/page";
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
          { path: "users", element: <DemoPage /> },
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
