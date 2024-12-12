import { useEffect, useState, useRef } from "react";
import axios from "axios";
import ProductModal from "../../components/ProductModal";
import DeleteModal from "../../components/DeleteModal";
import Pagination from "../../components/Pagination";
import { Modal } from "bootstrap";

function AdminProducts() {
    const [products, setProducts] = useState([]);
    const [pagination, setPagination] = useState({});

    const [type, setType] = useState('create');
    const [tempProduct, setTempProduct] = useState({});

    const productModal = useRef(null);
    const deleteModal = useRef(null);


    useEffect(() =>{
        productModal.current = new Modal("#productModal", {
            backdrop: 'static',
        });
        deleteModal.current = new Modal("#deleteModal", {
            backdrop: 'static',
        });

        addProduct();
    }, [])

    const addProduct = async( page = 1) => {
        (async() =>{
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products?page=${page}`);
            setProducts(productRes.data.products);
            setPagination(productRes.data.pagination);
        })();
    }

    // Use the type variable to determine whether the modal is in create or edit mode
    const openProductModal = (type, product) => {
        setType(type);
        setTempProduct(product);
        productModal.current.show();
    }
    const closeProductModal = () => {
        productModal.current.hide();
    }

    // Delete products's modal
    const openDeletetModal = (product) => {
        setTempProduct(product);
        deleteModal.current.show();
    }
    const closeDeletetModal = () => {
        deleteModal.current.hide();
    }
    const deleteProduct = async(id) => {
        try {
            const result = await axios.delete (`/v2/api/${process.env.REACT_APP_API_PATH}/admin/product/${id}`);
            if(result.data.success){
                addProduct();
                deleteModal.current.hide();
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    return (
        <div className='p-3'>
        <ProductModal 
            closeProductModal={closeProductModal} 
            addProduct={addProduct}
            tempProduct={tempProduct}
            type={type}
        />
        <DeleteModal
            close={closeDeletetModal}
            text={tempProduct.title}
            handleDelete={deleteProduct}
            id={tempProduct.id}
        />
        <h3>Product List</h3>
        <hr />
        <div className='text-end'>
            <button 
                type='button' 
                className='btn btn-primary btn-sm' 
                onClick={() => openProductModal('create', {})}
            >
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
                    <td>{product.is_enabled ? 'Enabled' : 'Disabled'}</td>
                    <td>
                    <button 
                        type='button' 
                        className='btn btn-primary btn-sm'
                        onClick={() => openProductModal('edit', product)}
                    >
                        Edit
                    </button>
                    <button
                        type='button'
                        className='btn btn-outline-danger btn-sm ms-2'
                        onClick={()=>openDeletetModal(product)}
                    >
                        Delete
                    </button>
                    </td>
                </tr>)
            })}
            
            </tbody>
        </table>
        <Pagination pagination={pagination} changePage={addProduct} />
        </div>
    );
    }
export default AdminProducts;