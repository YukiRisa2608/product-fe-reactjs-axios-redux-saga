import React from 'react'
import { Route, Routes } from 'react-router-dom'
import DefaultLayout from './components/DefaultLayout';
import Categories from './containers/Categories';
import Products from './containers/Products';
import Home from './containers/Home';
import Cart from './containers/Cart';

const Router = () => {

    return (
        <div>

            {/* <Routes>
                <Route path='/' element={<HomePage />} />
            </Routes> */}

            <Routes>
                <Route path='/admin' element={<DefaultLayout />} >
                    <Route path='/admin/category' element={<Categories />} />
                    <Route path='/admin/product' element={<Products />} />
                </Route>
                <Route path='/home' element={<Home />} />
                <Route path='/cart' element={<Cart />} />

            </Routes>
        </div>
    )
}

export default Router;