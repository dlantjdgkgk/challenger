import { useState, useEffect } from 'react';
import { Popular } from './style';
import Router, { useRouter } from 'next/router';
import Link from 'next/link';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { getUserIdByToken } from './../utils/Util';
import { useCacheApi } from 'react-cache-api';
import moment from 'moment';

const Categories = () => {
    const router = useRouter();
    const userId = getUserIdByToken();
    const [result, setResult] = useState(null);
    const currentCategory = router.query.value;
    // get 에서만 사용 가능
    const { data, error, isValidation } = useCacheApi(`/documents`, {
        offset: 0,
        limit: 21,
        category: currentCategory,
    });

    console.log(data);
    const a = [1, 2, 3];

    // useEffect(() => {
    //     const categoryAPI = async () => {
    //         const currentCategory = router.query.value;
    //         const category = await axios.get(
    //             `https://api.digital-hamster.net/documents?offset=${offset}&limit=${limit}&category=${currentCategory}`
    //         );
    //         setResult(category); // NULL
    //     };
    //     categoryAPI();
    // }, []);
    // console.log(result);

    return (
        <>
            <h3>카테고리</h3>
            <Popular>
                {data?.map((a) => {
                    return (
                        <div className='image'>
                            <hr
                                style={{
                                    width: '100%',
                                    border: '3px solid gray',
                                }}
                            />
                            <Link href={`/detail?value=${a?.documentId}`}>
                                <img
                                    src='https://younah-test-bucket.s3.ap-northeast-2.amazonaws.com/test/5dffc738-8a6b-402a-84ae-974856735f6e.jpg'
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
                                <span className='text'>매일</span>
                                <span className='text_box'>
                                    {a?.term / 7}주동안
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
