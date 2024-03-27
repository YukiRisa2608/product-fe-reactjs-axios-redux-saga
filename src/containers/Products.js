import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as ProductActions from '../store/actions/ProductActions';
import * as CategoryActions from '../store/actions/CategoryActions';
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

const Products = () => {
    const dispatch = useDispatch();
    const products = useSelector(state => state.products.products);
    const categories = useSelector(state => state.categories.categories);

    useEffect(() => {
        dispatch(ProductActions.getProductsRequest());
        dispatch(CategoryActions.getCategoriesRequest());
    }, [dispatch]);

    // State cho modal thêm mới sản phẩm
    const [isShowCreate, setIsShowCreate] = useState(false);
    const [productId, setProductId] = useState(null);
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [productStatus, setProductStatus] = useState('true');
    const [file, setFile] = useState(null);

    const [isShowEdit, setIsShowEdit] = useState(false);

    //toggle modal thêm mới sản phẩm
    // Reset các state khi mở hoặc đóng modal
    const toggleOpenCreate = () => {
        setIsShowCreate(!isShowCreate);
        setProductName('');
        setCategoryId('Choose Category');
        setProductImage('');
        setProductDescription('');
        setProductPrice('');
        setProductQuantity('');
        setProductStatus('true'); // Reset về giá trị mặc định khi đóng hoặc mở modal
        setFile(null)
    };

    // Hàm xử lý khi tạo sản phẩm mới
    const handleCreateProduct = async () => {
        // Kiểm tra điều kiện đầu vào cho tất cả các trường
        if (!productName.trim() || !categoryId || productPrice <= 0 || productQuantity < 0) {
            console.log("Please enter all required fields with valid values.");
            return;
        }

        const productDetails = {
            productName,
            categoryId,
            productImage,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity,
            file,
            productStatus: productStatus === 'true'
        };

        console.log("Creating product with details:", productDetails);

        try {
            dispatch(ProductActions.addProductRequest(productDetails));
            console.log("Product added successfully");
            toggleOpenCreate(); // Đóng modal sau khi xử lý
        } catch (error) {
            console.error("Failed to add product:", error);
        }
    };

    // Hàm xử lý thay đổi giá trị các trường input trong modal
    const handleChangeProductName = (e) => setProductName(e.target.value);
    const handleChangeCategory = (e) => setCategoryId(e.target.value);
    const handleChangeProductImage = (e) => setProductImage(e.target.value);
    const handleChangeProductDescription = (e) => setProductDescription(e.target.value);
    const handleChangeProductPrice = (e) => setProductPrice(e.target.value);
    const handleChangeProductQuantity = (e) => setProductQuantity(e.target.value);


    const openEditModal = (product) => {

        setProductId(product.productId)
        setProductName(product.productName);
        setCategoryId(product.categoryId);
        setProductDescription(product.description);
        setProductPrice(product.price);
        setProductQuantity(product.quantity);
        setFile(null)

        setIsShowEdit(true)
    }

    const toggleOpenEdit = () => {
        setIsShowEdit(!isShowEdit);
        setProductName('');
        setCategoryId('Choose Category');
        setProductImage('');
        setProductDescription('');
        setProductPrice('');
        setProductQuantity('');
        setProductStatus('true');
        setFile(null)
        setProductId(null)
    };

    const handleEditProduct = () => {
        console.log('handleEditProduct')

        // Kiểm tra điều kiện đầu vào cho tất cả các trường
        if (!productName.trim() || !categoryId || productPrice <= 0 || productQuantity < 0) {
            toast.info("Please enter all required fields with valid values.");
            return;
        }

        const productDetails = {
            productName,
            categoryId,
            productImage,
            description: productDescription,
            price: productPrice,
            quantity: productQuantity,
            file,
            productStatus: productStatus === 'true'
        };

        console.log("Creating product with details:", productDetails);

        try {
            dispatch(ProductActions.editProductRequest(productId, productDetails));
            toast.success("Product update successfully");
            toggleOpenEdit(); // Đóng modal sau khi xử lý
        } catch (error) {
            toast.error(error.message)
        }
    }


    const displayCategoryName = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.categoryName : 'Category not found';
    };

    return (
        <div className='bg-black'>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={toggleOpenCreate}>+ Add Product</Button>
            </div>
            <Table striped bordered hover className='bg-white'>
                <thead>
                    <tr >
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Product ID</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Category Name</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Image</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Product Name</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Description</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Price</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Quantity</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Status</th>
                        <th style={{ backgroundColor: "#df6474", fontWeight: "bold" }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.map((product) => (
                        <tr key={product.productId}>
                            <td>{product.productId}</td>
                            <td>{displayCategoryName(product.categoryId)}</td>
                            <td>{product.imgUrl ? <img src={product.imgUrl} alt={product.productName} style={{ width: '100px' }} /> : 'No image available'}</td>
                            <td>{product.productName}</td>
                            <td>{product.description}</td>
                            <td>{product.price}</td>
                            <td>{product.quantity}</td>
                            <td style={{ color: product.status ? 'blue' : 'red' }}>
                                {product.status ? 'Active' : 'Inactive'}
                            </td>
                            <td>
                                {product?.status ? (
                                    // toggle icon
                                    <FaToggleOn onClick={() => dispatch(ProductActions.toggleProductStatusRequest(product.productId))} style={{ cursor: 'pointer', color: 'blue', fontSize: '24px' }} />) : (
                                    <FaToggleOff onClick={() => dispatch(ProductActions.toggleProductStatusRequest(product.productId))} style={{ cursor: 'pointer', color: 'grey', fontSize: '24px', marginLeft: '6px' }} />)}
                                {/* edit icon */}
                                <FaEdit style={{ color: 'green', cursor: 'pointer', fontSize: '18px', marginLeft: '8px' }} onClick={() => openEditModal(product)} />
                                {/* delete icon */}
                                <FaTrash onClick={() => dispatch(ProductActions.deleteProductRequest(product.productId))} style={{ color: 'red', cursor: 'pointer', fontSize: '18px', margin: '0 8px' }} />
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
                            <MDBModalTitle>Add New Product</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenCreate}></MDBBtn>
                        </MDBModalHeader>
                        {/* Body */}
                        <MDBModalBody>
                            {/* Catgory name*/}
                            <select className="browser-default custom-select mb-3 p-1" onChange={handleChangeCategory}>
                                <option>Choose Category</option>
                                {categories.map(category => (
                                    <option key={category.id} value={category.id}>{category.categoryName}</option>))}
                            </select>
                            {/* Product name */}
                            <MDBInput
                                label="Product Name"
                                id="addProductName"
                                type="text"
                                className="mb-3"
                                value={productName}
                                onChange={handleChangeProductName}
                            />
                            {/*Description  */}
                            <MDBInput
                                label="Description"
                                id="addProductDescription"
                                type="textarea"
                                className="mb-3"
                                value={productDescription}
                                onChange={handleChangeProductDescription}
                            />
                            {/* Price */}
                            <MDBInput
                                label="Price"
                                id="addProductPrice"
                                type="number"
                                className="mb-3"
                                value={productPrice}
                                onChange={handleChangeProductPrice}
                            />
                            {/*Quantity  */}
                            <MDBInput
                                label="Quantity"
                                id="addProductQuantity"
                                type="number"
                                className="mb-3"
                                value={productQuantity}
                                onChange={handleChangeProductQuantity}
                            />

                            <MDBInput
                                id="addProductImage"
                                type="file"
                                className="mb-3"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </MDBModalBody>
                        {/* Footer */}
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenCreate}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleCreateProduct}>
                                Add Product
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>


            {/* Modal Chỉnh Sửa Sản Phẩm */}
            <MDBModal open={isShowEdit} tabIndex='-1'>
                <MDBModalDialog>
                    <MDBModalContent>
                        <MDBModalHeader>
                            <MDBModalTitle>Edit Product</MDBModalTitle>
                            <MDBBtn className='btn-close' color='none' onClick={toggleOpenEdit}></MDBBtn>
                        </MDBModalHeader>
                        {/* Body */}
                        <MDBModalBody>
                            {/* Catgory name*/}
                            <select className="browser-default custom-select mb-3 p-1" onChange={handleChangeCategory}>
                                <option>Choose Category</option>
                                {categories.map(category => (
                                    <option selected={category.id === categoryId} key={category.id} value={category.id}>{category.categoryName}</option>))}
                            </select>
                            {/* Product name */}
                            <MDBInput
                                label="Product Name"
                                id="addProductName"
                                type="text"
                                className="mb-3"
                                value={productName}
                                onChange={handleChangeProductName}
                            />
                            {/*Description  */}
                            <MDBInput
                                label="Description"
                                id="addProductDescription"
                                type="textarea"
                                className="mb-3"
                                value={productDescription}
                                onChange={handleChangeProductDescription}
                            />
                            {/* Price */}
                            <MDBInput
                                label="Price"
                                id="addProductPrice"
                                type="number"
                                className="mb-3"
                                value={productPrice}
                                onChange={handleChangeProductPrice}
                            />
                            {/*Quantity  */}
                            <MDBInput
                                label="Quantity"
                                id="addProductQuantity"
                                type="number"
                                className="mb-3"
                                value={productQuantity}
                                onChange={handleChangeProductQuantity}
                            />

                            <MDBInput
                                id="addProductImage"
                                type="file"
                                className="mb-3"
                                onChange={(e) => setFile(e.target.files[0])}
                            />
                        </MDBModalBody>
                        {/* Footer */}
                        <MDBModalFooter>
                            <MDBBtn color='secondary' onClick={toggleOpenEdit}>
                                Close
                            </MDBBtn>
                            <MDBBtn onClick={handleEditProduct}>
                                Save
                            </MDBBtn>
                        </MDBModalFooter>
                    </MDBModalContent>
                </MDBModalDialog>
            </MDBModal>
        </div>
    );
};

export default Products;


