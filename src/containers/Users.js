import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../store/actions/UserActions';
import { Table, Button } from 'react-bootstrap';
import { FaTrash, FaEdit, FaToggleOn, FaToggleOff } from 'react-icons/fa';
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

// Fix for test
const roles = [
    {
        id: 1,
        roleName: "Admin"
    },
    {
        id: 2,
        roleName: "User"
    },
]

const Users = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.users.users);

    useEffect(() => {
        dispatch(UserActions.getUsersRequest());
    }, [dispatch]);

    const [isShowCreate, setIsShowCreate] = useState(false);
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [userFrom, setUserForm] = useState({});

    const toggleOpenCreate = () => {

    }

    const handleChangeRole = () => {

    }

    const handleCreateUser = () => {
        console.log('create user', userFrom)
    }

    const handleChangeFullName = (e) => setUserForm({ ...userFrom, fullName: e.target.value });
    const handleChangeUsername = (e) => setUserForm({ ...userFrom, username: e.target.value });
    const handleChangePassword = (e) => setUserForm({ ...userFrom, password: e.target.value });
    const handleChangeEmail = (e) => setUserForm({ ...userFrom, email: e.target.value });

    return (
        <div>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={toggleOpenCreate}>+ Add User</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="bg-secondary">User Id</th>
                        <th className="bg-secondary">FullName</th>
                        <th className="bg-secondary">Username</th>
                        <th className="bg-secondary">Email</th>
                        <th className="bg-secondary">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ color: user.status ? 'blue' : 'red' }}>
                                {user.status ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                                {user?.status ? (
                                    // toggle icon
                                    <FaToggleOn onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }} />) : (
                                    <FaToggleOff onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px', marginLeft: '6px' }} />)}

                                {/* delete icon */}
                                <FaTrash onClick={() => dispatch(UserActions.deleteUserRequest(user.id))} style={{ color: 'red', cursor: 'pointer', fontSize: '18px', margin: '0 8px' }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Modal Thêm Mới Sản Phẩm */}
            <MDBModal open={isShowCreate} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Add New User</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        {/* Body */}
                        <MDBModalBody>
                            {/* Catgory name*/}
                            <select className="browser-default custom-select mb-3 p-1" onChange={handleChangeRole}>
                                <option>Choose role</option>
                                {roles.map(role => (
                                    <option key={role.id} value={role.id}>{role.roleName}</option>))}
                            </select>
                            {/* Product name */}
                            <MDBInput
                                label="Full Name"
                                id="addFullName"
                                type="text"
                                className="mb-3"
                                value={userFrom.fullName}
                                onChange={handleChangeFullName}
                            />
                            {/*Description  */}
                            <MDBInput
                                label="Username"
                                id="addUsername"
                                type="textarea"
                                className="mb-3"
                                value={userFrom.username}
                                onChange={handleChangeUsername}
                            />
                            {/* Price */}
                            <MDBInput
                                label="Password"
                                id="addPassword"
                                type="password"
                                className="mb-3"
                                value={userFrom.password}
                                onChange={handleChangePassword}
                            />
                            {/*Quantity  */}
                            <MDBInput
                                label="Email"
                                id="addEmail"
                                type="email"
                                className="mb-3"
                                value={userFrom.email}
                                onChange={handleChangeEmail}
                            />


                        </MDBModalBody>
                        {/* Footer */}
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenCreate}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleCreateUser}>
                                Add User
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default Users;


