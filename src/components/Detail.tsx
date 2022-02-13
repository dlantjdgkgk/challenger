import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserIdByToken } from '../utils/Util';
import Router, { useRouter } from 'next/router';
import { useCacheApi } from 'react-cache-api';
import moment from 'moment';
import { useCookies } from 'react-cookie';

//useEffect 같은 경우는 get 호출할때만 사용된다.
const Detail = () => {
    const router = useRouter();
    const documentId = router.query.value;
    const [isWriter, setIsWriter] = useState(null);
    const [result1, setResult1] = useState(null);
    const [result2, setResult2] = useState(null);
    const [loginUserId, setLoginUserId] = useState(null);
    // const [cookies, setCookies] = useCookies([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const a = getUserIdByToken();
            setLoginUserId(a);
        }
    }, []);

    // 기한이 지났을경우에 참가버튼이 참가하지 못하는 버튼으로 바뀌게
    // 특정 아이디 게시글 조회
    const { data, error, isValidation } = useCacheApi(
        `/documents/${documentId}`
    );
    console.log(data);

    const a = data?.[0]?.start_time;
    const b = new Date(a);
    const start_time = moment(b).format('YYYY-MM-DD'); // 년도-월-일
    console.log(start_time);

    const c = data?.[0]?.end_time;
    const d = new Date(c);
    const end_time = moment(d).format('YYYY-MM-DD'); // 년도-월-일
    console.log(end_time);

    useEffect(() => {
        if (loginUserId === data?.userId) {
            setIsWriter(isWriter);
        }
    }, [data, isWriter, loginUserId]);

    const handleParticipate = (e) => {
        // 참여자 참여하기
        const postAPI = async () => {
            const payload = {
                userId: loginUserId,
                documentId: documentId,
            };
            const b = await axios.post(
                `https://api.digital-hamster.net/participants`,
                payload
            );
            setResult1(b);
        };
        postAPI();
    };

    console.log(result1);

    const handleCancell = (e) => {
        // 참여자 참여취소
        useEffect(() => {
            const cancellAPI = async () => {
                const payload = {
                    userId: loginUserId,
                    documentId: documentId,
                };
                await axios.delete(
                    'https://api.digital-hamster.net/participants',
                    {
                        data: payload,
                    }
                );
            };
        }, []);
    };

    const handleUpdate = (e) => {
        useEffect(() => {
            // 게시글 수정
            const updateAPI = async () => {
                const payload = new FormData();
                payload.append('img', data?.img);
                payload.append('title', data?.title);
                await axios.post(
                    `https://api.digital-hamster.net/documents/${documentId}`,
                    payload
                );
            };
        }, []);
    };

    const handleDelete = () => {
        // 게시글 삭제하기
        useEffect(() => {
            const deleteAPI = async () => {
                await axios.delete(
                    `https://api.digital-hamster.net/documents/${documentId}`
                );
            };
        }, []);
    };

    return (
        <>
            <img
                src='https://younah-test-bucket.s3.ap-northeast-2.amazonaws.com/test/5dffc738-8a6b-402a-84ae-974856735f6e.jpg'
                width='1000'
                height='500'
            ></img>
            <div>
                <p>공식 챌린지</p>
                <p>{data?.title}</p>
                <p>매일</p>
                <p>
                    {start_time} ~ {end_time}
                </p>
                {!isWriter ? (
                    <div>
                        <button onClick={handleParticipate}>참여하기</button>
                        <button onClick={handleCancell}>참여취소</button>
                    </div>
                ) : (
                    <div>
                        <button onClick={handleUpdate}>수정하기</button>
                        <button onClick={handleDelete}>삭제하기</button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Detail;
