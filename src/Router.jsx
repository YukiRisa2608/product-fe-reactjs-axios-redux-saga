import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import Categories from './containers/Categories';
import Products from './containers/Products';
import Home from './containers/Home';
import Cart from './containers/Cart';
import { HeaderProvider } from './components/HeaderContext';

const Router = () => {

    return (
        <div>
            <HeaderProvider>
                <Routes>
                    <Route path="/" element={<DefaultLayout />}>
                        <Route path="/home" element={<Home />} />
                        <Route path="admin/category" element={<Categories />} />
                        <Route path="admin/product" element={<Products />} />
                        <Route path="customer/cart" element={<Cart />} />
                    </Route>
                </Routes>
            </HeaderProvider>
        </div>
    )
}

export default Router;