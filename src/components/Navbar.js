import React, { useEffect, useState } from 'react';
import { FaUser } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import storageService from '../utils/storage.service';
import { AuthKeys } from '../utils/constant';
import * as AuthActions from '../store/actions/AuthActions';
import * as CategoryActions from '../store/actions/CategoryActions';
import { MDBRow, MDBInputGroup, MDBInput, MDBIcon, MDBBtn, MDBDropdownItem, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu } from "mdb-react-ui-kit";


// Trong component thì nên viết function.
function Navbar({ handleChangeSearchPayload, searchPayload, handleSearch }) {
    const navigate = useNavigate()
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(CategoryActions.getCategoriesRequest());
    }, [dispatch]);

    const { data } = useSelector(state => state.auth || {});
    const [isLogin, setIsLogin] = useState(false);
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


    const isShowCart = isLogin && !window.location.href.includes('cart') && !window.location.href.includes('admin')

    return (
        <MDBRow className=" py-5" style={{ backgroundColor: "white" }} >

            <div class="d-flex flex-row justify-content-between pe-5 gap-3 padding-left 3 bg-white"  >
                {/* Filler category */}
                <MDBDropdown>
                    <MDBDropdownToggle style={{ backgroundColor: "#df6474" }}>
                        {searchPayload.categoryId ? searchPayload.categoryName : 'Filter by Category'}
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        {categories && categories.length > 0 && categories.map((category, index) => (
                            <MDBDropdownItem
                                onClick={() => handleChangeSearchPayload({ ...searchPayload, categoryId: category.id, categoryName: category.categoryName })} link key={index}>
                                {category.categoryName}
                            </MDBDropdownItem>
                        ))}
                    </MDBDropdownMenu>
                </MDBDropdown>

                {/* Sort by price */}
                <MDBDropdown>
                    <MDBDropdownToggle style={{ backgroundColor: "#df6474" }}>{searchPayload.sortBy ? searchPayload.sortByLabel : 'Sort by Price'}</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        {/* gọi handleSort trong home */}
                        <MDBDropdownItem style={{ cursor: 'pointer' }}
                            onClick={() => handleChangeSearchPayload({ ...searchPayload, sortBy: 'asc', sortByLabel: 'Ascending' })}>
                            Ascending
                        </MDBDropdownItem>
                        <MDBDropdownItem style={{ cursor: 'pointer' }}
                            onClick={() => handleChangeSearchPayload({ ...searchPayload, sortBy: 'desc', sortByLabel: 'Descending' })}>
                            Descending
                        </MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>

                {/* Search */}
                <MDBInputGroup>
                    <MDBInput value={searchPayload.keyword} label='Search'
                        onChange={(event) => { handleChangeSearchPayload({ ...searchPayload, keyword: event.target.value }) }} />
                    <MDBBtn style={{ backgroundColor: "#df6474" }} onClick={() => handleSearch()} rippleColor='dark'>
                        <MDBIcon icon='search' />
                    </MDBBtn>
                </MDBInputGroup>

                {/* Cart */}
                {isShowCart &&
                    // <button onClick={navigateCart}>Cart </button>
                    <MDBBtn style={{ backgroundColor: "#df6474" }} onClick={navigateCart}>
                        <MDBIcon fas icon="shopping-cart" />
                    </MDBBtn>
                }
                {/* Login / logout */}

                {isLogin ? (
                    <>
                        <MDBBtn style={{ backgroundColor: "#df6474" }} onClick={handleLogout}>
                            <MDBIcon fas icon="sign-out-alt" />
                        </MDBBtn>
                        {/* Avatar */}
                        <Button variant="primary" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', backgroundColor: "#df6474" }}>
                            <FaUser style={{ marginRight: '5px' }} />
                            {user.username}
                        </Button>

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
