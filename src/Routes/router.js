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
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";
import SellerRoute from "./SellerRoute";
import ErrorPage from "../Pages/ErrorPage";
import Payment from "../Pages/Payment";

export const router = createBrowserRouter([
    {
        path:'/',
        element: <Main></Main>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/home',
                element:<Home></Home>
            },
            {
                path:'/categories/:id',
                element:<PrivateRoute><PhoneCategories></PhoneCategories></PrivateRoute>
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
        element:<PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        errorElement:<ErrorPage></ErrorPage>,
        children: [
            {
                path:'/dashboard',
                element:<PrivateRoute><Welcome></Welcome></PrivateRoute>
            },
            {
                path:'/dashboard/add-product',
                element: <SellerRoute><AddProduct></AddProduct></SellerRoute>
            },
            {
                path:'/dashboard/my-products',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path:'/dashboard/all-sellers',
                element:<AdminRoute><AllSellers></AllSellers></AdminRoute>
            },
            {
                path:'/dashboard/all-buyers',
                element:<AdminRoute><AllBuyers></AllBuyers></AdminRoute>
            },
            {
                path:'/dashboard/reported-products',
                element:<AdminRoute><ReportedProducts></ReportedProducts></AdminRoute>
            },
            {
                path:'/dashboard/my-orders',
                element:<PrivateRoute><MyOrders></MyOrders></PrivateRoute>
            },
            {
                path:'/dashboard/payment/:id',
                element:<PrivateRoute><Payment></Payment></PrivateRoute>,
                loader:({params})=>fetch(`http://localhost:5000/orders/${params.id}`)
            }
        ]
    }
])