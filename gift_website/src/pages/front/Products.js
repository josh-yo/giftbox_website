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

    const getProducts = async( page = 1) => {
      (async() =>{
          const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
          console.log(productRes);
          setProducts(productRes.data.products);
          setPagination(productRes.data.pagination);
      })();
    }

    useEffect(() => {
      getProducts(1);
    }, [])

    return(<>
    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        {/* filter */}
        <CategoryFilter allproducts={allproducts}/>

        {/* products */}
        <div className="col-md-9">
          <div className="row">
            {products.map((product) => {
              return(
                <div className="product-list col-6 col-md-4 col-xl-4" key={product.id}>
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
      {/* pagiantion */}
      <Pagination pagination={pagination} changePage={getProducts} />
     
    </div>
    </>
    )
}

export default Products;