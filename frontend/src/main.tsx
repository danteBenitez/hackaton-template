import Home from "@/pages/home";
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import "dotenv/config";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import SignIn from "./pages/auth/sign-in";
import AuthProvider from "./features/auth/context/provider";
import MainLayout from "./layouts/main-layout";
import ConstructionPage from "./pages/construction";
import DashboardLayout from "./layouts/dashboard-layout";
import UserListPage from "./pages/admin-dashboard/users";
import NotFoundPage from "./pages/not_found";
import UserDetailPage from "./pages/admin-dashboard/user-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { path: "/", index: true, element: <Home /> },
      { path: "/about", index: true, element: <ConstructionPage /> },
      { path: "/contact", index: true, element: <ConstructionPage /> },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
  {
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      { path: "/dashboard/users", element: <UserListPage /> },
      { path: "/dashboard/users/:userId", element: <UserDetailPage /> },
      {
        path: "/dashboard/",
        index: true,
        element: <Navigate to="/dashboard/users" />,
      },
      {
        path: "/dashboard/moderation/incidents",
        element: <ConstructionPage />,
      },
      {
        path: "/dashboard/moderation/posts",
        element: <ConstructionPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
