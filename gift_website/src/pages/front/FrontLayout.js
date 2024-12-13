import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar';

function FrontLayout(){
    return(<>
    <Navbar/>

    <Outlet></Outlet>
    
    {/* footer */}
    <div className="bg-dark py-5">
      <div className="container">
        <div className="d-flex align-items-center justify-content-between text-white mb-md-7 mb-4">
          <a className="text-white h4" href="./index.html">LOGO</a>
          <ul className="d-flex list-unstyled mb-0 h4">
            <li><a href="#" className="text-white mx-3"><i className="fab fa-facebook"></i></a></li>
            <li><a href="#" className="text-white mx-3"><i className="fab fa-instagram"></i></a></li>
            <li><a href="#" className="text-white ms-3"><i className="fab fa-line"></i></a></li>
          </ul>
        </div>
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-end align-items-start text-white">
          <div className="mb-md-0 mb-1">
            <p className="mb-0">02-3456-7890</p>
            <p className="mb-0">service@mail.com</p>
          </div>
          <p className="mb-0">© 2020 LOGO All Rights Reserved.</p>
        </div>
      </div>
    </div>

    <footer className="footer" 
        style={{  
            backgroundColor: '#343a40',
            textAlign: 'center',
            color: '#fff',
            fontSize: '20px',
            padding: '10px 0 10px 0',
            left: '0%',
            right: '0%',
            bottom: '0',
        }}
    >
        Coding by Josh 
        <a href="https://github.com/josh-yo" target="_blank" style={{marginLeft: '10px'}}>
            <i className="bi bi-github" style={{fontSize:'36px', color:'white'}}></i>
        </a>
    </footer>

    {/* <div className="container-fluid">
        <div className="row">
            <div className="col-12 author p-0 d-block" style={{fontSize:'15px'}}>
                <p>test</p>
            </div>
        </div>
    </div>   */}

    </>)
}

export default FrontLayout;