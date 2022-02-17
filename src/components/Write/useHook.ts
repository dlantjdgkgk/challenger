import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';
import { updateCategories_result } from '../../redux/rootReducer';
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

    const { start_time, term } = useSelector(
        (state) => ({
            start_time: state.start_time,
            term: state.term,
        }),
        shallowEqual // 객체 반환할 때 필요
    );
    console.log(cookies);

    const token = cookies.token.split(' ')[1];
    const id = jwt.decode(token);
    const userId = id.id;

    const result1 = new Date(start_time);
    const res = result1.setDate(result1.getDate() + Number(term));
    const date = moment(new Date(res));
    const end_time = date.format('YYYY-MM-DD');
    const days = moment(start_time, 'YYYYMMDD').fromNow();
    const remaining_days = days.split(' ')[1];

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
    // console.log(categories_result);

    dispatch(updateCategories_result(categories_result));

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
    // "Cannot destructure property 'buffer' of 'req.file' as it is undefined."
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
        if (start_time === '') {
            alert('기한을 선택해주세요');
            return;
        }

        const formData: Record<any, any> = new FormData();
        formData.append('title', title);
        formData.append('cost', cost);
        formData.append('category', category.value);
        formData.append('participant', participant.value);
        formData.append('start_time', start_time);
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
            const write = await axios.post(
                'https://api.digital-hamster.net/documents',
                formData
            );
            console.log(write);
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
