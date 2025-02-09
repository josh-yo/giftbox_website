import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
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
         // Save token
        document.cookie =
          `managerToken=${token}; expires=${new Date(expired)};`;
         // Navigate to the products page
        if (res.data.success) {
          navigate('/admin/products');
        }
    } catch (error) {
        setLoginStatus(error.response.data);
    }

  }

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