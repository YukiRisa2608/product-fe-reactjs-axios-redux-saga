import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as UserActions from '../store/actions/UserActions';
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
    const users = useSelector(state => state.users.users) || []; // Cập nhật: Loại bỏ totalPages và chỉ lấy users
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [role, setRole] = useState('');
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        dispatch(UserActions.getUsersRequest());
    }, [dispatch]);

    const toggleOpenCreate = () => {
        setIsShowCreate(!isShowCreate);
    }

    const handleCreateUser = () => {
        if (userName.trim()) {
            dispatch(UserActions.addUserRequest({ username: userName.trim(), password, email, role }));
            toggleOpenCreate();
        } else {
            console.log("Please enter a valid username.");
        }
    };

    const handleChangeRole = (e) => setRole(e.target.value);
    const handleChangeUsername = (e) => setUserName(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    const handleChangeEmail = (e) => setEmail(e.target.value);

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
                    {users.map((user) => ( 
                        <tr key={user.id}> 
                            <td>{user.id}</td>
                            <td>{user.roleSet && user.roleSet.length > 0 ? user.roleSet[0].roleName : 'No Role'}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td style={{ color: user.status ? 'blue' : 'red' }}>
                                {user.status ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                                {user.status ? (
                                    <FaToggleOn onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }} />
                                ) : (
                                    <FaToggleOff onClick={() => dispatch(UserActions.toggleUserStatusRequest(user.id))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px', marginLeft: '6px' }} />
                                )}
                            </td>

                        </tr>
                    ))}
                </tbody>
            </Table>
             {/* Modal for Adding New User */}
                <MDBModal show={isShowCreate} setShow={setIsShowCreate} tabIndex='-1'>
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
                {roles.map(role => (
                  <option key={role.id} value={role.id}>{role.roleName}</option>
                ))}
              </select>
              {/* Username input */}
              <MDBInput label="Username" id="addUsername" type="text" className="mb-3" value={userName} onChange={handleChangeUsername} />
              {/* Password input */}
              <MDBInput label="Password" id="addPassword" type="password" className="mb-3" value={password} onChange={handleChangePassword} />
              {/* Email input */}
              <MDBInput label="Email" id="addEmail" type="email" className="mb-3" value={email} onChange={handleChangeEmail} />
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
