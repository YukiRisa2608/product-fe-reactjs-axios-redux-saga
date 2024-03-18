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

    //const add
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [categoryName, setCategoryName] = useState('');

    //const edit
    const [isShowEdit, setIsShowEdit] = useState(false);
    const [editCategoryName, setEditCategoryName] = useState('');
    const [editCategoryId, setEditCategoryId] = useState(null);
    

    useEffect(() => {
        dispatch(CategoryActions.getCategoriesRequest());
    }, [dispatch]);

    //open / close modal add
    const toggleOpenCreate = () => {
        setIsShowCreate(!isShowCreate);
        setCategoryName(''); // Clear input after closing the modal
    };

    //handle add
    const handleCreateCategory = () => {
        if (categoryName.trim()) {
            dispatch(CategoryActions.addCategoryRequest(categoryName.trim()));
            toggleOpenCreate();
        } else {
            console.log("Please enter a valid category name.");
        }
    };
    //handle change name value
    const handleChangeCategoryName = (e) => {
        setCategoryName(e.target.value);
    };
    
    //open edit
    const openEditModal = (category) => {
        setEditCategoryId(category.id);
        setEditCategoryName(category.categoryName);
        setIsShowEdit(true);
    };

    //close edit
    const closeEditModal = () => {
        setIsShowEdit(false);
        setEditCategoryName('');
        setEditCategoryId(null);
    };

    //handle edit
    const handleEditCategory = () => {
    if (editCategoryName.trim()) {
        dispatch(CategoryActions.editCategoryRequest(editCategoryId, editCategoryName.trim()));
        closeEditModal();
    } else {
        console.log("Please enter a valid category name.");
    }
};

    

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
                            {category?.status ? (
                                // toggle icon
                                <FaToggleOn onClick={() => dispatch(CategoryActions.toggleCategoryStatusRequest(category.id))} style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }} />) : (
                                <FaToggleOff onClick={() => dispatch(CategoryActions.toggleCategoryStatusRequest(category.id))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px', marginLeft: '6px' }} />)}
                                {/* edit icon */}
                                <FaEdit style={{color: 'green', cursor: 'pointer', fontSize: '18px', marginLeft: '8px'}}onClick={() => openEditModal(category)}/>
                                {/* delete icon */}
                                <FaTrash style={{ color: 'red', cursor: 'pointer', marginLeft: '8px' }} onClick={() => dispatch(CategoryActions.deleteCategoryRequest(category.id))}/>
                                
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

{/* modal add*/}
            <MDBModal open={isShowCreate} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Save category</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>

                        <MDBInput
                            label="Category name"
                            id="addCategoryName"
                            type="text"
                            value={categoryName}
                            onChange={handleChangeCategoryName}/>
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenCreate}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleCreateCategory}>
                                Add Category
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

{/* modal edit  */}
            <MDBModal open={isShowEdit} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Category</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={closeEditModal}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label="Category name"
                                id="editCategoryName"
                                type="text"
                                value={editCategoryName}
                                onChange={(e) => setEditCategoryName(e.target.value)}
                            />
                        </MDBModalBody>
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={closeEditModal}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleEditCategory}>
                                Save Changes
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>

        </div>
    );
};

export default Categories;
