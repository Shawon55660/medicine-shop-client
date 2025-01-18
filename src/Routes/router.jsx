import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../LayOut/MainLayout';
import SignUp from '../Authentication/SignUp';
import Login from '../Authentication/Login';
import DashboardLayout from '../Dashboard/DashboardLayout';
import ManageUsers from '../Dashboard/AdminDashboard/AdminPages/ManageUsers';
import ManageCategory from '../Dashboard/AdminDashboard/AdminPages/ManageCategory';
import ManageMedicines from '../Dashboard/SellerDashboard/sellerPages/ManageMedicines';
import AskAdvertisement from '../Dashboard/SellerDashboard/sellerPages/AskAdvertisement';
import BannarAdvertise from '../Dashboard/AdminDashboard/AdminPages/BannarAdvertise';
import Home from '../Home/Home';
import PrivateRouter from './PrivateRouter';
import CategoryPage from '../Home/Category/CategoryPage';
import Shop from '../Shop/Shop';
import CartPage from '../Cart/CartPage';
import CheckOut from '../Payment/CheckOut';
import InvoicePage from '../Invoice/InvoicePage';

const router  = createBrowserRouter([
    //normal router
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/shop',
                element: <Shop></Shop>
            },
            {
                path:'/cart',
                element: <CartPage></CartPage>
            },
            {
                path:'/signUp',
                element: <SignUp></SignUp>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/category/:category',
                element:<CategoryPage></CategoryPage>
            },
            {
                path:'/checkOut',
                element:<CheckOut></CheckOut>
            },
            {
                path:'/invoice',
                element:<InvoicePage></InvoicePage>
            }

        ]
    },
    //dashboard router
    {
        path:'dashboard',
        element: <PrivateRouter><DashboardLayout></DashboardLayout></PrivateRouter>,
        children:[
            //admin router
            {  
          
                index:true,
                   
                    element:  <h1>i am from admin home</h1>
                },
            {  
          
            path:'users',
               
                element:  <ManageUsers></ManageUsers>
            },
            {
                path:'manageCategory',
                element: <ManageCategory></ManageCategory>
            },
            {
                path:'paymentManagement',
                element:  <h1>i am from paymentManagement</h1>
            },
            {
                path:'salesReport',
                element:  <h1>i am from salesReport</h1>
            },
            {
                path:'bannarAdvertise',
                element:  <BannarAdvertise></BannarAdvertise>
            },
            //seller router
            {
               index:true,
                element: <h1>home</h1>
            },
            {
                path:'manageMedicines',
                element: <ManageMedicines></ManageMedicines>
            },
            {
                path:'paymentHistory',
                element: <h1>paymentHistory</h1>
            },
            {
                path:'askForAdvertise',
                element: <PrivateRouter> <AskAdvertisement></AskAdvertisement></PrivateRouter>
            },
            //user router
            {
                path:'/dashboard/UserPaymentHistory',
                element: <h1>UserPaymentHistory</h1>
            },

        ]
    }


])
export default router