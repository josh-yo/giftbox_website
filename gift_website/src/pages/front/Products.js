import { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/Pagination";
import '../../stylesheets/products.css'

function Products(){
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const getProduct = async( page = 1) => {
      (async() =>{
          const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/products?page=${page}`);
          console.log(productRes);
          setProducts(productRes.data.products);
          setPagination(productRes.data.pagination);
      })();
    }

    useEffect(() => {
      getProduct(1);
    }, [])

    return(<>
    
    {/* Filter */}
    <div className="containr" style={{background: 'gray'}}>
      <div className="row">
        <div className="col-md-12">
          <h5>Filter</h5>
        </div>
      </div>
    </div>

    <div className="container mt-md-5 mt-3 mb-7">
      <div className="row">
        {/* filter */}
        <div className="col-md-3">
          <div className="filter">
            <h5 style={{textAlign: 'center'}}>Category</h5>
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Category1</span>
                <span className="item-amount badge badge-primary badge-pill">14</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
              <span>Category2</span>
                <span className="item-amount badge badge-primary badge-pill">2</span>
              </li>
              <li className="list-group-item d-flex justify-content-between align-items-center">
                <span>Category3</span>
                <span className="item-amount badge badge-primary badge-pill">1</span>
              </li>
            </ul>
          </div>
        </div>

        {/* products */}
        <div className="col-md-9">
          <div className="row">
            {products.map((product) => {
              return(

                <div className="col-6 col-md-3" key={product.id}>
                  <div className="card border-0 mb-4 position-relative position-relative" style={{ width: "100%" }}>
                    <div className="ratio ratio-1x1">
                      <img src={product.imageUrl} className="card-img-top rounded-0 productImage" alt={product.title}/>
                    </div>
                    <a href="#" className="text-dark">
                      <i className="bi bi-heart position-absolute" style={{right: '16px', top: '16px'}}></i>
                    </a>
                    <div className="card-body p-3">
                      <h2 className="card-title mb-0 mt-3"><a href="#">{product.title}</a></h2>
                      <p className="card-price text-muted mt-2">NT$ {product.price}</p>
                      <div className="add_to_cart">
                        <button type="button" className="btn btn-danger">Add to cart</button>
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
      <Pagination pagination={pagination} changePage={getProduct} />
     
    </div>
    </>
    )
}

export default Products;