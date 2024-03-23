import { MDBCol, MDBRow } from "mdb-react-ui-kit";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
    return (
        <MDBRow style={{ backgroundColor: "#fdccbc" }}>
            <MDBCol md='2' className="bg-primary">
                md="2"
            </MDBCol>
            <MDBCol md='10'>
                <MDBRow className="bg-danger py-5" >
                </MDBRow>
                <Outlet />
            </MDBCol>
        </MDBRow>
    )
}

export default DefaultLayout;