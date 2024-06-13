// Third party
import { createHashRouter, RouterProvider } from "react-router-dom";
// Global routes
import { App } from "@/App";
import { AppRoute } from "./app/AppRoute";
import { ErrorRoute } from "./error/ErrorRoute";

// // Feature routes
// import { BookmarkRoute } from "@/features/bookmark/routes/BookmarkRoute";
// import { HomeRoute } from "@/features/home/routes/HomeRoute";
// import { Item } from "@/features/shared/components/item/Item";
// import { MovieRoute } from "@/features/movie/routes/MovieRoute";
// import { TvRoute } from "@/features/tv/routes/TvRoute";

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
            async lazy() {
              let { HomeRoute } = await import(
                "@/features/home/routes/HomeRoute"
              );
              return { Component: HomeRoute };
            },
          },
          {
            path: "movies",
            async lazy() {
              let { MovieRoute } = await import(
                "@/features/movie/routes/MovieRoute"
              );
              return { Component: MovieRoute };
            },
          },
          {
            path: "tv",
            async lazy() {
              let { TvRoute } = await import("@/features/tv/routes/TvRoute");
              return { Component: TvRoute };
            },
          },
          {
            path: "bookmark",
            async lazy() {
              let { BookmarkRoute } = await import(
                "@/features/bookmark/routes/BookmarkRoute"
              );
              return { Component: BookmarkRoute };
            },
          },
          {
            path: ":item",
            async lazy() {
              let { Item } = await import(
                "@/features/shared/components/item/Item"
              );
              return { Component: Item };
            },
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
