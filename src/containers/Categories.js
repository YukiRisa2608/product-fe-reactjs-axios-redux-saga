import { connect } from "react-redux";
import { actionGetListCategories, actionCreateCategory } from "../store/actions/CategoriesAction";
import { Component } from "react";
import PropTypes from 'prop-types';
import { Table } from 'react-bootstrap';
import { FaEdit, FaTrash, FaBan } from 'react-icons/fa';
import { Button } from 'react-bootstrap';
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

class Categories extends Component {
    // init state
    constructor(props) {
        super(props);
        this.state = {
            isShowCreate: false,
            isCreating: false,
            category: {
                id: null,
                categoryName: ''
            }
        }
        this.toggleOpenCreate = this.toggleOpenCreate.bind(this);
        this.handleChangeCategoryName = this.handleChangeCategoryName.bind(this);
        this.handleCreateCategory = this.handleCreateCategory.bind(this)
    }

    getCategories() {
        this.props.actionGetListCategories();
    }

    componentDidMount() {
        this.props.actionGetListCategories()
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.isCreating && this.state.isCreating) {
            this.getCategories()
        }
    }

    toggleOpenCreate() {
        this.setState(prevState => ({
            ...prevState,
            isCreating: !prevState.isCreating,
            isShowCreate: !prevState.isShowCreate
        }));
    }

    handleChangeCategoryName(categoryName) {
        this.setState(prevState => ({
            ...prevState,
            category: {
                ...prevState.category,
                name: categoryName
            }
        }))
    }

    handleCreateCategory() {
        console.log("create category with name ", this.state.category.name)
        this.props.actionCreateCategory(this.state.category.name);

        this.toggleOpenCreate();

        this.setState(prevState => ({
            ...prevState,
            isCreating: false,
            category: {
                ...prevState.category,
                name: ''
            }
        }));

        // this.getCategories();
    }

    render() {
        return <div>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={() => this.toggleOpenCreate()}>+Add Category</Button>
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
                    {this.props.categories.categories && this.props.categories.categories.map((category) => (
                        <tr key={category?.id}>
                            <td>{category?.id}</td>
                            <td>{category?.categoryName}</td>
                            <td style={{ color: category.status ? 'blue' : 'red' }}>
                                {category?.status ? "Active" : "Inactive"}</td>
                            <td>
                                <FaEdit style={{ color: 'grey', cursor: 'pointer', marginRight: '10px' }} onClick={() => { }} />
                                <FaTrash style={{ color: 'red', cursor: 'pointer', marginRight: '10px' }} onClick={() => { }} />
                                <FaBan style={{ color: category?.status === "Active" ? 'grey' : 'blue', cursor: 'pointer' }} onClick={() => { }} />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>


            <MDBModal open={this.state.isShowCreate} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Create category</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={this.toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        <MDBModalBody>
                            <MDBInput
                                label='Category name'
                                id='categoryName'
                                type='text'
                                aria-describedby='categoryName'
                                onChange={(e) => this.handleChangeCategoryName(e.target.value)} />
                        </MDBModalBody>

                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={this.toggleOpenCreate}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={this.handleCreateCategory}>Create</MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
        actionGetListCategories: payload => {
            dispatch(actionGetListCategories(payload));
        },
        actionCreateCategory: payload => {
            dispatch(actionCreateCategory(payload));
        }
    };
};
const mapStateToProps = state => {
    return {
        categories: state.categories
    };
};

Categories.propTypes = {
    dispatch: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);