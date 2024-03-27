import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import DefaultLayout from './components/DefaultLayout';
import Categories from './containers/Categories';
import Products from './containers/Products';
import Home from './containers/Home';
import Cart from './containers/Cart';
import Login from './containers/Login';
import Signup from './containers/Signup';
import OrderDetail from './containers/OrderDetail';
import { isAuthenticated } from './utils/route-util';
import Users from './containers/Users';

const router = createBrowserRouter([
    {
        path: "/",
        children: [
            {
                path: "admin",
                element: <DefaultLayout />,
                loader: isAuthenticated,
                children: [
                    {
                        path: 'category',
                        element: <Categories />,
                    },
                    {
                        path: 'product',
                        element: <Products />,
                    },
                    {
                        path: 'users',
                        element: <Users />,
                    },
                ],
            },
            {
                path: "customer",
                element: <DefaultLayout />,
                loader: isAuthenticated,
                children: [
                    {
                        path: 'cart',
                        element: <Cart />,
                    },
                    {
                        path: 'order',
                        element: <OrderDetail />,
                    }
                ],
            },
        ],
    },
    {
        path: "/login",
        element: <Login />,
        loader: isAuthenticated,
    },
    {
        path: "/signup",
        element: <Signup />,
        loader: isAuthenticated,
    },
    {
        path: "/home",
        element: <Home />,
    }
]);

export default router;

// const Router = () => {

//     // console.log(isLoggedIn())

//     // const renderPrivateRoute = (path, element) => {
//     //     return isLoggedIn() ? (
//     //         <Route path={path} element={element} />
//     //     ) : (
//     //         <Route path={path} element={isLoggedIn() ? element : <Navigate to="/login" replace />} />
//     //     );
//     // };


//     return (
//         <div>
//             <RouterProvider router={router} />
//             <Routes>
//                 <Route path="/" element={<DefaultLayout />}>
//                     {/* {renderPrivateRoute('/home', <Home />)} */}
//                     {renderPrivateRoute('admin/category', <Categories />)}
//                     {renderPrivateRoute('admin/product', <Products />)}
//                     {renderPrivateRoute('customer/cart', <Cart />)}
//                     {renderPrivateRoute('customer/order', <OrderDetail />)}
//                 </Route>
//                 <Route path="login" element={<Login />} />
//                 <Route path="signup" element={<Signup />} />
//                 <Route path="/home" element={<Home />} />

//             </Routes>
//         </div>
//     );
// };

// export default Router;