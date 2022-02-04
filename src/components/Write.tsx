import { useState, useEffect } from 'react';
import { Submit } from './style';
import axios from 'axios';
import Router from 'next/router';
import { faUpload } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import Deadline from './Deadline';
import { useSelector } from '../redux/hooks';
import { shallowEqual } from 'react-redux';

const Write = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [participant, setParticipant] = useState('');
    const [cost, setCost] = useState('');
    const [url, setUrl] = useState('');
    const [result, setResult] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [category_data, setcategory_data] = useState(null);
    const [participant_data, setparticipant_data] = useState(null);
    const [selectedOption, setSelectedOption] = useState(null);

    const { startdate, selectdate } = useSelector(
        (state) => ({
            startdate: state.startdate,
            selectdate: state.selectdate,
        }),
        shallowEqual // 객체 반환할 때 필요
    );

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' },
    ];

    console.log(startdate);
    console.log(selectdate);

    useEffect(() => {
        setUrl('http://localhost:3000/write');
    }, []);

    const handleTitle = (e) => {
        setTitle(e.target.value);
    };

    const handleCost = (e) => {
        setCost(e.target.value);
    };

    const onChange = (e) => {
        setSelectedFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (title === '') {
            alert('제목을 입력해주세요');
            return;
        }
        // if (category === '') {
        //     alert('항목을 선택해주세요');
        //     return;
        // }
        // if (participant === '') {
        //     alert('참가 인원을 선택해주세요');
        //     return;
        // }
        if (cost === '') {
            alert('비용을 입력해주세요');
            return;
        }
        if (startdate === '') {
            alert('기한을 선택해주세요');
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('cost', cost);
        formData.append('category', category);
        formData.append('participant', participant);
        formData.append('startdate', startdate);
        formData.append('selectdate', selectdate);
        formData.append('file', selectedFile);

        const writeAPI = async () => {
            const payload = {
                data: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            };
            const write = await axios.post(url, payload);
            setResult(write);
        };
        setTitle('');
        setCategory('');
        setParticipant('');
        setCost('');
        appendAPI();
        writeAPI();
    };
    console.log(result);

    const appendAPI = async () => {
        setcategory_data(await axios.get(url));
        setparticipant_data(await axios.get(url));
    };

    return (
        <>
            <Submit method='post' action='/' onSubmit={handleSubmit}>
                <img
                    src='/create.PNG'
                    width='200'
                    height='200'
                    alt='My Image'
                    className='title'
                ></img>
                <h1>챌린지 글 작성하기</h1>
                <div>
                    <div>
                        <span>제목</span>
                        <input
                            id='title'
                            type='text'
                            value={title}
                            onChange={handleTitle}
                        />
                    </div>
                    <div>
                        <span>항목</span>
                        {!category_data ? (
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        ) : null}
                    </div>
                    <div>
                        <span>인원</span>
                        {participant_data ? (
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        ) : null}
                    </div>
                    <div>
                        <span>비용</span>
                        <input
                            id='cost'
                            type='text'
                            value={cost}
                            onChange={handleCost}
                        />
                    </div>
                    <Deadline />
                    <div>
                        <br></br>
                        <span className='upload'>업로드</span>
                        <input
                            type='file'
                            className='imgInput'
                            accept='image/*'
                            name='file'
                            onChange={onChange}
                        />
                    </div>
                </div>

                <button className='submit'>제출하기</button>
            </Submit>
        </>
    );
};

export default Write;
