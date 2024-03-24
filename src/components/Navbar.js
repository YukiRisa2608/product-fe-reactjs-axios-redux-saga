import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storageService from '../utils/storage.service';
import { AuthKeys } from '../utils/constant';
import * as AuthActions from '../store/actions/AuthActions';
import { MDBRow, MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";


// Trong component thì nên viết function.
function Navbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // let isLogin = props.isLogin

    const { data } = useSelector(state => state.auth || {});
    const [isLogin, setIsLogin] = useState(false);
    const [searchContent, setSearchContent] = useState("");

    let navigateCart = () => {
        navigate('../customer/cart')
    }

    const handleLogout = () => {
        dispatch(AuthActions.logoutRequest())
        navigate("/login")
    }

    const handleLogin = () => {
        navigate("/login")
    }

    useEffect(() => {
        setIsLogin(storageService.get(AuthKeys.LOGGED_IN) === 'true')
    }, [data]);

    // handleSearch
    console.log(searchContent)

    const isShowCart = isLogin && !window.location.href.includes('cart') && !window.location.href.includes('admin')

    return (
        <MDBRow className="bg-danger py-5" >
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingRight: 50 }}>
                <h2>Navbar</h2>
                <div style={{display: 'flex', flexDirection:'row'}}>
                    {props.handleSearch && 
                    <MDBInputGroup>
                        <MDBInput value={searchContent} label='Search' onChange={(event) => {setSearchContent(event.target.value)}} />
                        <MDBBtn onClick={props.handleSearch} rippleColor='dark'>
                            <MDBIcon icon='search' />
                        </MDBBtn>
                    </MDBInputGroup>
                    }

                    {isShowCart &&
                        <button onClick={navigateCart}>Cart </button>
                    }
                    {isLogin ?
                        <button onClick={handleLogout}>Logout</button> :
                        <button onClick={handleLogin}>Login</button>
                    }
                </div>
            </div>
        </MDBRow>

    );
}

export default Navbar;
