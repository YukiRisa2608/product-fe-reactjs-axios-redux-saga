import React from 'react';
import { Route, Routes, Navigate, Redirect } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import Categories from './containers/Categories';
import Products from './containers/Products';
import Home from './containers/Home';
import Cart from './containers/Cart';
import Login from './containers/Login';
import Signup from './containers/Signup';
import { isLoggedIn } from './api/AuthServices';
import OrderDetail from './containers/OrderDetail';


const Router = () => {

    console.log(isLoggedIn())

    const renderPrivateRoute = (path, element) => {
        return isLoggedIn() ? (
            <Route path={path} element={element} />
        ) : (
            <Route path={path} element={isLoggedIn() ? element : <Navigate to="/login" replace />} />
        );
    };


    return (
        <div>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    {renderPrivateRoute('/home', <Home />)}
                    {renderPrivateRoute('admin/category', <Categories />)}
                    {renderPrivateRoute('admin/product', <Products />)}
                    {renderPrivateRoute('customer/cart', <Cart />)}
                    {renderPrivateRoute('customer/order', <OrderDetail />)}
                </Route>
                <Route path="login" element={<Login />} />
                <Route path="signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default Router;