import React, { useEffect, useState } from 'react';
import {
    MDBBtn,
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
    MDBCheckbox,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as AuthActions from '../store/actions/AuthActions';

function Signup() {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [payload, setPayload] = useState({ username: 'test', password: '11111111', email: 'test@gmail.com' })
    const { loading, data = {}, error, signupSucess } = useSelector(state => state.auth || {});

    const handleChangeUsername = (e) => setPayload({ ...payload, username: e.target.value });
    const handleChangePassword = (e) => setPayload({ ...payload, password: e.target.value });
    const handleChangeEmail = (e) => setPayload({ ...payload, email: e.target.value });

    const handleSignup = () => {
        dispatch(AuthActions.signupRequest(payload))
        navigate("/login")
    }

    useEffect(() => {
        if (signupSucess) {
            console.log("Signup oke")
            navigate("/login")
        }
    }, [signupSucess])

    return (
        <MDBContainer fluid className='p-4'>

            <MDBRow>

                <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>

                    <h1 className="my-5 display-3 fw-bold ls-tight px-3">
                        The best offer <br />
                        <span className="text-primary">for your business</span>
                    </h1>

                    <p className='px-3' style={{ color: 'hsl(217, 10%, 50.8%)' }}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Eveniet, itaque accusantium odio, soluta, corrupti aliquam
                        quibusdam tempora at cupiditate quis eum maiores libero
                        veritatis? Dicta facilis sint aliquid ipsum atque?
                    </p>

                </MDBCol>

                <MDBCol md='6'>

                    <MDBCard className='my-5'>
                        <MDBCardBody className='p-5'>

                            <MDBInput wrapperClass='mb-4' label='Username' id='form1' type='text' value={payload.username} onChange={handleChangeUsername} />
                            <MDBInput wrapperClass='mb-4' label='Email' id='form2' type='email' value={payload.email} onChange={handleChangeEmail} />
                            <MDBInput wrapperClass='mb-4' label='Password' id='form3' type='password' value={payload.password} onChange={handleChangePassword} />

                            <div className='d-flex justify-content-center mb-4'>
                                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
                            </div>

                            <MDBBtn className='w-100 mb-4' size='md' onClick={handleSignup} >sign up</MDBBtn>

                            <div className="text-center">

                                <p>or sign up with:</p>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='facebook-f' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='twitter' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='google' size="sm" />
                                </MDBBtn>

                                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                                    <MDBIcon fab icon='github' size="sm" />
                                </MDBBtn>

                            </div>

                            <MDBBtn className='w-100 mb-4' size='md' onClick={() => navigate("/login")}>Login</MDBBtn>

                        </MDBCardBody>
                    </MDBCard>

                </MDBCol>

            </MDBRow>

        </MDBContainer>
    );
}

export default Signup;