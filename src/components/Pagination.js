import { useEffect } from "react";

function Pagination({ pagination, changePage, scrollNextPage}){
    const isBackend = window.location.hash.includes('/admin');

    return(
        <nav aria-label='Page navigation' className="d-flex justify-content-center">
            <ul className='pagination'>
            <li className='page-item'>
                <a 
                    className={`page-link ${pagination.has_pre ? '' : 'disabled'}`}
                    href='/' 
                    aria-label='Previous'                     
                        onClick={(e)=>{
                        e.preventDefault();
                        changePage(pagination.current_page - 1);
                        if (!isBackend) {
                            scrollNextPage();
                        }
                    }}
                >
                <span aria-hidden='true'>&laquo;</span>
                </a>
            </li>
            {[...new Array(pagination.total_pages)].map((_, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <li className='page-item' key={`${i}_page`}>
                <a className={`page-link ${i + 1 === pagination.current_page && 'active'}`} href='/'
                    onClick={(e)=>{
                        e.preventDefault();
                        changePage(i+1);
                        if (!isBackend) {
                            scrollNextPage();
                        }
                    }}    
                >
                    {i + 1}
                </a>
                </li>
            ))}
            <li className='page-item'>
                <a className={`page-link ${pagination.has_next ? '' : 'disabled'}`}
                    href='/' 
                    aria-label='Next'                     
                        onClick={(e)=>{
                        e.preventDefault();
                        changePage(pagination.current_page + 1);
                    }}
                >
                <span aria-hidden='true'>&raquo;</span>
                </a>
            </li>
            </ul>
        </nav>
    )
}
export default Pagination;