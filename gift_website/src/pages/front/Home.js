import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { addToCart } from "../../components/AddToCart";
import fvVideo from './fv_video.mp4'
import brand_video1 from './brand_video1.mp4'
import brand_video2 from './brand_video2.mp4'
import HoverImage from "../../components/HoverImage";
import CartAnimation from "../../components/CartAnimation";
import '../../stylesheets/home.css'

function Home({ allproducts }) {
    const topSalesProducts = [allproducts[0], allproducts[3], allproducts[6]];
    const { getCart, cartIconRef } = useOutletContext();
    const [triggerAnimation, setTriggerAnimation] = useState(null);

    const handleAddToCart = ( product, isMobile ) => {
      const productSelector = `[data-product-id="${product.id}"] img`;
      const productImage = document.querySelector(productSelector);
      
      if (productImage) {
        const productRect = productImage.getBoundingClientRect();
        const currentImageUrl = productImage.src;
    
        addToCart(
          product.id,
          1,
          getCart,
          !isMobile ? setTriggerAnimation : null,
          productSelector,
          product.title,
          isMobile
        );
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
    </div>
    {/* Top Sales */}
    <div className="container">
      <div className="row mt-5">
        <h3 className='topSales'>Top Sales</h3>
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
                      <button type="button" className="btn btn-success d-none d-md-block" onClick={() => handleAddToCart(product, false)}>
                          <i className="bi bi-cart4"></i>
                          Add to cart
                      </button>
                      <button type="button" className="btn btn-success d-block d-md-none" onClick={() => handleAddToCart(product, true)}>
                          <i className="bi bi-cart4"></i>
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
    {/* Customer Review */}
    <div className="bg-light mt-7">
      <div className="container">
        <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <h3>Customer Review</h3>
                  <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <div className="row justify-content-center py-7">
                <div className="col-md-6 text-center">
                  <h3>Lorem ipsum.</h3>
                  <p className="my-5">“Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat.”</p>
                  <p><small>—Lorem ipsum dolor sit amet.—</small></p>
                </div>
              </div>
            </div>
          </div>
          <a className="carousel-control-prev" href="#carouselExampleControls"  role="button" data-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="sr-only">Previous</span>
          </a>
          <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="sr-only">Next</span>
          </a>
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
    </>
    )
}

export default Home;