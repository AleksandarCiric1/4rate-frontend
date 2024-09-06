import { LoginForm } from "@/pages/auth/login/login";
import { RegisterForm } from "@/pages/auth/register/register";
import { PracticeForm } from "@/practice/practice-form";
import { createBrowserRouter } from "react-router-dom";
const router = createBrowserRouter([
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
