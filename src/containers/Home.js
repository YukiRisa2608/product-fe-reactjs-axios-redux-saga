import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as CartActions from '../store/actions/CartActions';
import * as ProductActions from '../store/actions/ProductActions';
import * as HomeActions from '../store/actions/HomeActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import storageService from '../utils/storage.service';
import { AuthKeys } from '../utils/constant';
import { FaCartPlus } from 'react-icons/fa';


const Home = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const [currentPage, setCurrentPage] = React.useState(1);
	const { loading, products = [], totalPages, error } = useSelector(state => state.home || {});

	const [searchPayload, setSearchPayload] = useState({
		keyword: '',
		page: 1,
		sortBy: null,
		sortByLabel: '',
		categoryId: null,
		categoryName: ''
	});


	//render 
	useEffect(() => {
		dispatch(HomeActions.searchProductsRequest({ ...searchPayload, page: searchPayload.page - 1 }));
		console.log("totalPages", totalPages)
	}, [dispatch, currentPage, searchPayload]);


	//add to cart
	const handleAddToCart = (product) => {
		if (storageService.get(AuthKeys.LOGGED_IN) == 'false') {
			console.log("navigate login")
			navigate('/login')
		} else {
			dispatch(CartActions.addToCartRequest({ productId: product.productId }))
		}
	}

	//search
	const handleSearch = (keyword) => {
		console.log(`search in home with key ${keyword}`)
	}

	const handleChangeSearchPayload = (newValue) => {
		console.log(`change search payload`, newValue)
		setSearchPayload(newValue)
	};


	return (
		<div>
			<Navbar
				handleSearch={handleSearch}
				handleChangeSearchPayload={handleChangeSearchPayload}
				searchPayload={searchPayload}
			/>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: "black" }}>
				{(products && products.length > 0) ? products.map((product, index) => (
					<Card key={index} style={{ width: '18rem', margin: '10px' }}>
						<Card.Img variant="top" src={product.imgUrl} alt={product.productName} />
						<Card.Body>
							<Card.Title>{product.productName}</Card.Title>
							<Card.Text>Price: ${product.price}</Card.Text>
							<Button style={{ backgroundColor: "#df6474" }} onClick={() => handleAddToCart(product)} ><FaCartPlus style={{ fontSize: '20px' }} /></Button>
						</Card.Body>
					</Card>
				)) : <p>Your products are empty!</p>}
			</div>

			{/* Pagination */}
			<div>
				<Footer searchPayload={searchPayload} totalPages={totalPages} handleChangeSearchPayload={handleChangeSearchPayload} />
			</div>
		</div>
	);
};

export default Home;
