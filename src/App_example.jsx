import { createBrowserRouter,RouterProvider } from "react-router-dom"; 
import {  Landing,  About,  Error,  Newsletter,  HomeLayout,  Cocktail,} from "./pages";


const router = createBrowserRouter([
{
  path: "/",
  element: <HomeLayout/>,
  children:[
    {
      index:true,
      element: <Landing/>
    },
    {
      path: "newsletter",
      element: <Newsletter/>
    },
    {
      path: "about",
      element: <About/>
    },
  ]
},
{
  path:"/error",
  element: <Error/>
}



])

const App = () => {





  return (
    <RouterProvider router ={router}/>
      
    
  )
}

export default App
