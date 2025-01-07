import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import HoverImage from "./HoverImage";
import '../stylesheets/recommendedProducts.css';

function RecommendedProducts({ allproducts, product }) {
    const [recommendedProducts1, setRecommendedProducts1] = useState([]);
    const [recommendedProducts2, setRecommendedProducts2] = useState([]);
    const [recommendedProducts3, setRecommendedProducts3] = useState([]);
    const currentProductId = product.id;

    useEffect(() => {
        const filteredProducts = allproducts
            .filter(product => product.id !== currentProductId)
            .sort(() => Math.random() - 0.5)
            .slice(0, 6);

        // divide the filtered products into three groups of two
        const firstGroup = filteredProducts.slice(0, 2);
        const secondGroup = filteredProducts.slice(2, 4);
        const thirdGroup = filteredProducts.slice(4, 6);

        setRecommendedProducts1(firstGroup);
        setRecommendedProducts2(secondGroup);
        setRecommendedProducts3(thirdGroup);

    }, [allproducts, currentProductId])

    return(<>
        <h3 className="fw-bold text-center mt-4 mb-5 nav-title" style={{textUnderlineOffset:"10px"}}>You might also like!</h3>
        <div id="recommendedCarousel" className="carousel slide mb-5">
            <div className="carousel-inner">

                {/* First Group */}
                <div className="container carousel-item active">
                    <div className="row">
                        <div className="col-8 mx-auto">
                            <div className="row">
                                {recommendedProducts1.map((product,index) => {
                                    return(
                                        <div className="product-list col-6" key={product.id}>
                                            <div className="product-card card mb-4 position-relative position-relative" style={{ width: "100%" }}>
                                                {/* image */}
                                                <HoverImage product={product}/>
                                                {/* Promotion Badge */}
                                                <div className="promotion-badge">
                                                    <i className="bi bi-tag-fill"></i> Up to 20% off
                                                </div>
                                                {/* product information */}
                                                <div className="card-body">
                                                    <h2 className="card-title mb-0 mt-1">
                                                        <Link to="/#" className="">{product.title}</Link>
                                                    </h2>
                                                    <div className="d-flex align-items-center mt-1 mb-1">
                                                        <p className='mb-1 text-muted fw-bold specialPrice3'>
                                                            ${product.price}
                                                        </p>
                                                        <small className='mb-1 text-muted originalPrice3'>
                                                            ${product.origin_price}
                                                        </small>
                                                    </div>
                                                    <div className="add_to_cart">
                                                        <button type="button" className="btn btn-success d-none d-md-block">
                                                        <i className="bi bi-cart4"></i>
                                                        Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            
                {/* Second Group */}
                <div className="container carousel-item">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                {recommendedProducts2.map((product) => {
                                    return(
                                        <div className="product-list col-6" key={product.id}>
                                            <div className="product-card card mb-4 position-relative position-relative" style={{ width: "100%" }}>
                                                {/* image */}
                                                <HoverImage product={product}/>
                                                {/* Promotion Badge */}
                                                <div className="promotion-badge">
                                                    <i className="bi bi-tag-fill"></i> Up to 20% off
                                                </div>
                                                {/* product information */}
                                                <div className="card-body">
                                                    <h2 className="card-title mb-0 mt-1">
                                                        <Link to="/#" className="">{product.title}</Link>
                                                    </h2>
                                                    <div className="d-flex align-items-center mt-1 mb-1">
                                                        <p className='mb-1 text-muted fw-bold specialPrice3'>
                                                            ${product.price}
                                                        </p>
                                                        <small className='mb-1 text-muted originalPrice3'>
                                                            ${product.origin_price}
                                                        </small>
                                                    </div>
                                                    <div className="add_to_cart">
                                                        <button type="button" className="btn btn-success d-none d-md-block">
                                                        <i className="bi bi-cart4"></i>
                                                        Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>  
                    </div>
                </div>

                {/* Third Group */}
                <div className="container carousel-item">
                    <div className="row">
                        <div className="col-10 mx-auto">
                            <div className="row">
                                {recommendedProducts3.map((product) => {
                                    return(
                                        <div className="product-list col-6" key={product.id}>
                                            <div className="product-card card mb-4 position-relative position-relative" style={{ width: "100%" }}>
                                                {/* image */}
                                                <HoverImage product={product}/>
                                                {/* Promotion Badge */}
                                                <div className="promotion-badge">
                                                    <i className="bi bi-tag-fill"></i> Up to 20% off
                                                </div>
                                                {/* product information */}
                                                <div className="card-body">
                                                    <h2 className="card-title mb-0 mt-1">
                                                        <Link to="/#" className="">{product.title}</Link>
                                                    </h2>
                                                    <div className="d-flex align-items-center mt-1 mb-1">
                                                        <p className='mb-1 text-muted fw-bold specialPrice3'>
                                                            ${product.price}
                                                        </p>
                                                        <small className='mb-1 text-muted originalPrice3'>
                                                            ${product.origin_price}
                                                        </small>
                                                    </div>
                                                    <div className="add_to_cart">
                                                        <button type="button" className="btn btn-success d-none d-md-block">
                                                        <i className="bi bi-cart4"></i>
                                                        Add to cart
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>  
                    </div>
                </div>

            </div>
             {/* Carousel button */}
             <button className="carousel-control-prev carousel-control-custom" type="button" data-bs-target="#recommendedCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
            </button>
            <button className="carousel-control-next carousel-control-custom" type="button" data-bs-target="#recommendedCarousel" data-bs-slide="next">
                <span className="carousel-control-next-icon"></span>
            </button>
      </div>
    </>)
}

export default RecommendedProducts;