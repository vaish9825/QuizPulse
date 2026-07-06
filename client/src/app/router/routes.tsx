import HomePage from "@/pages/HomePage";
import LoginPage from "@/features/auth/pages/LoginPage";

export const routes = [
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];