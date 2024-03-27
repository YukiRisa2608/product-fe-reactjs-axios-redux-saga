import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../store/actions/OrderActions';
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
import { useSearchParams } from 'react-router-dom/dist';

const OrderDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalMoney, setTotalMoney] = useState(0)
    console.log(searchParams.get("id"))

    const dispatch = useDispatch();
    const { loading, data = null, error } = useSelector(state => state.order || {});

    useEffect(() => {
        dispatch(OrderActions.getOrderRequest(searchParams.get("id")))
    }, []);

    console.log("data: ", data)

    return (
        <>
            <section className="h-100" >
                <MDBContainer fluid className="py-3 ">
                    <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol md="10">
                            <MDBTypography tag="h3" className="fw-normal mb-3 text-black">
                                Order
                            </MDBTypography>
                            {data && (
                                <>
                                    <div>
                                        {
                                            data.listProduct.map((item) => {
                                                let pItem = JSON.parse(item);
                                                return <div>
                                                    <span>{pItem.productName} </span>
                                                    <span>{pItem.quantity} </span>
                                                </div>
                                            })
                                        }
                                    </div>
                                    <p>createdDate: {data.createdDate}</p>
                                </>
                            )}
                            <div className="d-flex justify-content-end">
                                <p className="mb-0 me-5 d-flex align-items-center">
                                    <span className="small text-muted me-2">Order total:</span>
                                    <span className="lead fw-normal">${data.money}
                                    </span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <MDBBtn color="light" size="lg" className="me-2">
                                    Continue shopping
                                </MDBBtn>
                            </div>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </section>
        </>
    );
};

export default OrderDetail;
