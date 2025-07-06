import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './components/Layout/Layout'
import Home from './components/Home/Home'
import Contact from './components/Contact/Contact'
import Login from './components/Login/Login'
import Cart from './components/Cart/Cart'
import NotFound from './components/NotFound/NotFound'
import 'bootstrap-icons/font/bootstrap-icons.css';
import Register from './components/Register/Register'
import ProductDetails from './components/ProductDetails/ProductDetails'
import { CartProvider } from './components/CartContext/CartContext';
import CheckOut from './components/CheckOut/CheckOut';
import OrderSuccess from './components/OrderSucces/OrderSucces';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'
import Shop from './components/Shop/Shop'



function App() {
  const [count, setCount] = useState(0)

  let routing = createBrowserRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },

      { path: 'contact', element: <ProtectedRoute><Contact /></ProtectedRoute> },
      { path: 'shop', element: <ProtectedRoute><Shop /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'product/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'ordersuccess', element: <ProtectedRoute><OrderSuccess /></ProtectedRoute> },

      { path: '*', element: <NotFound /> },
    ]
  }
]);


  return (
    <>
     <CartProvider>
     <RouterProvider router={routing}></RouterProvider>
     </CartProvider>
    </>
  )
}

export default App
