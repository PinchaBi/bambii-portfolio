import HomePage from "@/pages/home";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "@/components/layout/RootLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
]);

export default router;
