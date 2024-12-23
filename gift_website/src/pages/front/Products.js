import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Pagination from "../../components/Pagination";
import CategoryFilter from "../../components/CategoryFilter";
import '../../stylesheets/products.css'

function Products(){
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
        <CategoryFilter/>

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
                      <h2 className="card-title mb-0 mt-3"><Link to={`/product/${product.id}`}
                      >{product.title}</Link></h2>
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
      <Pagination pagination={pagination} changePage={getProducts} />
     
    </div>
    </>
    )
}

export default Products;