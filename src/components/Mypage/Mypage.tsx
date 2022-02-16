import { useState, useEffect } from 'react';
import { DIV, Start } from '../style';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import { useCacheApi } from 'react-cache-api';
import jwt from 'jsonwebtoken';

const Mypage = () => {
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const Logout = async () => {
        await removeCookie('token');
        console.log(cookies);
    };
    const token = cookies?.token?.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id?.id;
    console.log(userId);

    const {
        data: userWrite,
        error,
        isValidation,
    } = useCacheApi(`/users/${userId}`);
    console.log(userWrite);

    const {
        data: userParticipant,
        error: error2,
        isValidation: inValidation2,
    } = useCacheApi(`/participants/`, {
        userId: userId,
    });
    console.log(userParticipant);

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
                        <li>
                            <Link href='/deleteUser'>
                                <button>회원탈퇴</button>
                            </Link>
                        </li>
                    </ul>
                </DIV>
                <h3>유저가 작성한 게시글</h3>
                {userWrite?.data?.result?.map((a) => {
                    return (
                        <div className='image'>
                            <Link href={`detail?value=${a?.documentId}`}>
                                <img
                                    src={`${a?.img_link}`}
                                    width='400px'
                                    height='300px'
                                    className='popular'
                                />
                            </Link>
                            <div>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    size='2x'
                                />
                                <span style={{ padding: '10px' }}>
                                    공식 챌린지
                                </span>
                                <br />
                                <p>{a?.title}</p>
                                <p>{a?.remaining_days}일 후부터 시작</p>
                                <span className='text'>매일 </span>
                                <span className='text_box'>
                                    {a?.term / 7}주 동안
                                </span>
                            </div>
                        </div>
                    );
                })}
                <h3>유저가 참여한 게시글</h3>
                {userParticipant?.data?.result?.map((a) => {
                    return (
                        <div className='image'>
                            <Link href={`detail?value=${a?.documentId}`}>
                                <img
                                    src={`${a?.img_link}`}
                                    width='400px'
                                    height='300px'
                                    className='popular'
                                />
                            </Link>
                            <div>
                                <FontAwesomeIcon
                                    icon={faCheckCircle}
                                    size='2x'
                                />
                                <span style={{ padding: '10px' }}>
                                    공식 챌린지
                                </span>
                                <br />
                                <p>{a?.title}</p>
                                <p>{a?.remaining_days}일 후부터 시작</p>
                                <span className='text'>매일 </span>
                                <span className='text_box'>
                                    {a?.term / 7}주 동안
                                </span>
                            </div>
                        </div>
                    );
                })}
            </Start>
        </>
    );
};

export default Mypage;
