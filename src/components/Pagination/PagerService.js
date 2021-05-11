export default function PagerService(totalItems, currentPage, pageSize) {
    // calculate total pages
    let totalPages = Math.ceil(totalItems / pageSize);

    let startPage, endPage;

    if (totalPages <= 5) {
        startPage = 1;
        endPage = totalPages;
    } else {
        if (currentPage <= 3) {
            startPage = 1;
            endPage = 5;
        } else if (currentPage + 1 >= totalPages) {
            startPage = totalPages - 4;
            endPage = totalPages;
        } else {

            if ((totalPages - (currentPage - 2)) === 5) {
                startPage = currentPage - 1;
                endPage = currentPage + 3;
            } else {
                startPage = currentPage - 2;
                endPage = currentPage + 2;
            }
        }
    }

    // calculate start and end item indexes
    let startIndex = (currentPage - 1) * pageSize;
    let endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);

    // create an array of pages
    let pages = range(startPage, endPage);

    // return object with all pager properties required by the view
    return {
        totalItems: totalItems,
        currentPage: currentPage,
        pageSize: pageSize,
        totalPages: totalPages,
        startPage: startPage,
        endPage: endPage,
        startIndex: startIndex,
        endIndex: endIndex,
        pages: pages
    }
}

function range(startItem, endItem) {
    let rangeItems = [];
    for (; startItem <= endItem; startItem++) {
        rangeItems.push(startItem);
    }
    return rangeItems;
}