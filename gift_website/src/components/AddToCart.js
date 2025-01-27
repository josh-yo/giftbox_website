import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

/**
 * Add product to cart
 * @param {string} productId - Product ID
 * @param {number} cartQuantity - Item quantity
 * @param {Function} getCart - Function to refresh shopping cart data
 * @param {Function} setTriggerAnimation - Set animation effect
 * @param {string} productSelector - DOM selector for product images
 */
export const addToCart = async (productId, cartQuantity, getCart, setTriggerAnimation, productSelector, productTitle) => {
  const data = {
    data: {
      product_id: productId,
      qty: cartQuantity,
    },
  };

  try {
    await axios.post(`/v2/api/${process.env.REACT_APP_API_PATH}/cart`, data);
    getCart();
    toast.success(
      <>
        <span className="toast-product-title">{productTitle} successfully added to the cart!</span>
      </>,
    {
      position: 'top-center',
      autoClose: 1900,
    });
    // accroding to the product image, set the trigger animation
    const productImage = document.querySelector(productSelector);
    
    if (!productImage) {
        console.warn('❌ Failed to select product image. Please check the product.');
        return;
    }

    if (setTriggerAnimation) {
        if ( productImage ){
            setTriggerAnimation({
                imageUrl: productImage.src,
                rect: productImage.getBoundingClientRect(),
            });
            // clear animation
            setTimeout(() => {
                setTriggerAnimation(null);
            }, 1500);
        } else {
            console.error('Product image not found for animation!');
        }
    }
  } catch (error) {
    console.error('Failed to add product to the cart:', error, setTriggerAnimation );
    toast.error('Failed to add product to the cart');
  }
};
