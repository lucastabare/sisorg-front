import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../components/templates/MainLayout";
import HomePage from "../components/pages/HomePage";
import RegistryPage from "../components/pages/RegistryPage";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/registry/:id", element: <RegistryPage /> },
    ],
  },
]);
