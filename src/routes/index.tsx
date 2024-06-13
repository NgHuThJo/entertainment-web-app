// Third party
import { createHashRouter, RouterProvider } from "react-router-dom";
// Global routes
import { App } from "@/App";
import { AppRoute } from "./app/AppRoute";
import { ErrorRoute } from "./error/ErrorRoute";

// Feature routes
import { BookmarkRoute } from "@/features/bookmark/routes/BookmarkRoute";
import { HomeRoute } from "@/features/home/routes/HomeRoute";
import { Item } from "@/features/shared/components/item/Item";
import { MovieRoute } from "@/features/movie/routes/MovieRoute";
import { TvRoute } from "@/features/tv/routes/TvRoute";

export const routesConfig = [
  {
    element: <App />,
    errorElement: <ErrorRoute />,
    children: [
      {
        path: "/",
        element: <AppRoute />,
        children: [
          {
            index: true,
            element: <HomeRoute />,
          },
          {
            path: "movies",
            element: <MovieRoute />,
          },
          {
            path: "tv",
            element: <TvRoute />,
          },
          {
            path: "bookmark",
            element: <BookmarkRoute />,
          },
          {
            path: ":item",
            element: <Item />,
          },
        ],
      },
    ],
  },
];

export function Router() {
  // Paths are case-insensitive, isSensitive prop of Route component has default value of false
  const router = createHashRouter(routesConfig);

  return <RouterProvider router={router} />;
}
