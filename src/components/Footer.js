import React from 'react';
import { MDBPagination, MDBPaginationItem, MDBPaginationLink } from "mdb-react-ui-kit";

const Footer = ({ searchPayload, totalPages, handleChangeSearchPayload }) => {
    return (
        <div>
            {totalPages > 1 && (
                <nav className="py-5" aria-label='Page navigation' style={{ backgroundColor: "#df6474" }}>
                    <MDBPagination className='mb-0'>
                        <MDBPaginationItem disabled={searchPayload.page <= 1}>
                            <MDBPaginationLink onClick={() => handleChangeSearchPayload({ ...searchPayload, page: Math.min(totalPages, searchPayload.page - 1) })}>
                                Previous
                            </MDBPaginationLink>
                        </MDBPaginationItem>
                        {[...Array(totalPages).keys()].map(page => (
                            <MDBPaginationItem key={page + 1} active={page + 1 === searchPayload.page}>
                                <MDBPaginationLink onClick={() => handleChangeSearchPayload({ ...searchPayload, page: page + 1 })}>
                                    {page + 1}
                                </MDBPaginationLink>
                            </MDBPaginationItem>
                        ))}
                        <MDBPaginationItem disabled={searchPayload.page >= totalPages}>
                            <MDBPaginationLink onClick={() => handleChangeSearchPayload({ ...searchPayload, page: Math.min(totalPages, searchPayload.page + 1) })}>
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
