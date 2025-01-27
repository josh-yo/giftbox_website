import { useState, useEffect } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { addToCart } from "../../components/AddToCart";
import { OrbitProgress } from "react-loading-indicators";
import axios from "axios";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import HoverImage from "../../components/HoverImage";
import CartAnimation from "../../components/CartAnimation";
import '../../stylesheets/products.css'

function Products({ allproducts }){
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    // Cart Button Animation
    const [ clickCartButton, setClickCartButton ] = useState(false);
    const [ activeButton, setActiveButton ] = useState(null); // unique product id
    // Track the currently selected category
    const [selectedCategory, setSelectedCategory] = useState('');

    const { getCart, cartIconRef, scrollNextPage, setIsLoading } = useOutletContext();
    const [triggerAnimation, setTriggerAnimation] = useState(null);

    const handleAddToCart = ( product, isMobile, id ) => {
      // Cart loading animations and button disable when adding to cart
      const button = document.querySelectorAll(`button[data-product-id="${id}"]`);
      const cartIcon = document.querySelectorAll(`.cart-icon[data-icon-id="${id}"]`);

      const productSelector = `[data-product-id="${product.id}"] img`;
      const productImage = document.querySelector(productSelector);
    
      if (productImage) {
        const productRect = productImage.getBoundingClientRect();
        const currentImageUrl = productImage.src;

        setActiveButton(id);
        button.forEach(( button ) => {
          button.classList.add("active");
        });
        cartIcon.forEach(( cartIcon ) => {
          cartIcon.classList.add("d-none");
        });
        setClickCartButton(true);
    
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
          
          setClickCartButton(false);
          setActiveButton(null);
        }, 2800);

      } else {
        console.warn('❌ Failed to find product image with selector:', productSelector);
      }
    };
  
    useEffect(() => {
      getProducts(1);
    }, []);

    // Handle category selection
    const handleCategorySelect = (category) => {
      setSelectedCategory(category); // Update selected category
      if (category === 'All') {
          getProducts(1); // If ALL is selected, reset to the first page
      }
    };

    // Filter products by category
    let filteredProducts = [];
    if (selectedCategory === '') {
        // Default & All : Use paging API to load products
        filteredProducts = products;
    } else if (selectedCategory === 'All') {
        filteredProducts = products;
    } else {
        // Other categories: filter products from allproducts
        filteredProducts = allproducts.filter(product => product.category === selectedCategory);
    }

    const getProducts = async( page = 1) => {
      (async() =>{
          setIsLoading(true);
          const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
          setProducts(productRes.data.products);
          setPagination(productRes.data.pagination);
          setIsLoading(false);
      })();
    }

    return(<>
    <div className="container mt-5 mb-7 p-0">
      <div className="row">
        {/* filter */}
        <CategoryFilter 
          allproducts={allproducts}
          selectedCategory={selectedCategory}
          setSelectedCategory={handleCategorySelect}
        />

        {/* products */}
        <div className="col-11 col-sm-12 col-md-8 col-lg-9 products-container">
          <div className="row">
            {filteredProducts.map((product) => {
              return(
                <div className="product-list col-6 col-lg-4" key={product.id}>
                  <div className="product-card card mb-4 position-relative position-relative" style={{ width: "100%" }}>
                    {/* image */}
                    <HoverImage product={product}/>

                    {/* Promotion Badge */}
                    <div className="promotion-badge">
                      <i className="bi bi-tag-fill"></i> Up to 20% off
                    </div>
                    {/* wishlists */}
                    {/* <a href="#" className="text-dark">
                      <i className="bi bi-heart position-absolute" style={{right: '16px', top: '16px'}}></i>
                    </a> */}

                    <div className="card-body">
                      <h2 className="card-title mb-0 mt-1">
                        <Link to={`/product/${product.id}`} className="">{product.title}</Link>
                      </h2>

                      <div className="d-flex align-items-center mt-1 mb-1">
                          <p className='mb-1 text-muted fw-bold specialPrice3'>
                              ${product.price}
                          </p>
                          <small className='mb-1 text-muted originalPrice3'>
                              $ {product.origin_price}
                          </small>
                      </div>

                      <div className="add_to_cart">
                        <button type="button" disabled={activeButton === product.id} key={`${product.id}-pc`} data-product-id={product.id} className="btn btn-success d-none d-md-block cart-button" onClick={() => handleAddToCart(product, false, product.id)}>
                          <div className="d-flex justify-content-center align-items-center">
                            { clickCartButton && activeButton === product.id && (
                              <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                            )}
                            <i className="bi bi-cart4 cart-icon pc" data-icon-id={product.id}></i>
                            <p className="cart-content">Add to cart</p>
                          </div>
                        </button>

                        <button type="button" disabled={activeButton === product.id} key={`${product.id}-phone`} data-product-id={product.id} className="btn btn-success d-block d-md-none cart-button" onClick={() => handleAddToCart(product, true, product.id)}>
                          <div className="d-flex justify-content-center align-items-center">
                            { clickCartButton && activeButton === product.id && (
                              <OrbitProgress variant="dotted" color="#32cd32" size="small" text="" textColor="" />
                            )}
                            <i className="bi bi-cart4 cart-icon phone" data-icon-id={product.id}></i>
                            <p className="cart-content">Add to cart</p>
                          </div>
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
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {/* Pagiantion：Only displayed when no category is selected or "All" is selected */}
      {selectedCategory === '' || selectedCategory === 'All' ? (
        <Pagination pagination={pagination} changePage={getProducts} scrollNextPage={scrollNextPage} />
      ) : null}
    </div>
    </>
    )
}

export default Products;