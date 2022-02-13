import { useState, useEffect } from 'react';
import { Category, Popular } from './style';
import axios from 'axios';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { getUserIdByToken } from './../utils/Util';
import categories from './../pages/category';

const Categories = () => {
    const router = useRouter();
    const currentCategory = router.query.value;
    const userId = getUserIdByToken();
    console.log('userId', userId);
    const [result, setResult] = useState(null);

    const a = [1, 2, 3];
    useEffect(() => {
        const categoryAPI = async (offset, limit) => {
            const category = await axios.get(
                `https://api.digital-hamster.net/documents?offset=${offset}&limit=${limit}&category=${currentCategory}`
            );
            setResult(category);
            console.log(result);
        };

        categoryAPI(0, 21);
    }, []);

    return (
        <>
            <h3>카테고리</h3>
            <Popular>
                {a.map(() => {
                    return (
                        <div className='image'>
                            <hr
                                style={{
                                    width: '100%',
                                    border: '3px solid gray',
                                }}
                            />
                            <Link href='/confirm'>
                                <img
                                    src='https://younah-test-bucket.s3.ap-northeast-2.amazonaws.com/test/5dffc738-8a6b-402a-84ae-974856735f6e.jpg'
                                    width='400px'
                                    height='300px'
                                    className='popular'
                                ></img>
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
                                <p>{result?.data?.title}</p>
                                <p>
                                    {result?.data?.remaining_days}일 후부터 시작
                                </p>
                                <span className='text'>매일</span>
                                <span className='text_box'>
                                    {result?.data?.term / 7}주동안
                                </span>
                            </div>
                        </div>
                    );
                })}
                ;
            </Popular>
        </>
    );
};

export default Categories;
