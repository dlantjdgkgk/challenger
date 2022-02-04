import { useState, useEffect } from 'react';
import { Form } from './style';
import axios from 'axios';
import Router from 'next/router';

const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl('https://api.mooseong.net/password/reset');
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setEmail('');
        ResetPasswordAPI();
    };

    const ResetPasswordAPI = async () => {
        const payload = {
            email: email,
        };
        const resetPassword = await axios.post(url, payload);
        Router.push('/');
    };

    return (
        <>
            <Form onSubmit={handleSubmit}>
                <img
                    src='/create.PNG'
                    width='200'
                    height='200'
                    alt='My Image'
                    className='title'
                ></img>
                <h3>비밀번호 찾기</h3>
                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={handleEmail}
                />
                <br></br>
                <img
                    src='/2.PNG'
                    width='400'
                    height='400'
                    alt='My Image'
                    className='title'
                ></img>
                <button>비밀번호 초기화</button>
            </Form>
        </>
    );
};

export default ResetPassword;
