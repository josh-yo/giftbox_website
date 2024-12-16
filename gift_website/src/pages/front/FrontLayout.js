import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

function FrontLayout(){
    return(<>
    <Navbar/>

    <Outlet></Outlet>

    <Footer/>

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