import { useState, useEffect } from 'react';
import axios from 'axios';
import { getUserIdByToken } from '../../utils/Util';
import Router, { useRouter } from 'next/router';
import { useCacheApi } from 'react-cache-api';
import moment from 'moment';
import { useCookies } from 'react-cookie';
import Link from 'next/link';

// 기한이 지났을경우에 참가버튼이 참가하지 못하는 버튼으로 바뀌게
//useEffect 같은 경우는 get 호출할때만 사용된다.
const Detail = () => {
    const router = useRouter();
    const documentId = router.query.value;
    const [isWriter, setIsWriter] = useState(null);
    const [result, setResult] = useState(null);
    const [loginUserId, setLoginUserId] = useState(null);
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const a = getUserIdByToken();
            setLoginUserId(a);
        }
    }, []);
    // console.log(loginUserId);
    // console.log(documentId);

    // 특정 아이디 게시글 조회 완료
    const { data, error, isValidation } = useCacheApi(
        `/documents/${documentId}`
    );
    // console.log(loginUserId); // 토큰을 발급받으면 나오는 id 값이야 a라는 회원가입을해 => 111
    // console.log(documentId); // 이 부분은 말그대로 게시물 번호
    console.log(data);
    // console.log(data?.data?.[0]?.userId); // 이 부분은 누가 작성했나 예를 들어  111

    const start_time = moment(new Date(data?.data?.[0]?.start_time)).format(
        'YYYY-MM-DD'
    );

    const end_time = moment(new Date(data?.data?.[0]?.end_time)).format(
        'YYYY-MM-DD'
    );

    useEffect(() => {
        if (loginUserId === data?.data?.[0]?.userId) {
            setIsWriter(5);
        }
    }, [data, isWriter, loginUserId]);

    // 참여자 참여하기  완료
    const handleParticipate = (e) => {
        const postAPI = async () => {
            const payload = {
                userId: loginUserId,
                documentId: Number(documentId),
            };
            const b = await axios.post(
                'https://api.digital-hamster.net/participants',
                payload
            );
            Router.push('/');
        };
        postAPI();
    };

    // 참여자 참여취소 완료
    const handleCancell = (e) => {
        const cancellAPI = async () => {
            const payload = {
                userId: loginUserId,
                documentId: documentId,
            };
            await axios.delete('https://api.digital-hamster.net/participants', {
                data: payload,
            });
            Router.push('/');
        };
        cancellAPI();
    };

    // 게시글 수정
    const handleUpdate = (e) => {
        const updateAPI = async () => {
            const payload = new FormData();
            payload.append('img', data?.data?.[0]?.img);
            payload.append('title', data?.data?.[0]?.title);
            await axios.post(
                `https://api.digital-hamster.net/documents/${documentId}`,
                payload
            );
        };
        Router.push('/write');
        updateAPI();
    };
    // console.log(data?.data?.[0]?.img);
    // console.log(data?.data?.[0]?.title);

    // 게시글 삭제하기  완료
    const handleDelete = () => {
        const deleteAPI = async () => {
            await axios.delete(
                `https://api.digital-hamster.net/documents/${documentId}`
            );
        };
        Router.push('/');
        deleteAPI();
    };

    return (
        <>
            {data?.data?.[0]?.img && (
                <img
                    src={`${data?.data?.[0]?.img}`}
                    width='1000'
                    height='500'
                ></img>
            )}
            {/* <img
                src={`${data?.data?.[0]?.img}`}
                width='1000'
                height='500'
            ></img> */}
            <div>
                <p>공식 챌린지</p>
                <p>{data?.data?.[0]?.title}</p>
                <p>매일</p>
                <p>
                    {start_time} ~ {end_time}
                </p>
                {isWriter !== 5 ? (
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
