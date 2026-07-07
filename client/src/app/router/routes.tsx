import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import CreateQuizPage from "@/features/quiz/pages/CreateQuizPage";

export const routes = [
  {
    path: "/",
    element: <DashboardPage />,
  },
  {
    path: "/create",
    element: <CreateQuizPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
];