import React, { useState } from 'react';
import PropTypes from 'prop-types'
import PagerService from './PagerService';

export default function Pagination({ totalRecords, pageSize, pageNumber, onPageChange}) {
    const [pager, setPager] = useState(PagerService(totalRecords, pageNumber, pageSize));

    const setPage = (page) => {
        if (page < 1 || page > pager.totalPages) {
            return;
        }
        setPager(PagerService(totalRecords, page, pageSize));
        onPageChange(page);
    }

    const content = pager.pages.map((page) => {
        return (
            <li key={page} className={`pagination-page page-item ${pager.currentPage === page ? 'active' : ''}`}>
                <a className="page-link" onClick={setPage.bind(this, page)}>{page}</a>
            </li>
        )
    })
    return (
        <div className="row">
            <div className="col-12">
                <ul className="pagination">
                    <li className={`pagination-first page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={setPage.bind(this, 1)}>
                            <i className="fa fa-step-backward fa-xs" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className={`pagination-prev page-item ${pager.currentPage === 1 ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={setPage.bind(this, pager.currentPage - 1)}>
                            <i className="fa fa-caret-left fa-xs" aria-hidden="true"></i>
                        </a>
                    </li>
                    {content}
                    {
                        (pager.totalPages - pager.startPage) > 5 ?
                            <li>
                                <a className="page-link" onClick={setPage.bind(this, pager.startPage + 5)}>...</a>
                            </li>
                            : ''
                    }
                    {
                        (pager.totalPages - pager.startPage) > 5 ?
                            <li>
                                <a className="page-link" onClick={setPage.bind(this, pager.totalPages)}>{pager.totalPages}</a>
                            </li>
                            : ''
                    }
                    <li className={`pagination-next page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={setPage.bind(this, pager.currentPage + 1)}>
                            <i className="fa fa-caret-right fa-xs" aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className={`pagination-last page-item ${pager.currentPage === pager.totalPages ? 'disabled' : ''}`}>
                        <a className="page-link" onClick={setPage.bind(this, pager.totalPages)}>
                            <i className="fa fa-step-forward fa-xs" aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    );
}

Pagination.propTypes = {
    totalRecords: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    pageNumber: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired
}

Pagination.defaultProps = {
    pageSize: 10,
    pageNumber: 1
}