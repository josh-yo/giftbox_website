import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { useEffect } from 'react';
import axios from 'axios';

import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';

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
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
