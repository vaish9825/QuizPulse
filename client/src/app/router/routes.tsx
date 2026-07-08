import DashboardPage from "@/pages/DashboardPage";
import LoginPage from "@/features/auth/pages/LoginPage";
import CreateQuizPage from "@/features/quiz/pages/CreateQuizPage";
import HostRoomPage from "@/features/room/pages/HostRoomPage";
import JoinRoomPage from "@/features/room/pages/JoinRoomPage";
import PlayQuizPage from "@/features/player/pages/PlayQuizPage";
import QuestionPage from "@/features/player/pages/QuestionPage";

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
  {
  path: "/host/:roomCode",
  element: <HostRoomPage />,
  },
  {
  path: "/join",
  element: <JoinRoomPage />,
  },
  {
    path: "/play/:roomCode",
    element: <PlayQuizPage />,
  },
  {
  path: "/play/:roomCode/question",
  element: <QuestionPage />,
  },
];