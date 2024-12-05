import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import logo from './logo.svg';
import './App.css';

import { useEffect } from 'react';
import axios from 'axios';

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

    </div>
  );
}

export default App;
