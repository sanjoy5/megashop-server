import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';



const Paginate = ({ pages, page, keyword = '', isAdmin = false }) => {
    const navigate = useNavigate()

    if (keyword) {
        keyword = keyword.split('?keyword=')[1].split('&')[0]
    }
    console.log('KEYWORD: ', keyword);

    const paginateHandler = (x) => {
        navigate(!isAdmin ? `/?keyword=${keyword}&page=${x + 1}` : `/admin/products/?keyword=${keyword}&page=${x + 1}`)
    }

    return (
        pages > 1 && (
            <Pagination>
                {
                    [...Array(pages).keys()].map((x) => (

                        <Pagination.Item
                            key={x + 1}
                            onClick={() => paginateHandler(x)}
                            active={x + 1 === page}
                        >
                            {x + 1}
                        </Pagination.Item>

                    ))
                }
            </Pagination>
        )
    );
};

export default Paginate;