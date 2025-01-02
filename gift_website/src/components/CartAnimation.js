import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import '../stylesheets/cartAnimation.css';

function CartAnimation({ cartIconRef, productRect, currentImageUrl }) {
  const [cartRect, setCartRect] = useState(null);

  useEffect(() => {
    // If not ready, return
    if (!productRect || !cartIconRef || !currentImageUrl) {
        console.warn('❌ Animation refs or currentImageUrl are not ready:', { productRect, cartIconRef, currentImageUrl });
        return;
    }

    // ✅ Get cart icon position
    const cartRect = cartIconRef?.current.getBoundingClientRect();
    setCartRect(cartRect);

    // Create a flying element
    const flyingElement = document.createElement('div');
    flyingElement.className = 'flying-animation';
    flyingElement.style.position = 'fixed';
    flyingElement.style.left = `${productRect.left}px`;
    flyingElement.style.top = `${productRect.top}px`;
    flyingElement.style.width = `${productRect.width}px`;
    flyingElement.style.height = `${productRect.height}px`;
    flyingElement.style.backgroundImage = `url(${currentImageUrl})`;
    flyingElement.style.backgroundSize = 'cover';
    flyingElement.style.backgroundRepeat = 'no-repeat';
    flyingElement.style.zIndex = 1000;
    document.body.appendChild(flyingElement);

    // Trigger animation
    requestAnimationFrame(() => {
        setTimeout(() => {
            flyingElement.style.transform = `translate(${cartRect.left - productRect.left}px, ${cartRect.top - productRect.top}px)`;
            flyingElement.style.width = '50px';
            flyingElement.style.height = '50px';
            flyingElement.style.opacity = '0.5';
            console.log('✅ Animation triggered');
        }, 0);
    });

    // Clear flying element after animation
    flyingElement.addEventListener('transitionend', () => {
        console.log('✅ Animation ended');
        flyingElement.remove();
    });

    return () => {
        flyingElement.removeEventListener('transitionend', () => flyingElement.remove());
        if (document.body.contains(flyingElement)) {
            flyingElement.remove();
        }
    };

  }, [cartIconRef, cartIconRef, currentImageUrl]);

  return null;
}

CartAnimation.propTypes = {
    cartIconRef: PropTypes.object.isRequired,
    productRect: PropTypes.object.isRequired,
    currentImageUrl: PropTypes.string.isRequired,
};

export default CartAnimation;
