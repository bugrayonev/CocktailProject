import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools"
import {
  Landing,
  About,
  Error,
  Newsletter,
  HomeLayout,
  Cocktail,
  SinglePageError,
} from "./pages";

import { loader as landingLoader } from "./pages/Landing";
import { loader as singleCocktailLoader } from "./pages/Cocktail";
import { action as newsLetterAction } from "./pages/Newsletter";


const queryClient = new QueryClient({
  defaultOptions:{
    queries:{
      staleTime:1000 * 60 * 5, // Sistem bu kadar (5dk) hafızada tutuyor aynı aramalarda tekrar request yapmak zorunda kalmıyor
    }
  }
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />,
    errorElement: <Error />, // bu global error, sadece burası olursa navBarı dahi göremeyiz
    children: [
      {
        index: true, // HomeLayout da Landing default olarak sergilencek
        element: <Landing />,
        errorElement: <SinglePageError />, // local error. sayfamız sergilenirken error messageında veririz
        loader: landingLoader(queryClient)
      },
      {
        path: "cocktail/:id",
        errorElement: <SinglePageError />,
        loader: singleCocktailLoader(queryClient),
        element: <Cocktail />,
      },
      {
        path: "newsletter",
        element: <Newsletter />,
        action: newsLetterAction,
        errorElement: <SinglePageError />,
      },
      {
        path: "about",
        element: <About />,
      },
    ],
  },
]);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false}/>
    </QueryClientProvider>
  );
};
export default App;
