import { Outlet, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { ThreeDot } from "react-loading-indicators";
import axios from 'axios';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import ScrollToUp from '../../components/ScrollToUp';
import '../../stylesheets/loadingAnimation.css';

function FrontLayout(){
    const [cartData, setCartData] = useState({});
    const cartIconRef = useRef(null);
    const[isLoading, setIsLoading] = useState(false);

    const getCart = async() => {
        try {
            const result = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`);
            setCartData(result.data.data);
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    // Scroll to top on page change
    const location = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    }, [location.pathname]);

    // Scroll to top when pagination changes
    const scrollNextPage = () => {
        window.scrollTo({
            top: 0,
            behavior: 'instant',
        });
    };

    useEffect(() => {
        setIsLoading(true);
        getCart();

        const handleLoad = () => {
            setIsLoading(false);
        }
        window.addEventListener("load", handleLoad);

        return () => {
            window.removeEventListener("load", handleLoad);
        }
    }, []);

    return(<>
    { isLoading && (
        <div className='loading-container'>
            <ThreeDot variant="bounce" color="#e31431" size="large" text="Loading..." textColor="" />
        </div>
    )}
    
    <Navbar cartData={cartData} cartIconRef={cartIconRef}/>

    <Outlet context={{ cartData, setCartData, getCart, cartIconRef, scrollNextPage, setIsLoading }}></Outlet>

    <Footer/>

    <ScrollToUp/>

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
        
        <a href="https://github.com/josh-yo" target="_blank" style={{textDecoration: 'none', color: 'white'}}>
            Coding by Josh
        </a>
        <a href="https://github.com/josh-yo" target="_blank" style={{marginLeft: '10px', marginRight: '10px'}}>
            <i className="bi bi-github" style={{fontSize:'36px', color:'white'}}></i>
        </a>
        <NavLink to="/login" className="admin-panel" style={{textDecoration: 'none', color: 'white'}}>Admin Panel</NavLink>
    </footer>
    </>)
}

export default FrontLayout;