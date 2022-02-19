import axios from 'axios';
import moment from 'moment';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCacheApi } from 'react-cache-api';
import { getUserIdByToken } from '../../utils/Util';
import { useCookies } from 'react-cookie';

const useDetail = () => {
    const router = useRouter();
    const documentId = router.query.value;
    const [isWriter, setIsWriter] = useState(null);
    const [loginUserId, setLoginUserId] = useState(null);
    const [cookies, setCookies] = useCookies([]);

    useEffect(() => {
        if (typeof window !== undefined) {
            const a = getUserIdByToken();
            setLoginUserId(a);
        }
    }, []);

    // 특정 아이디 게시글 조회 완료
    const { data, error, isValidation } = useCacheApi(
        () => {
            if (documentId === undefined) {
                return null;
            } else {
                return `/documents/${documentId}`;
            }
        },
        {},
        {
            headers: {
                Authorization: `${cookies.token}`,
            },
        }
    );

    const start_time = moment(new Date(data?.result?.start_time)).format(
        'YYYY-MM-DD'
    );

    const end_time = moment(new Date(data?.result?.end_time)).format(
        'YYYY-MM-DD'
    );

    useEffect(() => {
        if (loginUserId === data?.result?.user_id) {
            setIsWriter(true);
        } else {
            setIsWriter(false);
        }
    }, [data, isWriter, loginUserId]);

    // 참여자 참여하기  완료
    const handleParticipate = (e) => {
        const postAPI = async () => {
            const payload = {
                userId: loginUserId,
                documentId: documentId,
            };
            await axios.post(
                'https://api.digital-hamster.net/participants',
                payload,
                {
                    headers: {
                        Authorization: `${cookies.token}`,
                    },
                }
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
                headers: {
                    Authorization: `${cookies.token}`,
                },
            });
            Router.push('/');
        };
        cancellAPI();
    };

    // 게시글 수정
    const handleUpdate = (e) => {
        Router.push(
            `/modify?title=${data?.result?.title}&img=${data?.result?.img_link}&userId=${data?.result?.user_id}&documentId=${documentId}`
        );
    };

    // 게시글 삭제하기  완료
    const handleDelete = () => {
        const payload = {
            userId: loginUserId,
        };
        const deleteAPI = async () => {
            await axios.delete(
                `https://api.digital-hamster.net/documents/${documentId}`,
                {
                    data: payload,
                    headers: {
                        Authorization: `${cookies.token}`,
                    },
                }
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
