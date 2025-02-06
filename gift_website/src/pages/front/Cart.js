    import { useOutletContext, Link, NavLink } from "react-router-dom";
    import { useEffect, useState } from "react";
    import { ToastContainer, toast } from 'react-toastify';
    import { OrbitProgress } from "react-loading-indicators";
    import axios from "axios";
    import CartItem from "../../components/CartItem";
    import '../../stylesheets/cart.css';

    function Cart() {
        // Cart Animation
        const [ activeAnimation, setActiveAnimation ] = useState({});
        const [ clearAnimation, setClearAnimation ] = useState(false);

        const { cartData, setCartData, getCart } = useOutletContext();
        // Remove an item from the cart by ID
        const removeCartItem = async ( id ) => {
            try {
                const result = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${id}`);
                getCart();
            } catch (error) {
                console.log(error);
            }
        }
        
        // Clear the cart
        const clearCart = async ( id ) => {
            // If the user cancels, stop execution early.
            if (!window.confirm("Oops! You’re about to clear your cart. Do you want to continue?")) {
                return;
            }

            try {
                setClearAnimation(true);
                const result = await axios.delete(`/v2/api/${process.env.REACT_APP_API_PATH}/carts`);
                setCartData({ carts: [] });
            } catch (error) {
                console.log(error);
                toast.error("Failed to clear cart. Please try again.");
            } finally {
                setClearAnimation(false);
            }
        }

        // Update cart item quantity
        const updateCartItem = async ( item, quantity, id ) => {
            // setActiveAnimation(id);
            setActiveAnimation((prevState) => ({
                ...prevState,
                [id]: true,
            }));

            // Reset animation state after 2.8 seconds
            setTimeout(() => {
                setActiveAnimation((prevState) => ({
                    ...prevState,
                    [id]: false,
                }));
            }, 2900);

            const data = {
                data: {
                product_id: item.product_id,
                qty: quantity,
                }
            }
            // When the quantity is less than 1, ask for confirmation
            if (quantity < 1) {
                checkRemoveItem(item, false);
                return;
            }
            try {
                const result = await axios.put(`/v2/api/${process.env.REACT_APP_API_PATH}/cart/${item.id}`, data);
                getCart();
                toast.success(
                    <>
                      <span className="toast-product-title">{item.product.title} quantity updated!</span>
                    </>,
                  {
                    position: 'top-center',
                    autoClose: 2000,
                });

            } catch (error) {
                console.log(error);
            }
        }
        // When the quantity is less than 1 or click the delete button, ask for confirmation
        const checkRemoveItem = async ( item, forceRemove = false ) => {
            const confirmDelete = window.confirm(`Are you sure about removing "${item.product.title}"?`);
            
            if (confirmDelete) {
                removeCartItem(item.id);
                toast.success(`"${item.product.title}" has been removed from your cart.`,{
                    position: 'top-center',
                    autoClose: 2000,
                });
            }else{
                toast.info(`"${item.product.title}" was not removed.`,{
                    position: 'top-center',
                    autoClose: 2000,
                });
            }
        }

        return(<>
            <div className='container'>
                <div className='row justify-content-center'>
                    <div className='col-md-7 col-xl-6 bg-white py-5'>
                        <div className='d-flex justify-content-between align-items-end'>
                            <h2 className='order-title'>Your order</h2>
                            {cartData?.carts?.length > 1 && (
                                <p className='cleanAll-btn' onClick={clearCart}>
                                    <i className="bi bi-trash mx-2"></i>
                                    Clear Cart
                                </p>
                            )}
                        </div>

                        <div className="cart-item-container position-relative">
                            { clearAnimation && (
                                <div className="clear-cart-bg">
                                    <div className="cart-loading-animation">
                                        <OrbitProgress variant="spokes" color={["#FCCA00"]} size="medium" text="" textColor="" />
                                    </div>
                                </div>
                            )}
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
                                        { activeAnimation[item.id] && (
                                            <div className="cart-loading-bg">
                                                <div className="cart-loading-animation">
                                                    <OrbitProgress variant="spokes" color={["#FCCA00"]} size="medium" text="" textColor="" />
                                                </div>
                                            </div>
                                        )}
                                        <button
                                            type="button"
                                            className='position-absolute btn'
                                            style={{ top: '12px', right: '10px' }}
                                            onClick={() => checkRemoveItem(item)}
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
                                                    increaseQuantity={() => updateCartItem(item, item.qty + 1, item.id)}
                                                    decreaseQuantity={() => updateCartItem(item, item.qty - 1, item.id)}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                );
                            })}
                        </div>
                        
                        {/* Show shop more button when cart empty */}
                        {cartData?.carts?.length < 1 && (
                            <div className='d-flex mt-4 empty-bg'>
                                <div className='w-100 position-relative'>
                                    <p className="empty-text">Your cart is empty.</p>
                                    <div className="add_to_cart">
                                        <button type="button" className="btn btn-success cart-button">
                                            <div className="d-flex justify-content-center align-items-center">
                                                <i className="bi bi-cart4 cart-icon"></i>
                                                <NavLink className="cart-content" to="/products">
                                                    <p className="">Head to the shop !</p>
                                                </NavLink>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='col-md-5 col-xl-4 bg-white py-5 subtotal'>
                        {/* No show subtotal when cart is empty */}
                        {cartData?.carts?.length > 0 && (
                            <div className="orderInfo">
                                <div className='d-flex justify-content-between mt-4'>
                                    <p className='mb-0 fw-bold'>Subtotal</p>
                                    <p className='mb-0 fw-bold'>AUD${cartData?.final_total}</p>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <p className='mb-0 fw-bold'>Shipping</p>
                                    <p className='mb-0 fw-bold'>FREE</p>
                                </div>
                                <hr className="my-4" />
                                <div className='d-flex justify-content-between mt-4'>
                                    <p className='mb-0 fw-bold'>Total</p>
                                    <p className='mb-0 fw-bold'>AUD${cartData?.final_total}</p>
                                </div>
                                <div className='d-flex justify-content-between mt-4'>
                                    <p className='mb-0'>We currently process orders manually. <br />Contact us to place your order.</p>
                                </div>
                                <NavLink className="cart-content btn btn-success w-100 mt-4 rounded-0 py-3" to="/contact">
                                    <p className="">Place Order</p>
                                </NavLink>
                            </div>
                        )}
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