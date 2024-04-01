import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as OrderActions from '../store/actions/OrderActions';
import { useNavigate } from 'react-router-dom'; 
import {
    MDBTable,
    MDBTableBody,
    MDBTableHead,
    MDBBtn,
    MDBCol,
    MDBContainer,
    MDBRow,
    MDBTypography,
} from "mdb-react-ui-kit";
import { useSearchParams } from 'react-router-dom/dist';

const OrderDetail = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const [totalMoney, setTotalMoney] = useState(0)
    console.log(searchParams.get("id"))

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { loading, data = null, error } = useSelector(state => state.order || {});

    useEffect(() => {
        dispatch(OrderActions.getOrderRequest(searchParams.get("id")))
    }, []);

    console.log("data: ", data)

    return (
        <>
            <section className="h-100 " >
                <MDBContainer fluid className="py-3 d-flex justify-content-center align-items-center">
                    <MDBRow className="justify-content-center align-items-center h-100" style={{ width: '500px', backgroundColor: '#e9ecef', borderRadius: '15px', padding: '20px', maxWidth: '500px', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)' }}>
                        <MDBCol md="10">
                            <MDBTypography tag="h3" className="fw-normal mb-3 text-black">
                                Order Detail
                            </MDBTypography>
                            {data && (
                                // <>
                                //     <div>
                                //         {
                                //             data.listProduct.map((item) => {
                                //                 let pItem = JSON.parse(item);
                                //                 return <div>
                                //                     {/* <span>{pItem.productName} </span>
                                //                     <span> * {pItem.quantity} </span> */}
                                //                     <MDBTable>
                                //                         <MDBTableHead>
                                //                             <tr>
                                //                                 <th scope="col" className="fw-bold">Product Name</th>
                                //                                 <th scope="col" className="fw-bold">Quantity</th>
                                //                                 <th scope="col" className="fw-bold">Price</th>
                                //                             </tr>
                                //                         </MDBTableHead>
                                //                         <MDBTableBody>
                                //                             {data.listProduct.map((item, index) => {
                                //                                 let pItem = JSON.parse(item);
                                //                                 return (
                                //                                     <tr key={index}>
                                //                                         <td>{pItem.productName}</td>
                                //                                         <td>{pItem.quantity}</td>
                                //                                         <td>${pItem.price}</td>
                                //                                     </tr>
                                //                                 );
                                //                             })}
                                //                         </MDBTableBody>
                                //                     </MDBTable>

                                //                 </div>
                                //             })
                                //         }
                                //     </div>
                                //     <div className='p-3'>
                                //         <p>Order Date: {data?.createdDate}</p>
                                //     </div>
                                // </>
                                <>
                                <MDBTable>
                                    <MDBTableHead>
                                        <tr>
                                            <th scope="col" className="fw-bold">Product Name</th>
                                            <th scope="col" className="fw-bold">Quantity</th>
                                            <th scope="col" className="fw-bold">Price</th>
                                        </tr>
                                    </MDBTableHead>
                                    <MDBTableBody>
                                        {data.listProduct.map((item, index) => {
                                            let pItem = JSON.parse(item);
                                            return (
                                                <tr key={index}>
                                                    <td>{pItem.productName}</td>
                                                    <td>{pItem.quantity}</td>
                                                    <td>${pItem.price}</td>
                                                </tr>
                                            );
                                        })}
                                    </MDBTableBody>
                                </MDBTable>

                                <div className='p-3'>
                                    <p>Order Date: {data.createdDate}</p>
                                </div>
                            </>
                            )}
                            <div className="d-flex justify-content-end">
                                <p className="mb-0 me-5 d-flex align-items-center">
                                    <span className="fw-bold">Order total:</span>
                                    <span className="lead fw-normal">${data?.money}
                                    </span>
                                </p>
                            </div>
                            <div className="d-flex justify-content-end">
                                <MDBBtn color="light" size="lg" className="me-2" onClick={() => navigate("/home")}>
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
