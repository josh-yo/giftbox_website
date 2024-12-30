import { Link } from 'react-router-dom';
import { useState } from 'react';

function HoverImage({ product }){
    const [hoverImage, setHoverImage] = useState(product.imageUrl);

    return(<>
        <div 
            className="image-container"
            onMouseEnter={() => setHoverImage(product.imagesUrl[0])}
            onMouseLeave={() => setHoverImage(product.imageUrl)}
        >
            <Link to={`/product/${product.id}`} className="ratio ratio-4x3">
            <img src={hoverImage} className="product-image card-img-top rounded-0" alt={product.title}/>
            </Link>
        </div>
    </>)
}

export default HoverImage;