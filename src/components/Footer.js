import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";

const Footer = ({ currentPage, totalPages, setCurrentPage }) => {
    return (
        <div>
            {totalPages > 1 && (
                <nav className="py-5" aria-label='Page navigation' style={{ backgroundColor: "#fdccbc" }}>
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

export default Footer;
