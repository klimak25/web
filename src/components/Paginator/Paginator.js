import React from 'react';
import './Paginator.css';

const Paginator = ({ currentPage, pageCount, onChoosePage }) => {
	const pageLeft =
		currentPage - 1 > 0 ? (currentPage - 2 > 0 ? currentPage - 2 : currentPage - 1) : 1;

	let pageRight =
		currentPage - 1 > 0
			? currentPage - 2 > 0 ? currentPage + 2 : currentPage + 3
			: currentPage + 4;

	if (pageRight > pageCount) {
		pageRight = pageCount;
	}

	const pages = [];
	for (let i = pageLeft; i <= pageRight; i++) {
		pages.push(i);
	}

	return (
		<div className="paginator">
			{pages.map((page) => (
				<span
					key={page}
					className={
						page === currentPage ? (
							'paginator__page paginator__page_active'
						) : (
							'paginator__page'
						)
					}
					onClick={() => onChoosePage(page)}
				>
					{page}
				</span>
			))}
		</div>
	);
};

export default Paginator;
