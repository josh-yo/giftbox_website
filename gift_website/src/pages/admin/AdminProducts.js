import { useEffect } from "react";
import axios from "axios";
function AdminProducts() {

    useEffect(() =>{
        (async() =>{
            const productRes = await axios.get(`/v2/api/${process.env.REACT_APP_API_PATH}/admin/products/all`);
            console.log(productRes);
        })();
    }, [])
    
    return (
        <div className='p-3'>
        <h3>Product List</h3>
        <hr />
        <div className='text-end'>
            <button type='button' className='btn btn-primary btn-sm'>
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
            <tr>
                <td>Category</td>
                <td>Name</td>
                <td>Price</td>
                <td>Active</td>
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
            </tr>
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