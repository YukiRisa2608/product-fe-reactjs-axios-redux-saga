import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../store/actions/CartActions';

const Cart = () => {
    const dispatch = useDispatch();
    const { loading, items = [], error } = useSelector(state => state.cart || {});

    useEffect(() => {
        dispatch(CartActions.getCartItemsRequest());
    }, [dispatch]);

    const handleUpdateQuantity = (item, value) => {
        dispatch(CartActions.updateQuantityRequest({
            productId: item.product.id,
            quantity: value
        }))
        console.log(item);
    }

    const handlePayment = () => {
        dispatch(CartActions.purchaseRequest({}));
    }

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <>
            <div>
                {items.length > 0 && items.map((item, index) => (
                    <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <p>{index + 1}</p>
                        <p>{item.product.productName}</p>
                        <p>{item.product.price}</p>
                        <p>{item.quantity}</p>
                        <p>{item.product.price * item.quantity}</p>
                        <div>
                            <button onClick={() => handleUpdateQuantity(item, 1)}>Tawng</button>
                            <button onClick={() => handleUpdateQuantity(item, -1)}>Giam</button>
                        </div>
                    </div>
                ))}

            </div>

            <button onClick={handlePayment}>Thanh toan</button>

        </>
    );
};

export default Cart;
