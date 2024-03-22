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
    const [productName, setProductName] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [productImage, setProductImage] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [productQuantity, setProductQuantity] = useState('');
    const [classification, setClassification] = useState('');
    const [productStatus, setProductStatus] = useState('true');
    const [file, setFile] = useState(null);

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
        setClassification('')
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
            classification,
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
      const handleChangeClassification = (e) => setClassification(e.target.value);



    

    const displayCategoryName = (categoryId) => {
        const category = categories.find(category => category.id === categoryId);
        return category ? category.categoryName : 'Category not found';
    };

    return (
        <div>
            <div className="d-flex justify-content-end mb-4">
                <Button variant="primary" onClick={toggleOpenCreate}>+ Add Product</Button>
            </div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className="bg-secondary">Product ID</th>
                        <th className="bg-secondary">Category Name</th>
                        <th className="bg-secondary">Image</th>
                        <th className="bg-secondary">Product Name</th>
                        <th className="bg-secondary">Description</th>
                        <th className="bg-secondary">Price</th>
                        <th className="bg-secondary">Quantity</th>
                        <th className="bg-secondary">Status</th>
                        <th className="bg-secondary">Actions</th>
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
                                {/* <FaEdit style={{color: 'green', cursor: 'pointer', fontSize: '18px', marginLeft: '8px'}}onClick={() => openEditModal(product)}/> */}
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
                            {/*classification  */}
                            <MDBInput
                                label="Classification"
                                id="addClassification"
                                type="text"
                                className="mb-3"
                                value={classification}
                                onChange={handleChangeClassification}
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
            
        </div>
    );
};

export default Products;


