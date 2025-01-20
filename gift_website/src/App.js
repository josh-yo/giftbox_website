import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect, useState } from 'react';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

import Dashboard from './pages/admin/Dashboard';
import AdminProducts from './pages/admin/AdminProducts';

import FrontLayout from './pages/front/FrontLayout';
import Home from './pages/front/Home';
import Products from './pages/front/Products';
import ProductDetail from './pages/front/ProductDetail';
import Cart from './pages/front/Cart';
import AboutUs from '../src/components/AboutUs';
import Contact from '../src/components/Contact'

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [allProducts, setAllProducts] = useState([]);

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    (async () => {
      const result = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      setAllProducts(result.data.products);
    })()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FrontLayout/>}>
          <Route path='' element={<Home allproducts={allProducts}/>}></Route>
          <Route path='aboutus' element={<AboutUs/>}></Route>
          <Route path='products' element={<Products allproducts={allProducts}/>}></Route>
          <Route path='contact' element={<Contact/>}></Route>
          <Route path='product/:id' element={<ProductDetail allproducts={allProducts}/>}></Route>
          <Route path='cart' element={<Cart />}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<Dashboard/>}>
          <Route path="products" element={<AdminProducts/>}></Route> 
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={2000} />
    </div>
  );
}

export default App;
