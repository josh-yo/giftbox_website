    import { useOutletContext, Link } from "react-router-dom";
    import { useEffect } from "react";
    import axios from "axios";
    import CartItem from "../../components/CartItem";
    import '../../stylesheets/cart.css';

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
                        className='col-md-7 col-xl-6 bg-white py-5'
                        style={{minHeight: 'calc(100vh - 56px - 76px)'}}
                    >
                        <div className='d-flex justify-content-between'>
                            <h2 className='mt-2'>Your order</h2>
                        </div>

                        { cartData?.carts?.map((item) => {
                            return (
                            <div className='d-flex mt-4 bg-light' key={item.id}>
                                {/* photo */}
                                <Link to={`/product/${item.product_id}`} className="cart-item">
                                    <img
                                        src={item.product.imageUrl}
                                        alt=''
                                        className='object-cover'
                                    />
                                </Link>
                                
                                <div className='w-100 p-3 position-relative'>
                                    <button
                                        type="button"
                                        className='position-absolute btn'
                                        style={{ top: '12px', right: '10px' }}
                                        onClick={() => removeCartItem(item.id)}
                                    >
                                        <i className='bi bi-x-lg'></i>
                                    </button>
                                    {/* price */}
                                    <div className="d-flex align-items-center">
                                        <p className='mb-1 text-muted fw-bold specialPrice' style={{ fontSize: '14px' }}>
                                            ${item.product.price}
                                        </p>
                                        <small className='mb-1 text-muted originalPrice'>
                                            $ {item.product.origin_price}
                                        </small>
                                    {/* product title */}
                                    </div>
                                    <Link to={`/product/${item.product_id}`} className="cart-item">
                                        <p className='mb-0 fw-bold'>{item.product.title}</p>
                                    </Link>
                                    {/* QTY Button */}
                                    <div className='d-flex justify-content-between align-items-center w-100'>
                                        <div className='input-group align-items-center QTYcontainer'>
                                            <div>QTY：</div>
                                            <CartItem 
                                                cartQuantity={item.qty} 
                                                increaseQuantity={() => updateCartItem(item, item.qty + 1)}
                                                decreaseQuantity={() => updateCartItem(item, item.qty - 1)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            );
                        })}
                    </div>

                    <div className='col-md-5 col-xl-4 bg-white py-5'>
                        <div className="orderInfo">
                            <div className='d-flex justify-content-between mt-4'>
                                <p className='mb-0 fw-bold'>Subtotal</p>
                                <p className='mb-0 fw-bold'>AUD${cartData?.final_total}</p>
                            </div>
                            <div className='d-flex justify-content-between mt-4'>
                                <p className='mb-0 fw-bold'>Shipping</p>
                                <p className='mb-0 fw-bold'>FREE</p>
                            </div>
                            <a
                                href='./checkout.html'
                                className='btn btn-success w-100 mt-4 rounded-0 py-3'
                            >
                                Confirm
                            </a>
                        </div>
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