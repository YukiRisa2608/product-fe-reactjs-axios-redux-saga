import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../store/actions/CartActions';
import {
    MDBBtn,
    MDBCard,
    MDBCardBody,
    MDBCardImage,
    MDBCol,
    MDBContainer,
    MDBIcon,
    MDBInput,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, items = [], error, orderId } = useSelector(state => state.cart || {});
    const [isBuy, setIsBuy] = useState(false);

    const [totalMoney, setTotalMoney] = useState(0)

    useEffect(() => {
        dispatch(CartActions.getCartItemsRequest());
        setIsBuy(false);
    }, [dispatch]);

    useEffect(() => {
        setTotalMoney(
            items.reduce((acc, current) => {
                return acc + current.product.price * current.quantity
            }, 0)
        )
    }, [items, dispatch]);

    //delete
    const handleRemoveItemInCart = (productId) => {
        dispatch(CartActions.removeItemInCartRequest(productId));
    };

    //+- quantity
    const handleUpdateQuantity = (item, value) => {
        dispatch(CartActions.updateQuantityRequest({
            productId: item.product.id,
            quantity: value
        }))
    }

    //payment
    const handlePayment = () => {
        dispatch(CartActions.purchaseRequest({}));
        setIsBuy(true);
    }

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error: {error}</div>;

    const handleSearch = (keyword) => {
        console.log(`search in cart with key ${keyword}`)
    }

    useEffect(() => {
        if (orderId && isBuy) {
            navigate(`/customer/order?id=${orderId}`)
        }
    }, [orderId]);

    return (
        <>
            <Navbar handleSearch={handleSearch} />
            <section className="h-100" >
                <MDBContainer fluid className="py-3 ">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <MDBTypography tag="h3" className="fw-normal mb-3 text-black">
                                Shopping Cart
                            </MDBTypography>
                            {items.length > 0 ? items.map((item, index) => (
                                <MDBCard className="rounded-3 mb-1" key={item.id}>
                                    <MDBCardBody className="p-4">
                                        <MDBRow className="justify-content-between align-items-center">
                                            <MDBCol md="2" lg="2" xl="2">
                                                <MDBCardImage className="rounded-3" fluid src={item.product.imgUrl} alt={item.product.productName} />
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="3">
                                                <p className="lead fw-normal mb-2">{item.product.productName}</p>
                                                <p><span className="text-muted">Price: $</span>{item.product.price}</p>
                                            </MDBCol>
                                            <MDBCol md="3" lg="3" xl="2" className="d-flex align-items-center justify-content-around">
                                                <MDBBtn color="link" className="px-2" onClick={() => handleUpdateQuantity(item, -1)}>
                                                    <MDBIcon fas icon="minus" />
                                                </MDBBtn>

                                                <MDBInput value={item.quantity} type="number" size="sm" style={{ width: '65px' }} onChange={() => { }} />

                                                <MDBBtn color="link" className="px-2" onClick={() => handleUpdateQuantity(item, 1)}>
                                                    <MDBIcon fas icon="plus" />
                                                </MDBBtn>
                                            </MDBCol>
                                            <MDBCol md="3" lg="2" xl="2" className="offset-lg-1">
                                                <MDBTypography tag="h5" className="mb-0">
                                                    ${item.product.price * item.quantity}
                                                </MDBTypography>
                                            </MDBCol>
                                            <MDBCol md="1" lg="1" xl="1" className="text-end">
                                                <MDBBtn color="link" className="p-0" onClick={() => handleRemoveItemInCart(item.product.id)}>
                                                    <MDBIcon fas icon="trash" size="lg" className="text-danger" />
                                                </MDBBtn>
                                            </MDBCol>
                                        </MDBRow>

                                    </MDBCardBody>
                                </MDBCard>
                            )) : <div>Your cart is empty</div>}
                            <div className="d-flex justify-content-end">
                                <p className="mb-0 me-5 d-flex align-items-center">
                                    <span className="small text-muted me-2">Order total:</span>
                                    <span className="lead fw-normal">${totalMoney}
                                    </span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <MDBBtn color="light" size="lg" className="me-2">
                                    Continue shopping
                                </MDBBtn>
                                <MDBBtn size="lg" onClick={handlePayment}>BUY NOW</MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
};

export default Cart;
