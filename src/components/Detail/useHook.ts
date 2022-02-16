import axios from 'axios';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCacheApi } from 'react-cache-api';
import { useCookies } from 'react-cookie';
import { getUserIdByToken } from '../../utils/Util';

const useDetail = () => {
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

    // 특정 아이디 게시글 조회 완료
    const { data, error, isValidation } = useCacheApi(
        `/documents/${documentId}`
    );
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
    return {
        data,
        start_time,
        end_time,
        isWriter,
        handleDelete,
        handleUpdate,
        handleCancell,
        handleParticipate,
    };
};

export default useDetail;
