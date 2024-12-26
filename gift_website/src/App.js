import 'bootstrap/dist/css/bootstrap.min.css';

import { useEffect } from 'react';
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

function App() {

  useEffect(() => {
    console.log(process.env.REACT_APP_API_URL, process.env.REACT_APP_API_PATH);
    (async () => {
      const result = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products/all`);
      console.log(result);
    })()
  }, [])

  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<FrontLayout/>}>
          <Route path='' element={<Home/>}></Route>
          <Route path='products' element={<Products/>}></Route>
          <Route path='product/:id' element={<ProductDetail/>}></Route>
          <Route path='cart' element={<Cart />}></Route>
        </Route>
        <Route path="/login" element={<Login/>}></Route>
        <Route path="/admin" element={<Dashboard/>}>
          <Route path="products" element={<AdminProducts/>}></Route> 
        </Route>
      </Routes>
    </div>
  );
}

export default App;
