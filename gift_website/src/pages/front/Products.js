import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import HoverImage from "../../components/HoverImage";
import '../../stylesheets/products.css'

function Products({ allproducts }){
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});
    // Track the currently selected category
    const [selectedCategory, setSelectedCategory] = useState('');

    useEffect(() => {
      getProducts(1);
    }, [])

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
          const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
          console.log(productRes);
          setProducts(productRes.data.products);
          setPagination(productRes.data.pagination);
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
                        <button type="button" className="btn btn-success">
                          <i className="bi bi-cart4"></i>
                          Add to cart</button>
                      </div>
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
        <Pagination pagination={pagination} changePage={getProducts} />
      ) : null}
    </div>
    </>
    )
}

export default Products;