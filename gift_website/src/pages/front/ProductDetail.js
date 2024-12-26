import { useState, useEffect } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import axios from "axios";
import CategoryFilter from "../../components/CategoryFilter";
import CartItem from "../../components/CartItem";
import '../../stylesheets/productDetail.css'

function ProductDetail(){
    const [product, setProduct] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { id } = useParams(); // Get dynamic parameters from URL
    const { getCart } = useOutletContext();

    // Fetch product details from API by ID
    const getProduct = async(id) => {
        (async() =>{
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
            setProduct(productRes.data.product);
        })();
    }
    // Fetch product data when page loads or ID changes
    useEffect(() => {
        getProduct(id);
    }, [id])
    // Increase product quantity by 1
    const increaseQuantity = () => {
      setCartQuantity((prev) => prev + 1);
    };
    // Decrease product quantity by 1 (Minimum is 1)
    const decreaseQuantity = () => {
      setCartQuantity((prev) => (prev === 1 ? prev : prev - 1));
    };

    const addToCart = async() =>{
      const data = {
        data: {
          product_id : product.id ,
          qty: cartQuantity,
        }
      }
      try {
        const result = await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
        getCart(); // Refresh cart data
      } catch (error) {
        console.log(error)
      }
    }

    return(<>
    <div className="container mt-5">
      <div className="row">
        
        {/* filter */}
        <CategoryFilter/>
        
        <div className="col-md-9">
          <div className="row">

            <div className="col-md-6">
              <div id="carouselExampleControls" className="carousel slide">
                <div className="carousel-inner">
                  {/* Main photo */}
                  {product.imageUrl && (
                    <div key="0" className="carousel-item active">
                      <img src={product.imageUrl} className="d-block w-100" alt="Main Image" />
                    </div>
                  )}

                  {/* Others photo */}
                  {product.imagesUrl?.map((url, index) => (
                    <div key={index+1} className="carousel-item">
                      <img src={url} className="d-block w-100" alt={`Slide ${index + 1}`} />
                    </div>
                  ))}

                  {/* button */}
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
                      <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
                      <span className="carousel-control-next-icon"></span>
                  </button>
                </div>

                <div className="mt-3 thumbnailGroup d-flex justify-content-center flex-wrap">
                  {/* Main photo */}
                  {product.imageUrl && (
                    <button
                      key="0"
                      className="carousel-button active"
                      data-bs-target="#carouselExampleControls"
                      data-bs-slide-to="0"
                      aria-current="true"
                      aria-label="Slide 1"
                    >
                      <img
                        src={product.imageUrl}
                        className="d-block w-100 shadow-1-strong"
                        alt="Main Thumbnail"
                      />
                    </button>
                  )}
                  {/* Others photo */}
                  {product.imagesUrl?.map((url, index) => (
                    <button 
                      key={index+1}
                      className={`carousel-button ${index === 0 && !product.imageUrl ? 'active' : ''}`}
                      data-bs-target="#carouselExampleControls" 
                      data-bs-slide-to={index + 1}
                      aria-current="true" 
                      aria-label={`Slide ${index + 2}`}
                    >
                    <img
                      src={url}
                      className="d-block w-100 shadow-1-strong"
                      alt={`Thumbnail ${index + 1}`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-md-6">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb bg-white px-0 mb-0 py-3">
                <li className="breadcrumb-item"><a className="text-muted" href="./index.html">Home</a></li>
                <li className="breadcrumb-item"><a className="text-muted" href="./product.html">Product</a></li>
                <li className="breadcrumb-item active" aria-current="page">Detail</li>
              </ol>
            </nav>
            <h2 className="fw-bold h1 mb-1">{product.title}</h2>
            <p className="mb-0 text-muted text-end"><del>NT${product.origin_price}</del></p>
            <p className="h4 fw-bold text-end">NT${product.price}</p>
            <div className="row align-items-center">
              <div className="col-6">
                <div className="input-group my-3 bg-light rounded">
                  <CartItem 
                    cartQuantity={cartQuantity} 
                    setCartQuantity={setCartQuantity}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                  />
                </div>
              </div>
              <div className="col-6">
                <button type="button" href="./checkout.html" className="text-nowrap btn btn-dark w-100 py-2" 
                onClick={() => addToCart()}  
                >
                  Add to cart  
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>


      <div className="row my-5">
        <div className="col-md-4">
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et</p>
        </div>
        <div className="col-md-3">
          <p className="text-muted">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor</p>
        </div>
      </div>
      <h3 className="fw-bold">Lorem ipsum dolor sit amet</h3>
      <div className="swiper-container mt-4 mb-5">
        <div className="swiper-wrapper">
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
          <div className="swiper-slide">
            <div className="card border-0 mb-4 position-relative position-relative">
              <img src="https://images.unsplash.com/photo-1490312278390-ab64016e0aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80" className="card-img-top rounded-0" alt="..." />
              <a href="#" className="text-dark">
              </a>
              <div className="card-body p-0">
                <h4 className="mb-0 mt-3"><a href="#">Lorem ipsum</a></h4>
                <p className="card-text mb-0">NT$1,080 <span className="text-muted "><del>NT$1,200</del></span></p>
                <p className="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div className="bg-light py-4">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center align-items-start">
          <p className="mb-0 fw-bold">Lorem ipsum dolor sit amet.</p>
          <div className="input-group w-md-50 mt-md-0 mt-3">
            <input type="text" className="form-control rounded-0" placeholder="" />
            <div className="input-group-append">
              <button className="btn btn-dark rounded-0" type="button" id="search">
                Lorem ipsum
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>)
}

export default ProductDetail;

// Notes:
// - Manages product details and quantity state.
// - Sends quantity and product data to the API when adding to the cart.