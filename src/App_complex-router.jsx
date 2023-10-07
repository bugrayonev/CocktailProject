import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {  Landing,  About,  Error,  Newsletter,  HomeLayout,  Cocktail,} from "./pages";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    children: [
      {
        index: true, // HomeLayout da Landing default olarak sergilencek
        element: <Landing />,
      },
      {
        path: "cocktail",
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
      },
      {
        path: "about",
        element: <About />,
        children:[
          {
            path:"company",
            element: <h2>our company</h2>

          },
          {
            path:"person",
            element: <h2>johhn doe</h2>

          },
        ]
      },
    ],
  },

  
]);

const App = () => {
  return <RouterProvider router={router} />;
};
export default App;
