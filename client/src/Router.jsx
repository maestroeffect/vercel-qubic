import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
// import Business from "./pages/home/business";
import LayoutTheme1 from "./component/Layout/LayoutTheme1";
import Feature from "./pages/home/Feature";
import Trending from "./pages/home/trending";
import About from "./pages/home/about";
import Archive from "./pages/home/archive";
import Contact from "./pages/home/contact";
import Error from "./pages/home/404";
import Post1 from "./pages/home/post1";

import Blog from "./component/Blog";
// import Cybershield from "./pages/home/cybershield";
import Cybershield from "./pages/home/cybershield";
import SearchResults from "./component/SearchPage";
import PrivacyPolicy from "./pages/home/privacy";

const router = createBrowserRouter([
  {
    path: "/",
    Component: LayoutTheme1,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/cybershield",
        element: <Cybershield />,
      },
      {
        path: "/features",
        element: <Feature />,
      },
      {
        path: "/trending",
        element: <Trending />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/archive",
        element: <Archive />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/404",
        element: <Error />,
      },
      {
        path: "/:slug",
        element: <Post1 />,
      },
      {
        path: "/search",
        element: <SearchResults />,
      },
      {
        path: "/privacypolicy",
        element: <PrivacyPolicy />,
      },
    ],
  },

  {
    path: "*",
    element: <Error />,
  },
]);

function Router() {
  return <RouterProvider router={router} />;
}

export default Router;
