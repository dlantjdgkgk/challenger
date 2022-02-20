import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';
import { updateCategoriesResult } from '../../redux/rootReducer';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';
import { useRouter } from 'next/router';

const useWrite = () => {
    const [title, setTitle] = useState('');
    const [cost, setCost] = useState('');
    const [result, setResult] = useState(null);
    const [category_data, setcategory_data] = useState(null);
    const [category, setCategory] = useState(null);
    const [participant, setParticipant] = useState(null);
    const [cookies, setCookie] = useCookies([]);
    const dispatch = useDispatch();
    const moment = require('moment');
    const router = useRouter();
    const [ment, Setment] = useState('');

    const { startTime, term } = useSelector(
        (state) => ({
            startTime: state.startTime,
            term: state.term,
        }),
        shallowEqual // 객체 반환할 때 필요
    );

    const token = cookies?.token?.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id?.id;

    const result1 = new Date(startTime);
    const res = result1.setDate(result1.getDate() + Number(term));
    const date = moment(new Date(res));
    const end_time = date.format('YYYY-MM-DD');
    console.log(end_time);

    useEffect(() => {
        const appendAPI = async () => {
            setcategory_data(
                await axios.get('https://api.digital-hamster.net/categories')
            );
        };
        appendAPI();
    }, []);

    const participant_option = [
        { value: 2, label: '2명' },
        { value: 3, label: '3명' },
        { value: 4, label: '4명' },
        { value: 5, label: '5명' },
        { value: 6, label: '6명' },
    ];
    const categories_result = category_data?.data?.result;
    dispatch(updateCategoriesResult(categories_result));

    const category_Options = [
        { label: 'Health', value: `${categories_result?.[0].value}` },
        { label: 'Movie', value: `${categories_result?.[1].value}` },
        { label: 'Drama', value: `${categories_result?.[2].value}` },
        { label: 'Routine', value: `${categories_result?.[3].value}` },
        { label: 'Music', value: `${categories_result?.[4].value}` },
        { label: 'Food', value: `${categories_result?.[5].value}` },
    ];

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };
    const handleCost = (e) => {
        setCost(e.target.value);
    };
    const handleCategory = (category) => {
        setCategory(category);
    };

    const handleParticipant = (participant) => {
        setParticipant(participant);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title === '') {
            alert('제목을 입력해주세요');
            return;
        }
        if (cost === '') {
            alert('비용을 입력해주세요');
            return;
        }
        if (startTime === '') {
            alert('기한을 선택해주세요');
            return;
        }

        const formData: Record<any, any> = new FormData();
        formData.append('title', title);
        formData.append('cost', cost);
        formData.append('category', category.value);
        formData.append('participant', participant.value);
        formData.append('start_time', startTime);
        formData.append('term', term);
        formData.append('end_time', end_time);
        formData.append('userId', userId);
        formData.append('img', e.target.img.files[0]);
        // for (let key of formData.keys()) {
        //     console.log(key);
        // }
        // for (let value of formData.values()) {
        //     console.log(value);
        // }
        const writeAPI = async () => {
            try {
                const write = await axios.post(
                    'https://api.digital-hamster.net/documents',
                    formData,
                    {
                        headers: {
                            Authorization: `${cookies.token}`,
                        },
                    }
                );
            } catch (ex) {
                if (ex.response && ex.response.status === 400) {
                    alert(ex?.response?.data?.message);
                }
            }
            router.push('/');
        };
        setTitle('');
        setCategory('');
        setCost('');
        writeAPI();
    };
    return {
        handleSubmit,
        title,
        handleTitle,
        category_data,
        category,
        handleCategory,
        category_Options,
        participant,
        handleParticipant,
        participant_option,
        cost,
        handleCost,
    };
};

export default useWrite;
