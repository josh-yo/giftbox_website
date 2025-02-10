function CartItem({ cartQuantity, increaseQuantity, decreaseQuantity }){
    return(<> 
        <button className="btn border-0 py-2" type="button" id="button-addon1"
            onClick={decreaseQuantity}
        >
            <i className="bi bi-dash"></i>
        </button>
        
        <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-light" 
            placeholder="" 
            aria-label="Example text with button addon" 
            aria-describedby="button-addon1" 
            value={cartQuantity} 
            readOnly 
        />
        
        <button className="btn border-0 py-2" type="button" id="button-addon2" 
            onClick={increaseQuantity}
        >
            <i className="bi bi-plus"></i>
        </button>
    </>)
}

export default CartItem;

// Notes:
// - Controls product quantity via buttons.
// - `increaseQuantity` and `decreaseQuantity` functions are passed from parent components.
// - Does not handle state directly.