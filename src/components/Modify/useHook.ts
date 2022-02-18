import { useState, useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const useModify = () => {
    const [title, setTitle] = useState(null);
    const [cookies, setCookie] = useCookies([]);
    const [imgurl, setImgurl] = useState(null);
    const router = useRouter();
    const token = cookies.token.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id.id;

    useEffect(() => {
        if (router.query) {
            setTitle(router.query.title);
            setImgurl(`${router.query.img}`);
        }
    }, [router.query]);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            alert('제목을 입력해주세요');
            return;
        }
        const updateAPI = async () => {
            const payload = new FormData();
            payload.append('img', e.target.img.files[0]);
            payload.append('title', title);
            payload.append('userId', userId);
            await axios.put(
                `https://api.digital-hamster.net/documents/${router.query.documentId}`,
                payload,
                {
                    headers: {
                        Authorization: `${cookies.token}`,
                    },
                }
            );
            router.push('/');
        };
        setTitle('');
        updateAPI();
    };

    return {
        handleSubmit,
        title,
        handleTitle,
    };
};

export default useModify;
