import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as HomeActions from '../store/actions/HomeActions';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from 'mdb-react-ui-kit';

const Home = () => {
	const dispatch = useDispatch();
	const { loading, products = [], totalPages, error } = useSelector(state => state.home || {});
	console.log(products);

	const [currentPage, setCurrentPage] = React.useState(1);

	useEffect(() => {
		dispatch(HomeActions.getHomeItemsRequest(currentPage));
	}, [dispatch, currentPage]);

	if (loading) return <div>Loading...</div>;
	if (error) return <div>Error: {error}</div>;

	return (
		<div>
			<div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-around' }}>
				{products.map((product, index) => (
					<Card key={index} style={{ width: '18rem', margin: '10px' }}>
						<Card.Img variant="top" src={product.imgUrl} alt={product.productName} />
						<Card.Body>
							<Card.Title>{product.productName}</Card.Title>
							<Card.Text>Price: ${product.price}</Card.Text>
							<Button variant="primary">+ Add to Cart</Button>
						</Card.Body>
					</Card>
				))}
			</div>

			{totalPages > 1 && (
				<nav aria-label='Page navigation'>
					<MDBPagination className='mb-0'>
						<MDBPaginationItem disabled={currentPage <= 1}>
							<MDBPaginationLink onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}>
								Previous
							</MDBPaginationLink>
						</MDBPaginationItem>
						{[...Array(totalPages).keys()].map(page => (
							<MDBPaginationItem key={page + 1} active={page + 1 === currentPage}>
								<MDBPaginationLink onClick={() => setCurrentPage(page + 1)}>
									{page + 1}
								</MDBPaginationLink>
							</MDBPaginationItem>
						))}
						<MDBPaginationItem disabled={currentPage >= totalPages}>
							<MDBPaginationLink onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}>
								Next
							</MDBPaginationLink>
						</MDBPaginationItem>
					</MDBPagination>
				</nav>
			)}
		</div>
	);
};

export default Home;
