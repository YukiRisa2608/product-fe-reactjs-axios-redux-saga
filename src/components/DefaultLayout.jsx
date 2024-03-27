import { Outlet, Link, useNavigate } from "react-router-dom";
import { MDBCol, MDBRow, MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';
import { FaUser } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { AuthKeys } from "../utils/constant";
import storageService from "../utils/storage.service";
import * as AuthActions from '../store/actions/AuthActions';


const DefaultLayout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { data } = useSelector(state => state.auth || {});
    const [isLogin, setIsLogin] = useState(false);
    const [user, setUser] = useState({});


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

    return (
        <MDBRow style={{ backgroundColor: "black" }}>
            <MDBCol md='2' style={{ backgroundColor: "black" }}>
                <div >
                    <div className="list-group list-group-flush mx-3 mt-5">
                        {/* Logout */}
                        {isLogin ? (
                            <>
                                <div style={{ marginTop: '10px', textAlign: 'center' }}>
                                    <FaUser style={{ fontSize: '24px', color: '#df6474' }} />
                                    <div style={{ backgroundColor: "#df6474" }}>{data.username}</div>

                                    <div onClick={handleLogout}style={{ backgroundColor: "#df6474" }}>
                                        <MDBIcon fas icon="sign-out-alt" />
                                    </div>

                                </div>
                            </>

                        ) : (
                            // login
                            <MDBBtn onClick={handleLogin}>
                                <MDBIcon fas icon="sign-in-alt" /> Login
                            </MDBBtn>
                        )}
                        {/* menu */}
                        <Link to="/home" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="home" className="me-3" /><span style={{ fontWeight: 'bold' }}>Home</span>
                        </Link>

                        <Link to="/admin/category" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="th-list" className="me-3" /><span style={{ fontWeight: 'bold' }}>Category</span>
                        </Link>

                        <Link to="/admin/product" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="box" className="me-3" /><span style={{ fontWeight: 'bold' }}>Product</span>
                        </Link>

                        <Link to="/admin/users" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="users" className="me-3" /><span style={{ fontWeight: 'bold' }}>Users</span>
                        </Link>
                    </div>
                </div>
            </MDBCol>

            {/* outlet */}

            <MDBCol md='10' >
                <Outlet />
            </MDBCol>
        </MDBRow>
    )
}

export default DefaultLayout;