import Pagination from '../Pagination/Pagination';

export default function () {
    const onPageChange = (page) => {
        console.log(page);
    }
    return (
        <Pagination totalRecords={100} pageSize={10} pageNumber={5} onPageChange={onPageChange}></Pagination>
        // <div>Welcome to Little Tag</div>
    );
}