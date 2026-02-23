import { createBrowserRouter } from "react-router-dom";

import RootLayout from "@/components/layout/RootLayout";

import BrandingPage from "@/pages/branding";
import HomePage from "@/pages/home";
import IllustratorPage from "@/pages/illustrator";
import WebDesignPage from "@/pages/web-design";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/branding",
        element: <BrandingPage />,
      },
      {
        path: "/web-design",
        element: <WebDesignPage />,
      },
      {
        path: "/web-design/:webDesignId",
        element: <WebDesignPage />,
      },
      {
        path: "/illustrator",
        element: <IllustratorPage />,
      },
    ],
  },
]);

export default router;
