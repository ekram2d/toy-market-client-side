import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css'
import App from './App';
import Home from './Components/Home/Home';
import Erropage from './Components/ErrorPage/Erropage';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import PRvider from './PROvider/PRvider';
import Details from './Components/Details/Details';
import AllToy from './AllToy/AllToy';
import AddToy from './AddToy/AddToy';



const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    errorElement:<Erropage></Erropage>,
  
  children:[{
    path:'/',
    element:<Home></Home>

  },
  {
    path:"/items/:id",
    element:<p>items</p>,
   

  },
  
  {
    path:'/login',
    element:<Login></Login>

  },
  {
    path:'/register',
    element:<Register></Register>

  },
  {
    path:'/blog',
    element:<p>blog</p>

  },
  {
    path:'/toy',
    element:<AllToy></AllToy>,
    loader:({params})=>fetch("http://localhost:5000/alltoy")

  },
  {
   path:'/details/:id',
   element:<Details></Details>,
   loader:({params})=>fetch(`http://localhost:5000/singleservices/${params.id}`)
  },
{


  path:'/singletoy/:id',
  element:<Details></Details>,
  loader:({params})=>fetch(`http://localhost:5000/singleuser/${params.id}`)
},
  {
    path:'/addToy',
    element:<AddToy></AddToy>
  },

]
  },
]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
   
   <PRvider><RouterProvider router={router} /></PRvider>
  </React.StrictMode>
);