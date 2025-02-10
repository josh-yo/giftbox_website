import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { addToCart } from "../../components/AddToCart";
import { OrbitProgress } from "react-loading-indicators";
import Lottie from "lottie-react";
import ScrollDownAnimation from "./ScrollDownAnimation.json";
import fvVideo from './fv_video.mp4'
import brand_video1 from './brand_video1.mp4'
import brand_video2 from './brand_video2.mp4'
import HoverImage from "../../components/HoverImage";
import CartAnimation from "../../components/CartAnimation";
import '../../stylesheets/home.css'

function Home({ allproducts }) {
    const topSalesProducts = [allproducts[0], allproducts[3], allproducts[6]];
    const featuredgift = [allproducts[21], allproducts[23], allproducts[22]];
    const { getCart, cartIconRef } = useOutletContext();
    const [triggerAnimation, setTriggerAnimation] = useState(null);

    // Cart Button Animation
    const [ activeButtons, setActiveButtons ] = useState({});

    const handleAddToCart = ( product, isMobile, id ) => {
      const productSelector = `[data-product-id="${product.id}"] img`;
      const productImage = document.querySelector(productSelector);

      // Cart loading animations and button disable when adding to cart
      const button = document.querySelectorAll(`button[data-product-id="${id}"]`);
      const cartIcon = document.querySelectorAll(`.cart-icon[data-icon-id="${id}"]`);
      
      if (productImage) {
        const productRect = productImage.getBoundingClientRect();
        const currentImageUrl = productImage.src;
    
        // setActiveButton(id);
        setActiveButtons((prevState) => ({
          ...prevState,
          [id]: true,
        }));
        button.forEach(( button ) => {
          button.classList.add("active");
        });
        cartIcon.forEach(( cartIcon ) => {
          cartIcon.classList.add("d-none");
        });

        addToCart(
          product.id,
          1,
          getCart,
          !isMobile ? setTriggerAnimation : null,
          productSelector,
          product.title,
          isMobile
        );

        // Reset button state after 2.8 seconds
        setTimeout(() => {
          button.forEach(( button ) => {
            button.classList.remove("active");
          });
          cartIcon.forEach(( cartIcon ) => {
            cartIcon.classList.remove("d-none");
          });
          
          setActiveButtons((prevState) => ({
            ...prevState,
            [id]: false,
          }));
          // setActiveButton(null);
        }, 2800);

      } else {
        console.warn('❌ Failed to find product image with selector:', productSelector);
      }
    };

    return(<>
    <div className="fv-background">
      <video
          src={fvVideo}
          autoPlay
          loop
          muted
          playsInline
          className="fv-video"
      ></video>
      <div className="fv-content">
          A gift as special as your love
      </div>
      <button 
        onClick={() => document.querySelector("#scroll-section")?.scrollIntoView({ behavior: "smooth" })}
      >
        <Lottie className="scroll-down-animation" animationData={ScrollDownAnimation} loop={true} />
      </button>
    </div>
    {/* Top Sales */}
    <div className="container">
      <div className="row mt-5">
        <h3 id="scroll-section" className='topSales'>Top Sales</h3>
        {topSalesProducts.map((product, index) => {
            return(
              <div className="col-md-4 mt-4" key={index}>
                  <div className="card border-0 mb-4">
                    {product && product.imageUrl && (
                      <HoverImage product={product} />
                    )}
                    {/* Promotion Badge */}
                    <div className="promotion-badge">
                        <i className="bi bi-tag-fill"></i> Up to 20% off
                    </div>
                    <div className="card-body">
                        <h2 className="card-title mb-0 mt-1">
                            <Link to={`/product/${product?.id}`} className="">{product?.title}</Link>
                        </h2>
                        <div className="d-flex align-items-center mt-1 mb-1">
                            <p className='mb-1 text-muted fw-bold specialPrice3'>
                                ${product?.price}
                            </p>
                            <small className='mb-1 text-muted originalPrice3'>
                                ${product?.origin_price}
                            </small>
                        </div>
                    </div>
                    <div className="add_to_cart">
                      <button type="button" className="btn btn-success d-none d-md-block cart-button" disabled={activeButtons[product?.id]} key={`${product?.id}-pc`} data-product-id={product?.id} onClick={() => handleAddToCart(product, false, product?.id)}>
                          { activeButtons[product?.id] && (
                            <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                          )}
                          <i className="bi bi-cart4 cart-icon pc" data-icon-id={product?.id}></i>
                          Add to cart
                      </button>
                      <button type="button" className="btn btn-success d-block d-md-none cart-button" disabled={activeButtons[product?.id]} key={`${product?.id}-phone`} data-product-id={product?.id} onClick={() => handleAddToCart(product, true, product?.id)}>
                          { activeButtons[product?.id] && (
                            <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                          )}
                          <i className="bi bi-cart4 cart-icon phone" data-icon-id={product?.id}></i>
                          Add to cart
                      </button>
                    </div>
                    {triggerAnimation && (
                      <CartAnimation
                        cartIconRef={cartIconRef}
                        productRect={triggerAnimation?.rect}
                        currentImageUrl={triggerAnimation?.imageUrl}
                      />
                    )}
                  </div>
              </div>
            )
        })}
        <div className="text-center mt-4">
          <Link to="/products" className="view-more">
            <span className="">View More Products</span>
          </Link>
        </div>
      </div>
    </div>
    {/* Brand Video */}
    <div className="container my-7">
      <div className="row">
        <div className="col-md-6">
          <video
            src={brand_video1}
            autoPlay
            loop
            muted
            playsInline
            className="w-100"
          ></video>
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">Surprise Delivered</h4>
          <p className="text-muted">Every box is packed with a moment of pure delight.</p>
        </div>
      </div>
      <div className="row flex-row-reverse justify-content-between mt-4">
        <div className="col-md-6">
          <video
            src={brand_video2}
            autoPlay
            loop
            muted
            playsInline
            className="w-100"
          ></video>
        </div>
        <div className="col-md-4 m-auto text-center">
          <h4 className="mt-4">Celebrate Together</h4>
          <p className="text-muted">Happiness is always better when shared.</p>
        </div>
      </div>
    </div>
    {/* Featured Gift Service */}
    <div className="container">
      <div className="row mt-5">
        <h3 className='topSales'>Featured Gift Service</h3>
        {featuredgift.map((product, index) => {
            return(
              <div className="col-md-4 mt-4" key={index}>
                  <div className="card border-0 mb-4">
                    {product && product.imageUrl && (
                      <HoverImage product={product} />
                    )}
                    {/* Promotion Badge */}
                    <div className="promotion-badge">
                        <i className="bi bi-tag-fill"></i> Up to 20% off
                    </div>
                    <div className="card-body">
                        <h2 className="card-title mb-0 mt-1">
                            <Link to={`/product/${product?.id}`} className="">{product?.title}</Link>
                        </h2>
                        <div className="d-flex align-items-center mt-1 mb-1">
                            <p className='mb-1 text-muted fw-bold specialPrice3'>
                                ${product?.price}
                            </p>
                            <small className='mb-1 text-muted originalPrice3'>
                                ${product?.origin_price}
                            </small>
                        </div>
                    </div>
                    <div className="add_to_cart">
                      <button type="button" className="btn btn-success d-none d-md-block cart-button" disabled={activeButtons[product?.id]} key={`${product?.id}-pc`} data-product-id={product?.id} onClick={() => handleAddToCart(product, false, product?.id)}>
                          { activeButtons[product?.id] && (
                            <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                          )}
                          <i className="bi bi-cart4 cart-icon pc" data-icon-id={product?.id}></i>
                          Add to cart
                      </button>
                      <button type="button" className="btn btn-success d-block d-md-none cart-button" disabled={activeButtons[product?.id]} key={`${product?.id}-phone`} data-product-id={product?.id} onClick={() => handleAddToCart(product, true, product?.id)}>
                          { activeButtons[product?.id] && (
                            <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                          )}
                          <i className="bi bi-cart4 cart-icon phone" data-icon-id={product?.id}></i>
                          Add to cart
                      </button>
                    </div>
                    {triggerAnimation && (
                      <CartAnimation
                        cartIconRef={cartIconRef}
                        productRect={triggerAnimation?.rect}
                        currentImageUrl={triggerAnimation?.imageUrl}
                      />
                    )}
                  </div>
              </div>
            )
        })}
        <div className="text-center mt-4">
          <Link to="/products" className="view-more">
            <span className="">View More Products</span>
          </Link>
        </div>
      </div>
    </div>
    {/* Customer Review */}
    <div className="bg-light mt-7">
      <div className="container">
        <div id="carouselCustomerReview" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">
            {/* Review 1 */}
            <div className="carousel-item active" data-bs-interval="3300">
              <div className="row justify-content-center py-5">
                <div className="col-9 col-md-6 text-center">
                  <h3 className="mb-4">Customer Review</h3>
                  <div className="">
                    <img src="https://plus.unsplash.com/premium_photo-1661638602439-60a0b9b4d6cc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fGZhbWlseSUyMGdpZnR8ZW58MHx8MHx8fDA%3D" className="d-block w-100" alt="..."/>
                  </div>
                  <p className="my-4">“The smile on my mom's face says it all. It was such a joy to see her so happy. Best gift ever, Highly recommend!”</p>
                  <p><small>— Sophia L. —</small></p>
                </div>
              </div>
            </div>
            {/* Review 2 */}
            <div className="carousel-item" data-bs-interval="3300">
              <div className="row justify-content-center py-5">
                <div className="col-9 col-md-6 text-center">
                  <h3 className="mb-4">Customer Review</h3>
                  <img src="https://plus.unsplash.com/premium_photo-1667520327805-87f70ba78a31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDExfHx8ZW58MHx8fHx8" className="d-block w-100" alt="..."/>
                  <p className="my-4">“Seeing our daughter's happiness while giving this gift was priceless. It brought so much joy to all of us!”</p>
                  <p><small>— Aiden K. —</small></p>
                </div>
              </div>
            </div>
            {/* Review 3 */}
            <div className="carousel-item" data-bs-interval="3300">
              <div className="row justify-content-center py-5">
                <div className="col-9 col-md-6 text-center">
                  <h3 className="mb-4">Customer Review</h3>
                  <img src="https://plus.unsplash.com/premium_photo-1661512385206-e7ac01d9e961?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDF8fGZhbWlseSUyMGdpZnR8ZW58MHx8MHx8fDA%3D" className="d-block w-100" alt="..."/>
                  <p className="my-4">“The perfect gift for family moments. My wife loved it, and the kids were so excited to give it to her!”</p>
                  <p><small>— James P. —</small></p>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselCustomerReview" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselCustomerReview" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
    {/* promotion banner */}
    <div className="container-fluid bg-dark text-light pt-6 pb-4">
      <div className="row text-center">
        <div className="col-11 promotion-background mx-auto">
          <div className="row">
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center pt-4 pb-2">
                <i className="bi bi-truck display-4"></i>
                <h5 className="mt-2">Free Shipping</h5>
                <p className="small">Free delivery across Australia</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center pt-4 pb-2">
                <i className="bi bi-shield-lock display-4"></i>
                <h5 className="mt-2">Secure Payment</h5>
                <p className="small">Your data is always safe</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center pt-4 pb-2">
                <i className="bi bi-shop display-4"></i>
                <h5 className="mt-2">Support Local</h5>
                <p className="small">Shop and support Aussie brands</p>
              </div>
            </div>
            <div className="col-6 col-md-3">
              <div className="d-flex flex-column align-items-center pt-4 pb-2">
                <i className="bi bi-gift display-4"></i>
                <h5 className="mt-2">Gift Wrap</h5>
                <p className="small">Make gifts look special</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
    )
}

export default Home;