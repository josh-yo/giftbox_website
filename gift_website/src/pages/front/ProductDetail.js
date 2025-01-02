import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";
import axios from "axios";
import CartItem from "../../components/CartItem";
import CartAnimation from "../../components/CartAnimation";
import '../../stylesheets/productDetail.css'

function ProductDetail(){
    const [product, setProduct] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { id } = useParams(); // Get dynamic parameters from URL
    const { getCart, cartIconRef  } = useOutletContext();

    // Cart Animation Refs
    const [triggerAnimation, setTriggerAnimation] = useState(null);
    const activeImageRef = useRef(null);
    const productRef = useRef(null);

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

        // Get the active image element
        const activeImage = document.querySelector('.carousel-item.active img');
        if (!activeImage) {
          console.error('Cannot find active image element');
          return;
        }

        // ✅ Set the trigger animation state
        setTriggerAnimation({
          imageUrl: activeImage.src,
          rect: activeImage.getBoundingClientRect(),
        });

        // ✅ Clear the trigger animation state after 1.5 seconds
        setTimeout(() => {
          setTriggerAnimation(null);
        }, 1500);

        console.log(product);
      } catch (error) {
        console.log(error)
      }
    }

    return(<>
    <div className="container mt-5">
      <div className="row">
        {/* navigation */}
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb bg-white px-0 mb-0 py-4">
            <li className="breadcrumb-item">
              <NavLink className="breadcrumb-link" to="/">Home</NavLink>
            </li>
            <li className="breadcrumb-item">
              <NavLink className="breadcrumb-link" to="/products">Product</NavLink>
            </li>
            <li className="breadcrumb-item active nav-title" aria-current="page">{product.title}</li>
          </ol>
        </nav>
        
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-6">
              <div id="carouselExampleControls" className="carousel slide">
                <div className="carousel-inner">
                  {/* Main photo */}
                  {product.imageUrl && (
                    <div key="0" className="carousel-item active">
                      <img src={product.imageUrl} ref={activeImageRef} className="d-block w-100" alt="Main Image"/>
                    </div>
                  )}
                  {/* Others photo */}
                  {product.imagesUrl?.filter(url => url.trim() !== "").map((url, index) => (
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
                {/* Thumbnail */}
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
                    {product.imagesUrl?.filter(url => url.trim() !== "").map((url, index) => (
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
                        data-test={product.imagesUrl.length}
                        />
                      </button>
                    ))}
                </div>
              </div>
            </div>

            {/* Product Information */}
            <div className="col-md-6">
              {/* title */}
              <h1 className="fw-bold h1 mb-1 titleName">{product.title}</h1>
              {/* price */}
              <div className="price_block d-flex align-items-center">
                  <p className='mb-1 text-muted fw-bold specialPrice2'>
                      ${product.price}
                  </p>
                  <small className='mb-1 text-muted originalPrice2'>
                      $ {product.origin_price}
                  </small>
              </div>
              {/* QTY */}
              <div className="input-group my-3 bg-light align-items-center cartContainer">
                <CartItem 
                  cartQuantity={cartQuantity} 
                  setCartQuantity={setCartQuantity}
                  increaseQuantity={increaseQuantity}
                  decreaseQuantity={decreaseQuantity}
                />
              </div>
              {/* Add to cart button */}
              <button type="button" href="./checkout.html" className="text-nowrap btn btn-success w-100 py-2" 
              onClick={() => addToCart()}  
              >
                Add to cart  
              </button>
           
              {triggerAnimation && (
                <CartAnimation 
                  product={product} 
                  cartIconRef={cartIconRef} 
                  productRect={triggerAnimation.rect}
                  currentImageUrl={triggerAnimation.imageUrl}
                />
              )}
          
              {/* Information Accordion */}
              <div className="container productContainer" id="productAccordion">
                  <div className="row">
                      {/* Description */}
                      <div className="col-12 mb-3 product-title-container description-info" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="false" aria-controls="collapse1">
                          <h5 className="product-title d-flex justify-content-between align-items-center mb-3">Description
                              <span className="bi bi-chevron-down toggle-icon accordionButton"></span>
                          </h5>
                          <div className="product-list list-unstyled collapse" id="collapse1" aria-labelledby="headingOne">
                              <p>{product.content}</p>
                              <p>{product.description}</p>
                          </div>
                      </div>
                      {/* Shipping */}
                      <div className="col-12 mb-3 product-title-container" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="false" aria-controls="collapse2">
                          <h5 className="product-title d-flex justify-content-between align-items-center mb-3">Shipping
                              <span className="bi bi-chevron-down toggle-icon accordionButton"></span>
                          </h5>
                          <div className="product-list list-unstyled collapse" id="collapse2" aria-labelledby="headingOne">
                            <p>Free Shipping on All Orders Within Australia</p>
                            <p>Delivery Within Australia Only</p>
                            <p>Large or Heavy Items: No additional shipping charges.y</p>
                          </div>
                      </div>
                      {/* Returns Policy */}
                      <div className="col-12 mb-3 product-title-container" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="false" aria-controls="collapse3">
                          <h5 className="product-title d-flex justify-content-between align-items-center mb-3">Returns Policy
                              <span className="bi bi-chevron-down toggle-icon accordionButton"></span>
                          </h5>
                          <div className="product-list list-unstyled collapse" id="collapse3" aria-labelledby="headingOne">
                            <p><span className="fw-bold">1️⃣Check Your Order： </span>Verify your items upon arrival to ensure everything is correct.</p>
                            <p><span className="fw-bold">2️⃣Keep Packaging： </span>Keep all original packaging and documents until you're happy with your order.</p>
                            <p><span className="fw-bold">3️⃣Report Issues Quickly： </span>Contact us promptly if there are any problems with your items.</p>
                            <p><span className="fw-bold">4️⃣Proof of Purchase： </span>Keep your invoice or order reference for quick assistance.</p> 
                          </div>
                      </div>
                  </div>
              </div>
              {/* Donation */}
              <div className="thank-you-box">
                <div className="thank-you-icon">😊</div>
                <div>
                  <p className="thank-you-title"><strong>Thanks for shopping with us!</strong></p>
                  <p className="thank-you-text">
                    We donate 1.5% of our profits to support children's education, health, and well-being, helping create a brighter future for every child.
                  </p>
                </div>
              </div>
              {/* Donation */}
            </div>
          </div>
        </div>
      </div>
      
      {/* More product recommendations */}
      <h3 className="fw-bold text-center mt-4 nav-title" style={{textUnderlineOffset:"10px"}}>You might also like!</h3>
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
        </div>
      </div>
    </div>
    </>)
}

export default ProductDetail;

// Notes:
// - Manages product details and quantity state.
// - Sends quantity and product data to the API when adding to the cart.