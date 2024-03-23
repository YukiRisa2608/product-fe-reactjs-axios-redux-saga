import React, { useEffect, useState } from 'react';
import {
    MDBContainer,
    MDBInput,
    MDBCheckbox,
    MDBBtn,
    MDBIcon
}
    from 'mdb-react-ui-kit';
import { useDispatch, useSelector } from 'react-redux';
import * as AuthActions from '../store/actions/AuthActions'
import { Link, useNavigate } from 'react-router-dom';
import { AuthKeys } from '../utils/constant';

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const [payload, setPayload] = useState({ username: 'admin', password: '11111111' })
    const { loading, data = {}, error } = useSelector(state => state.auth || {});

    const handleChangeUsername = (e) => setPayload({ ...payload, username: e.target.value });
    const handleChangePassword = (e) => setPayload({ ...payload, password: e.target.value });

    const handleLogin = () => {
        dispatch(AuthActions.loginRequest(payload))
    }

    useEffect(() => {
        console.log("Login data changed", data)
        if (data && data.role && data.role.includes(AuthKeys.ROLE_ADMIN)) {
            navigate('/admin/category')
            console.log("Navigate to admin page");
        } else if (data && data.role && data.role.includes(AuthKeys.ROLE_USER)) {
            navigate("/home")
            console.log("Navigate to user page");
        }
    }, [data])


    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <MDBContainer className="p-3 my-5 d-flex flex-column w-50">

            <MDBInput wrapperClass='mb-4'
                label='Username'
                id='form1'
                type='text'
                value={payload.username}
                onChange={handleChangeUsername}
            />
            <MDBInput wrapperClass='mb-4'
                label='Password'
                id='form2'
                type='password'
                value={payload.password}
                onChange={handleChangePassword}
            />

            <div className="d-flex justify-content-between mx-3 mb-4">
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
                <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4" onClick={handleLogin}>Sign in</MDBBtn>

            <div className="text-center">
                <p>Not a member? <Link to="/signup">Register</Link></p>
                <p>or sign up with:</p>

                <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='facebook-f' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='twitter' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='google' size="sm" />
                    </MDBBtn>

                    <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
                        <MDBIcon fab icon='github' size="sm" />
                    </MDBBtn>

                </div>
            </div>

        </MDBContainer>
    );
}

export default Login;