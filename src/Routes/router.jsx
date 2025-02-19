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
import PaymentManagement from '../Dashboard/AdminDashboard/AdminPages/PaymentManagement';
import PaymentHistory from '../Dashboard/UserDashboard/UserPages/PaymentHistory';
import SellerPayment from '../Dashboard/SellerDashboard/sellerPages/SellerPayment';
import SalesReport from '../Dashboard/AdminDashboard/AdminPages/SalesReport';
import AdminRouter from './AdminRouter';
import SellerRouter from './SellerRouter';
import DashboardCommon from '../Dashboard/CommonComponent/DashboardCommon';
import UpdateProfile from '../Authentication/UpdateProfile';
import Error from '../CommonComponent/Error';
import AdminHome from '../Dashboard/AdminDashboard/AdminPages/AdminHome';
import SellerHome from '../Dashboard/SellerDashboard/sellerPages/SellerHome';
import Faq from '../CommonComponent/Faq';
import AboutUs from '../CommonComponent/AboutUs';




const  router  = createBrowserRouter([
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
                path:'/faq',
                element: <Faq></Faq> 
            },
            {
                path:'/aboutUs',
                element:<AboutUs></AboutUs>
            },
           
            {
                path:'/updateProfile',
                element:<PrivateRouter><UpdateProfile></UpdateProfile></PrivateRouter>
            },
            {
                path:'/category/:category',
                element:<CategoryPage></CategoryPage>
            },
            {
                path:'/checkOut',
                element:<PrivateRouter><CheckOut></CheckOut></PrivateRouter>
            },
            {
                path:'/invoice',
                element:<PrivateRouter><InvoicePage></InvoicePage></PrivateRouter>
            } 
        ],
        errorElement:<Error></Error>
    },
    ,{
        path:'/signUp',
        element: <SignUp></SignUp>
    },
    {
        path:'/login',
        element:<Login></Login>
    },

    //dashboard router
    
    {
        path:'dashboard',
        element:<PrivateRouter> <DashboardLayout></DashboardLayout></PrivateRouter>,
        children:[

            {
                index: true,
                element:<PrivateRouter><DashboardCommon></DashboardCommon> </PrivateRouter>
                   
            },
            // admin router
            {
                path:'AdminHome',
                element:<AdminRouter> <AdminHome></AdminHome> </AdminRouter>
            }
            ,
         
           
            {  
          
            path:'users',
               
                element: <AdminRouter><ManageUsers></ManageUsers></AdminRouter>
            },
            {
                path:'manageCategory',
                element: <AdminRouter><ManageCategory></ManageCategory></AdminRouter>
            },
            {
                path:'paymentManagement',
                element: <AdminRouter><PaymentManagement></PaymentManagement></AdminRouter>
            },
            {
                path:'salesReport',
                element:  <AdminRouter><SalesReport></SalesReport></AdminRouter>
            },
            {
                path:'bannarAdvertise',
                element: <AdminRouter> <BannarAdvertise></BannarAdvertise></AdminRouter>
            },
            // seller router
         
           
            {
                path:'manageMedicines',
                element: <SellerRouter><ManageMedicines></ManageMedicines></SellerRouter>
            },
            {
                path:'paymentHistory',
                element: <SellerRouter><SellerPayment></SellerPayment></SellerRouter>
            },
            {
                path:'sellerHome',
                element: <SellerRouter><SellerHome></SellerHome></SellerRouter>
            },
            {
                path:'askForAdvertise',
                element: <SellerRouter> <AskAdvertisement></AskAdvertisement></SellerRouter>
            },
            // user router
            {
                path:'payment',
                element: <PaymentHistory></PaymentHistory>
            }
          
           
        ],
        
        errorElement:<Error></Error>
    },
   
    


])
export default router