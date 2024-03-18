import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import * as CategoryActions from "../store/actions/CategoryActions";
import { Table, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
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

const Categories = () => {
    const dispatch = useDispatch();
    const categories = useSelector(state => state.categories.categories);

    const [isShowCreate, setIsShowCreate] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    useEffect(() => {
        dispatch(CategoryActions.getCategoriesRequest());
    }, [dispatch]);

    const toggleOpenCreate = () => {
        setIsShowCreate(!isShowCreate);
        setCategoryName(''); // Clear input after closing the modal
    };

    const handleChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    };

    // const handleCreateCategory = () => {
    //     dispatch(CategoryActions.createCategoryRequest(categoryName));
    //     toggleOpenCreate(); // Optionally close modal after creation
    // };

    return (
        <div>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={toggleOpenCreate}>+ Add Category</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Category Name</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {categories && categories.map((category) => (
                        <tr key={category?.id}>
                            <td>{category?.id}</td>
                            <td>{category?.categoryName}</td>
                            <td style={{ color: category?.status ? 'blue' : 'red' }}>
                                {category?.status ? "Active" : "Inactive"}
                            </td>
                            <td>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => { }} />
                                <FaTrash style={{ color: 'red', cursor: 'pointer' }} onClick={() => dispatch(CategoryActions.deleteCategoryRequest(category.id))}/>
                                {category?.status ? (
                                  <FaToggleOn onClick={() => dispatch(CategoryActions.toggleCategoryStatusRequest(category.id))} style={{ cursor: 'pointer', color: 'green', fontSize: '24px' }} />
                                ) : (
                                  <FaToggleOff onClick={() => dispatch(CategoryActions.toggleCategoryStatusRequest(category.id))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px' }} />
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <MDBModal open={isShowCreate} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Create category</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label='Category name'
                                id='categoryName'
                                type='text'
                                value={categoryName}
                                onChange={handleChangeCategoryName} />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenCreate}>
                                Close
                            </MDBBtn>
                            {/* <MDBBtn onClick={handleCreateCategory}>Create</MDBBtn> */}
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default Categories;
