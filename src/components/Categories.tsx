import { useState, useEffect } from 'react';
import { Category } from './style';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';

const Categories = () => {
    const [category, Setcategory] = useState([
        'health',
        'movie',
        'drama',
        'routine',
        'food',
        'music',
    ]);
    return (
        <>
            <h3>카테고리</h3>
            <hr style={{ width: '1200px', border: '3px solid gray' }} />
            <Category>
                {category.map(function (category) {
                    return (
                        <div className='image'>
                            <Link href='/confirm'>
                                <img
                                    src='/health.jpg'
                                    width='190px'
                                    height='150px'
                                    className='category'
                                ></img>
                            </Link>

                            <div>
                                <span>
                                    <b>{category}</b>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </Category>
        </>
    );
};

export default Categories;
