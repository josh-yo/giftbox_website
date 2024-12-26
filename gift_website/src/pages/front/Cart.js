    import { useOutletContext } from "react-router-dom";
    import axios from "axios";
    import CartItem from "../../components/CartItem";

    function Cart() {
        const { cartData, getCart } = useOutletContext();
        // Remove an item from the cart by ID
        const removeCartItem = async ( id ) => {
            try {
                const result = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
                getCart();
            } catch (error) {
                console.log(error);
            }
        }
        // Update cart item quantity
        const updateCartItem = async ( item, quantity ) => {
            const data = {
                data: {
                product_id: item.product_id,
                qty: quantity,
                }
            }
            try {
                const result = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data);
                getCart();
            } catch (error) {
                console.log(error);
            }
        }

        return(<>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div
                    className='col-md-6 bg-white py-5'
                    style={{minHeight: 'calc(100vh - 56px - 76px)'}}
                    >
                    <div className='d-flex justify-content-between'>
                        <h2 className='mt-2'>Your order</h2>
                    </div>
                    { cartData?.carts?.map((item) => {
                        return (
                        <div className='d-flex mt-4 bg-light' key={item.id}>
                            <img
                            src={item.product.imageUrl}
                            alt=''
                            className='object-cover'
                            style={{
                                width: '120px',
                            }}
                            />
                            <div className='w-100 p-3 position-relative'>
                            <button
                                type="button"
                                className='position-absolute btn'
                                style={{ top: '12px', right: '10px' }}
                                onClick={() => removeCartItem(item.id)}
                            >
                                <i className='bi bi-x-lg'></i>
                            </button>
                            <p className='mb-0 fw-bold'>{item.product.title}</p>
                            <p className='mb-1 text-muted' style={{ fontSize: '14px' }}>
                                {item.product.content}
                            </p>
                            <div className='d-flex justify-content-between align-items-center w-100'>
                                <div className='input-group w-50 align-items-center'>
                                    <CartItem 
                                        cartQuantity={item.qty} 
                                        increaseQuantity={() => updateCartItem(item, item.qty + 1)}
                                        decreaseQuantity={() => updateCartItem(item, item.qty - 1)}
                                    />
                                </div>
                                <p className='mb-0 ms-auto'>AUD${item.final_total}</p>
                            </div>
                            </div>
                        </div>
                        );
                    })}
                    <div className='d-flex justify-content-between mt-4'>
                        <p className='mb-0 h4 fw-bold'>Total</p>
                        <p className='mb-0 h4 fw-bold'>AUD${cartData?.final_total}</p>
                    </div>
                    <a
                        href='./checkout.html'
                        className='btn btn-dark w-100 mt-4 rounded-0 py-3'
                    >
                        Confirm
                    </a>
                    </div>
                </div>
            </div>
        </>)
    }

    export default Cart;

// Notes:
// - Displays cart items and allows quantity updates and item removal.
// - Updates the cart using `updateCartItem` and refreshes with `getCart`.
// - Uses `CartItem` for quantity controls.