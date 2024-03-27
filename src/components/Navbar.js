import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storageService from '../utils/storage.service';
import { AuthKeys } from '../utils/constant';
import * as AuthActions from '../store/actions/AuthActions';
import { MDBRow, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu } from "mdb-react-ui-kit";


// Trong component thì nên viết function.
function Navbar(props) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    // let isLogin = props.isLogin

    const { data } = useSelector(state => state.auth || {});
    const [isLogin, setIsLogin] = useState(false);
    const [searchContent, setSearchContent] = useState("");
    const [user, setUser] = useState({});

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
        setUser(JSON.parse(storageService.get(AuthKeys.CURRENT_USER)))
    }, [data]);

    // handleSearch
    console.log(searchContent)

    const isShowCart = isLogin && !window.location.href.includes('cart') && !window.location.href.includes('admin')

    return (
        <MDBRow className=" py-5" style={{ backgroundColor: "#fdccbc" }} >

            <div class="d-flex flex-row justify-content-between pe-5 gap-3 padding-left 3"  >
                {/* Filler category */}
                <MDBDropdown>
                    <MDBDropdownToggle>Filter by Category</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link>Action</MDBDropdownItem>
                        <MDBDropdownItem link>Another action</MDBDropdownItem>
                        <MDBDropdownItem link>Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

                {/* Sort by price */}
                <MDBDropdown>
                    <MDBDropdownToggle>Sort by Price</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem link>Action</MDBDropdownItem>
                        <MDBDropdownItem link>Another action</MDBDropdownItem>
                        <MDBDropdownItem link>Something else here</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

                {/* Search */}
                {props.handleSearch &&
                    <MDBInputGroup>
                        <MDBInput value={searchContent} label='Search' onChange={(event) => { setSearchContent(event.target.value) }} />
                        <MDBBtn onClick={props.handleSearch} rippleColor='dark'>
                            <MDBIcon icon='search' />
                        </MDBBtn>
                    </MDBInputGroup>
                }

                {/* Cart */}
                {isShowCart &&
                    // <button onClick={navigateCart}>Cart </button>
                    <MDBBtn onClick={navigateCart}>
                        <MDBIcon fas icon="shopping-cart" />
                    </MDBBtn>
                }
                {/* Login / logout */}

                {isLogin ? (
                    <>
                        <span>{user.username}</span>
                        <MDBBtn onClick={handleLogout}>
                            <MDBIcon fas icon="sign-out-alt" />
                        </MDBBtn>
                    </>
                ) : (
                    <MDBBtn onClick={handleLogin}>
                        <MDBIcon fas icon="sign-in-alt" /> Login
                    </MDBBtn>
                )}
            </div>
        </MDBRow>

    );
}

export default Navbar;
