function CartItem({ cartQuantity, increaseQuantity, decreaseQuantity }){
    return(<>
        {/* <div className="cartContainer"> */}
            {/* <div className="input-group-prepend"> */}
                <button className="btn border-0 py-2" type="button" id="button-addon1"
                onClick={decreaseQuantity}
                >
                <i className="bi bi-dash"></i>
                </button>
            {/* </div> */}
            <input type="number" className="form-control border-0 text-center my-auto shadow-none bg-light" placeholder="" aria-label="Example text with button addon" aria-describedby="button-addon1" 
            value={cartQuantity} readOnly 
            />
            {/* <div className="input-group-append"> */}
                <button className="btn border-0 py-2" type="button" id="button-addon2" 
                onClick={increaseQuantity}
                >
                <i className="bi bi-plus"></i>
                </button>
            {/* </div> */}
        {/* </div> */}
    </>)
}

export default CartItem;

// Notes:
// - Controls product quantity via buttons.
// - `increaseQuantity` and `decreaseQuantity` functions are passed from parent components.
// - Does not handle state directly.