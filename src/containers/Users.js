import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../store/actions/UserActions';
import * as RoleActions from '../store/actions/RoleActions';
import { Table, Button } from 'react-bootstrap';
import { FaToggleOn, FaToggleOff } from 'react-icons/fa';

import {
    MDBBtn,
    MDBModal,
    MDBModalDialog,
    MDBModalContent,
    MDBModalHeader,
    MDBModalTitle,
    MDBModalBody,
    MDBModalFooter,
    MDBInput,
} from 'mdb-react-ui-kit';
import { toast } from 'react-toastify';

const initForm = {
    username: '',
    password: '',
    email: '',
    roleId: null
}


const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users) || []; // Cập nhật: Loại bỏ totalPages và chỉ lấy users
    const roles = useSelector(state => state.role.roles) || [];
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [userFrom, setUserFrom] = useState(initForm);

    useEffect(() => {
        dispatch(UserActions.getUsersRequest());
        dispatch(RoleActions.getRolesRequest());
    }, [dispatch]);

    const toggleOpenCreate = () => {
        setIsShowCreate(!isShowCreate);
        clearUserForm();
    }

    const handleCreateUser = () => {
        console.log(userFrom)
        if (isValidFrom()) {
            dispatch(UserActions.addUserRequest(userFrom));
            toggleOpenCreate();
        } else {
            toast.error("Please enter full properties of form.");
        }
    };

    const isValidFrom = () => {
        return userFrom.username
            && userFrom.password
            && userFrom.email
            && userFrom.roleId
    }

    const clearUserForm = () => {
        setUserFrom(initForm)
    }

    const handleChangeRole = (e) => setUserFrom({ ...userFrom, roleId: e.target.value });
    const handleChangeUsername = (e) => setUserFrom({ ...userFrom, username: e.target.value });
    const handleChangePassword = (e) => setUserFrom({ ...userFrom, password: e.target.value });
    const handleChangeEmail = (e) => setUserFrom({ ...userFrom, email: e.target.value });

    return (
        <div>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={toggleOpenCreate}>+ Add User</Button>
            </div>
            <Table striped bordered hover className='bg-white'>
                <thead>
                    <tr>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>User ID</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Role</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Username</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Email</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Status</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.roleSet && user.roleSet.length > 0 ? user.roleSet[0].roleName : 'No Role'}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ color: user.status ? 'black' : 'red' }}>
                                {user.status ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                                {user.status ? (
                                    <FaToggleOn onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: '#df6474', fontSize: '24px' }} />
                                ) : (
                                    <FaToggleOff onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px', marginLeft: '6px' }} />
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>


            {/* Modal for Adding New User */}
            <MDBModal open={isShowCreate} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New User</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            {/* Role selection */}
                            <select className="browser-default custom-select mb-3 p-1" onChange={handleChangeRole}>
                                <option>Choose role</option>
                                {roles && roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.roleName}</option>
                                ))}
                            </select>
                            {/* Username input */}
                            <MDBInput label="Username" id="addUsername" type="text" className="mb-3" value={userFrom.username} onChange={handleChangeUsername} />
                            {/* Password input */}
                            <MDBInput label="Password" id="addPassword" type="password" className="mb-3" value={userFrom.password} onChange={handleChangePassword} />
                            {/* Email input */}
                            <MDBInput label="Email" id="addEmail" type="email" className="mb-3" value={userFrom.email} onChange={handleChangeEmail} />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenCreate}>Close</MDBBtn>
                            <MDBBtn onClick={handleCreateUser}>Add User</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


        </div>
    );
};

export default Users;
