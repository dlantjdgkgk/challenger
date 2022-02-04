import { useState, useEffect } from 'react';
import { DIV, Start } from './style';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';

const Mypage = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const Logout = async () => {
        await removeCookie('token');
        console.log(cookies);
    };

    return (
        <>
            <Start>
                <DIV>
                    <Link href='/write'>
                        <FontAwesomeIcon icon={faEdit} size='3x' />
                    </Link>
                    <Link href='/'>
                        <img src='/create.PNG' width='100' height='100'></img>
                    </Link>
                    <ul className='fucntion'>
                        <li>
                            <Link href='/'>
                                <button onClick={Logout}>로그아웃</button>
                            </Link>
                        </li>
                    </ul>
                </DIV>
            </Start>
        </>
    );
};

export default Mypage;
