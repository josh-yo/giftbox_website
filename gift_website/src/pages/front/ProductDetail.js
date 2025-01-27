import { useState, useEffect, useRef } from "react";
import { useOutletContext, useParams, NavLink } from "react-router-dom";
import { addToCart } from "../../components/AddToCart";
import { OrbitProgress } from "react-loading-indicators";
import axios from "axios";
import CartItem from "../../components/CartItem";
import CartAnimation from "../../components/CartAnimation";
import RecommendedProducts from "../../components/RecommendedProducts";
import '../../stylesheets/productDetail.css'

function ProductDetail({ allproducts }){
    const [product, setProduct] = useState({});
    const [cartQuantity, setCartQuantity] = useState(1);
    const { id } = useParams(); // Get dynamic parameters from URL
    const { getCart, cartIconRef, setIsLoading } = useOutletContext();
    const [ clickCartButton, setClickCartButton ] = useState(false);

    // Cart Animation Refs
    const [triggerAnimation, setTriggerAnimation] = useState(null);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);
    const activeImageRef = useRef(null);
    const productRef = useRef(null);

    // Fetch product details from API by ID
    const getProduct = async(id) => {
        (async() =>{
            setIsLoading(true);
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/product/${id}`);
            setProduct(productRes.data.product);
            setIsLoading(false);
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

    const handleAddToCart = ( isMobile ) => {
      // Cart loading animations and button disable when adding to cart
      const button = document.querySelector(".cart-button");
      const cartIconPc = document.querySelector(".cart-icon-pc");
      const cartIconPhone = document.querySelector(".cart-icon-phone");

      button.classList.add("active");
      cartIconPc.classList.add("d-none");
      cartIconPhone.classList.add("d-none");
      setClickCartButton(true);
      setIsButtonDisabled(true);
      addToCart(
        product.id, 
        cartQuantity, 
        getCart, 
        !isMobile ? setTriggerAnimation : null,
        '.carousel-item.active img', 
        product.title,
        isMobile);

        // Reset button state after 2.8 seconds
        setTimeout(() => {
          button.classList.remove("active");
          cartIconPc.classList.remove("d-none");
          cartIconPhone.classList.remove("d-none");
          setClickCartButton(false);
          setIsButtonDisabled(false);
        }, 2800);
    };

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
                    <div key="0" className="carousel-item active detail-carousel-item ">
                      <img src={product.imageUrl} ref={activeImageRef} className="d-block w-100" alt="Main Image"/>
                    </div>
                  )}
                  {/* Others photo */}
                  {product.imagesUrl?.filter(url => url.trim() !== "").map((url, index) => (
                    <div key={index+1} className="carousel-item detail-carousel-item ">
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
              <button type="button" href="./checkout.html" disabled={isButtonDisabled} className="text-nowrap btn btn-success w-100 py-2 d-none d-md-block cart-button" 
              onClick={() => handleAddToCart(false)}>
                <div className="d-flex justify-content-center align-items-center">
                  { clickCartButton && (
                    <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                  )}
                  <i className="bi bi-cart4 cart-icon-pc"></i>
                  <p className="cart-content">Add to cart</p>
                </div>
                
              </button>
              <button type="button" href="./checkout.html" disabled={isButtonDisabled} className="text-nowrap btn btn-success w-100 py-2 d-block d-md-none cart-button" 
              onClick={() => handleAddToCart(true)}>
                <div className="d-flex justify-content-center align-items-center">
                  { clickCartButton && (
                    <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                  )}
                  <i className="bi bi-cart4 cart-icon-phone"></i>
                  <p className="cart-content">Add to cart</p>
                </div>
              </button>
           
              {triggerAnimation && (
                <CartAnimation 
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
                            <p>Large or Heavy Items: No additional shipping charges.</p>
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
      <RecommendedProducts allproducts={allproducts} product={product} />
    </div>
    </>)
}

export default ProductDetail;

// Notes:
// - Manages product details and quantity state.
// - Sends quantity and product data to the API when adding to the cart.