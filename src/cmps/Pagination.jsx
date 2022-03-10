import { useEffect, useRef, useState } from 'react';

function Pagination({ pagesSum, pageIndex, changePage }) {
    
    const [pagesNums, setPagesNums] = useState([])

    useEffect(() => {
        const pagesToDisplay = []
        let firstPage

        if ((pagesSum - pageIndex) <= 5) {
            firstPage = pagesSum - 9
        } else if (pageIndex <= 5) {
            firstPage = 1;
        } else {
            firstPage = pageIndex - 4
        }

        for (let i = firstPage; i < firstPage + 10; i++) {
            pagesToDisplay.push(i)
        }
        setPagesNums(pagesToDisplay)

    }, [pageIndex])

    const isBold = num => {
        return num === pageIndex ? 'bold' : ''
    }

    return (
        <ul className='pages-container'>
            {pageIndex > 5 && <>
            <li onClick={() => changePage(0)}>1</li>...</>}
            {pagesNums.length && pagesNums.map(pageNum => 
            <li onClick={() => changePage(pageNum - 1)} className={isBold(pageNum)} key={pageNum}>{pageNum}
            </li>)}
            {(pagesSum - pageIndex) > 5  && <>...
            <li onClick={() => changePage(pagesSum -1)}>{pagesSum}</li></>}
        </ul>
    );
}

export default Pagination;