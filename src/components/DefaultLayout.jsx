import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Outlet } from "react-router-dom";
import BaseHeader from "./BaseHeader";

const DefaultLayout = () => {
    return (
        <MDBRow>
            <MDBCol md='2' className="bg-primary">
                md="2"
            </MDBCol>
            <MDBCol md='10'>
                <MDBRow className="bg-danger py-5" >
                    <BaseHeader/>
                </MDBRow>
                <Outlet />
            </MDBCol>
        </MDBRow>
    )
}

export default DefaultLayout;