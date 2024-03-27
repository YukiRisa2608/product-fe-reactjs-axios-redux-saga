import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeActions from '../store/actions/HomeActions';
import * as CartActions from '../store/actions/CartActions';
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
	const { data } = useSelector(state => state.auth || {});
	const [currentPage, setCurrentPage] = React.useState(1);
	const { loading, products = [], totalPages, error } = useSelector(state => state.home || {});


	useEffect(() => {
		dispatch(HomeActions.getHomeItemsRequest(currentPage));
	}, [dispatch, currentPage]);

	const handleAddToCart = (product) => {
		if (storageService.get(AuthKeys.LOGGED_IN) == 'false') {
			console.log("navigate login")
			navigate('/login')
		} else {
			dispatch(CartActions.addToCartRequest({ productId: product.productId }))
		}
	}

	const handleSearch = (keyword) => {
		console.log(`search in home with key ${keyword}`)
	}

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<Navbar handleSearch={handleSearch} />
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around', backgroundColor: "white" }}>
				{(products && products.length > 0) ? products.map((product, index) => (
					<Card key={index} style={{ width: '18rem', margin: '10px' }}>
						<Card.Img variant="top" src={product.imgUrl} alt={product.productName} />
						<Card.Body>
							<Card.Title>{product.productName}</Card.Title>
							<Card.Text>Price: ${product.price}</Card.Text>
							<Button style={{ backgroundColor: "#df6474" }} onClick={() => handleAddToCart(product)} ><FaCartPlus style={{ fontSize: '20px' }}/></Button>
						</Card.Body>
					</Card>
				)) : <p>Your products are empty!</p>}
			</div>

{/* Pagination */}
			<div>
				<Footer currentPage={currentPage} totalPages={totalPages} setCurrentPage={setCurrentPage} />
			</div>
		</div>
	);
};

export default Home;
