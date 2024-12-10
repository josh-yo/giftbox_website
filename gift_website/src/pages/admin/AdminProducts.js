import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import { Modal } from "bootstrap";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const productModal = useRef(null);

    useEffect(() =>{
        productModal.current = new Modal("#productModal", {
            backdrop: 'static',
        });

        addProduct();
    }, [])

    const addProduct = async() => {
        (async() =>{
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products`);
            setProducts(productRes.data.products);
            setPagination(productRes.data.pagination);
        })();
    }

    const openProductModal = () => {
        productModal.current.show();
    }
    const closeProductModal = () => {
        productModal.current.hide();
    }
    
    return (
        <div className='p-3'>
        <ProductModal closeProductModal={closeProductModal} addProduct={addProduct}/>
        <h3>Product List</h3>
        <hr />
        <div className='text-end'>
            <button type='button' className='btn btn-primary btn-sm' onClick={openProductModal}>
            Create New Product
            </button>
        </div>
        <table className='table'>
            <thead>
            <tr>
                <th scope='col'>Category</th>
                <th scope='col'>Name</th>
                <th scope='col'>Price</th>
                <th scope='col'>Status</th>
                <th scope='col'>Edit</th>
            </tr>
            </thead>
            <tbody>
            {products.map((product) => {
                return (<tr key={product.id}>
                    <td>{product.category}</td>
                    <td>{product.title}</td>
                    <td>{product.price}</td>
                    <td>{product.is_enabled ? 'Active' : 'Inactive'}</td>
                    <td>
                    <button type='button' className='btn btn-primary btn-sm'>
                        Edit
                    </button>
                    <button
                        type='button'
                        className='btn btn-outline-danger btn-sm ms-2'
                    >
                        Delete
                    </button>
                    </td>
                </tr>)
            })}
            
            </tbody>
        </table>
        <nav aria-label='Page navigation example'>
            <ul className='pagination'>
            <li className='page-item'>
                <a className='page-link disabled' href='/' aria-label='Previous'>
                <span aria-hidden='true'>&laquo;</span>
                </a>
            </li>
            {[...new Array(5)].map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className='page-item' key={`${i}_page`}>
                <a className={`page-link ${i + 1 === 1 && 'active'}`} href='/'>
                    {i + 1}
                </a>
                </li>
            ))}
            <li className='page-item'>
                <a className='page-link' href='/' aria-label='Next'>
                <span aria-hidden='true'>&raquo;</span>
                </a>
            </li>
            </ul>
        </nav>
        </div>
    );
    }
export default AdminProducts;