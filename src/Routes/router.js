import { createBrowserRouter } from "react-router-dom";
import DashboardLayout from "../layouts/DashboardLayout";
import Main from "../layouts/Main";
import AddProduct from "../Pages/AddProduct";
import Blog from "../Pages/Blog";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import MyProducts from "../Pages/MyProducts";
import PhoneCategories from "../Pages/PhoneCategories";
import SignUp from "../Pages/SignUp";
import Welcome from "../Pages/Welcome";
import AllSellers from './../Pages/AllSellers';
import AllBuyers from './../Pages/AllBuyers';
import ReportedProducts from './../Pages/ReportedProducts';
import MyOrders from './../Pages/MyOrders';

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/categories/:id',
                element:<PhoneCategories></PhoneCategories>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/signup',
                element:<SignUp></SignUp>
            },
            {
                path:'/blog',
                element:<Blog></Blog>
            }
        ]
    },
    {
        path:'/dashboard',
        element:<DashboardLayout></DashboardLayout>,
        children: [
            {
                path:'/dashboard',
                element:<Welcome></Welcome>
            },
            {
                path:'/dashboard/add-product',
                element: <AddProduct></AddProduct>
            },
            {
                path:'/dashboard/my-products',
                element:<MyProducts></MyProducts>
            },
            {
                path:'/dashboard/all-sellers',
                element:<AllSellers></AllSellers>
            },
            {
                path:'/dashboard/all-buyers',
                element:<AllBuyers></AllBuyers>
            },
            {
                path:'/dashboard/reported-products',
                element:<ReportedProducts></ReportedProducts>
            },
            {
                path:'/dashboard/my-orders',
                element:<MyOrders></MyOrders>
            }
        ]
    }
])