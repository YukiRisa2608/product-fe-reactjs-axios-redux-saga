import { Outlet, Link, useNavigate } from "react-router-dom";
import { MDBCol, MDBRow, MDBIcon, MDBBtn, } from 'mdb-react-ui-kit';
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
        <MDBRow style={{ backgroundColor: "#fdccbc" }}>
            <MDBCol md='2' style={{ backgroundColor: "#fdccbc" }}>
                <div >
                    <div className="list-group list-group-flush mx-3 mt-5">

                        {isLogin ? (
                            <MDBBtn onClick={handleLogout}>
                                <MDBIcon fas icon="sign-out-alt" />
                            </MDBBtn>
                        ) : (
                            <MDBBtn onClick={handleLogin}>
                                <MDBIcon fas icon="sign-in-alt" /> Login
                            </MDBBtn>
                        )}

                        <Link to="/home" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="home" className="me-3" /><span>Home</span>
                        </Link>

                        <Link to="/admin/category" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="th-list" className="me-3" /><span>Category</span>
                        </Link>

                        <Link to="/admin/product" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="box" className="me-3" /><span>Product</span>
                        </Link>

                        <Link to="/admin/user" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="user-tie" className="me-3" /><span>User</span>
                        </Link>

                        <Link to="/admin/customer" className="list-group-item list-group-item-action py-2 ripple">
                            <MDBIcon fas icon="users" className="me-3" /><span>Customer</span>
                        </Link>
                    </div>
                </div>
            </MDBCol>
            <MDBCol md='10' >
                <Outlet />
            </MDBCol>
        </MDBRow>
    )
}

export default DefaultLayout;