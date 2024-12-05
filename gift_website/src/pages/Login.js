import axios from "axios";
import { useState, useEffect } from "react";

function Login() {
  const [data, setData] = useState({
    username: '',
    password: ''
  });

  const [loginStatus, setLoginStatus] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({...data, [name]: value});
  }

  const submit = async (e) => {
    setLoginStatus({});
    try {
        const res = await axios.post('/v2/admin/signin', data);
        const { token, expired } = res.data;
        document.cookie =
          `managerToken=${token}; expires=${new Date(expired)};`;
        // save token
    } catch (error) {
        setLoginStatus(error.response.data);
    }
  }

  useEffect(() =>{
    // take token
    const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("managerToken="))
        ?.split("=")[1];

    axios.defaults.headers.common['Authorization'] = token;

    (async() =>{
        const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`);
    })();
  }, [])

  return (<div className="container py-5">
    <div className="row justify-content-center">
      <div className="col-md-6">
        <h2>Login</h2>

        <div className={`alert alert-danger ${loginStatus.message ? 'd-block' : 'd-none'}`} role="alert">
          Wrong Message
        </div>
        <div className="mb-2">
          <label htmlFor="email" className="form-label w-100">
            Email
            <input id="email" className="form-control" name="username" type="email" placeholder="Email Address" onChange={handleChange} />
          </label>
        </div>
        <div className="mb-2">
          <label htmlFor="password" className="form-label w-100">
            Password
            <input type="password" className="form-control"  name="password" id="password" placeholder="name@example.com" onChange={handleChange} />
          </label>
        </div>
        <button type="button" className="btn btn-primary" onClick={submit}>Login</button>
      </div>
    </div>
  </div>)
}

export default Login;