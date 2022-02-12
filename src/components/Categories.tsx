import { useState, useEffect } from 'react';
import { Category, Popular } from './style';
import axios from 'axios';
import Router from 'next/router';
import Link from 'next/link';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const Categories = () => {
    const [cookies, setCookie] = useCookies([]);
    const token = cookies.token.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id.id;

    const documentIdAPI = async () => {
        const result = await axios.get(
            'https://api.digital-hamster.net/documents' + Category
        );
        console.log(result);
    };
    documentIdAPI();

    return (
        <>
            <h3>카테고리</h3>
            <Popular>
                <div className='image'>
                    <hr style={{ width: '100%', border: '3px solid gray' }} />
                    <img
                        src='/health.jpg'
                        width='400px'
                        height='300px'
                        className='popular'
                    ></img>
                    <div>
                        <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                        <span style={{ padding: '10px' }}>공식 챌린지</span>
                        <br />
                        <p>아침 공복에 물 한 잔</p>
                        <p>모레부터 시작</p>
                        <span className='text'>매일</span>
                        <span className='text_box'>2주동안</span>
                    </div>
                </div>
                <div className='image'>
                    <hr style={{ width: '100%', border: '3px solid gray' }} />
                    <img
                        src='/movie.jpg'
                        width='400px'
                        height='300px'
                        className='popular'
                    ></img>
                    <div>
                        <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                        <span style={{ padding: '10px' }}>공식 챌린지</span>
                        <br />
                        <p>아침 공복에 물 한 잔</p>
                        <p>모레부터 시작</p>
                        <span className='text'>매일</span>
                        <span className='text_box'>2주동안</span>
                    </div>
                </div>
                <div className='image'>
                    <hr style={{ width: '100%', border: '3px solid gray' }} />
                    <img
                        src='/music.jpg'
                        width='400px'
                        height='300px'
                        className='popular'
                    ></img>
                    <div>
                        <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                        <span style={{ padding: '10px' }}>공식 챌린지</span>
                        <br />
                        <p>아침 공복에 물 한 잔</p>
                        <p>모레부터 시작</p>
                        <span className='text'>매일</span>
                        <span className='text_box'>2주동안</span>
                    </div>
                </div>
            </Popular>
        </>
    );
};

export default Categories;
