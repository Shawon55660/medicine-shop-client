import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../LayOut/MainLayout';
import SignUp from '../Authentication/SignUp';
import Login from '../Authentication/Login';
import DashboardLayout from '../Dashboard/DashboardLayout';
import ManageUsers from '../Dashboard/AdminDashboard/AdminPages/ManageUsers';
import ManageCategory from '../Dashboard/AdminDashboard/AdminPages/ManageCategory';

const router  = createBrowserRouter([
    //normal router
    {
        path:'/',
        element: <MainLayout></MainLayout>,
        children:[
            {
                path:'/',
                element: <h2>home</h2>
            },
            {
                path:'/shop',
                element: <h2>shop</h2>
            },
            {
                path:'/cart',
                element: <h2>cart</h2>
            },
            {
                path:'/signUp',
                element: <SignUp></SignUp>
            },
            {
                path:'/login',
                element:<Login></Login>
            }

        ]
    },
    //dashboard router
    {
        path:'dashboard',
        element: <DashboardLayout></DashboardLayout>,
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
                element:  <h1>i am from bannarAdvertise</h1>
            },
            //seller router
            {
               index:true,
                element: <h1>home</h1>
            },
            {
                path:'manageMedicines',
                element: <h1>manageMedicines</h1>
            },
            {
                path:'paymentHistory',
                element: <h1>paymentHistory</h1>
            },
            {
                path:'askForAdvertise',
                element: <h1>askForAdvertise</h1>
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