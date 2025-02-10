import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

function HoverImage({ product }){
    const [hoverImage, setHoverImage] = useState(product?.imageUrl);

    useEffect(() => {
        if (product?.imageUrl) {
            setHoverImage(product.imageUrl);
        }
    }, [product?.imageUrl]);

    return(<>
        <div 
            className="image-container"
            // PC Device
            onMouseEnter={() => setHoverImage(product.imagesUrl[0])}
            onMouseLeave={() => setHoverImage(product.imageUrl)}
            // Mobile Device
            onTouchStart={() => setHoverImage(product.imagesUrl[0])}
            onTouchEnd={() => setHoverImage(product.imageUrl)}
        >
            <Link to={`/product/${product.id}`} className="" data-product-id={product.id}>
                <img src={hoverImage} className="product-image card-img-top rounded-0" alt={product.title}/>
            </Link>
        </div>
    </>)
}

export default HoverImage;