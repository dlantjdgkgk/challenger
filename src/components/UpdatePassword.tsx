import { useState, useEffect } from 'react';
import { Form } from './style';
import axios from 'axios';
import Router from 'next/router';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [change_password, Setchange_password] = useState('');
    const [url, setUrl] = useState('');

    useEffect(() => {
        setUrl('https://api.digital-hamster.net/users');
    }, []);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword('');
        UpdatePasswordAPI();
    };

    const UpdatePasswordAPI = async () => {
        const payload = {
            password: password,
        };
        const updatePassword = await axios.put(url, payload);
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
                    placeholder='password'
                    value={password}
                    onChange={handlePassword}
                />
                <br></br>
                <input
                    type='text'
                    placeholder='change Password'
                    value={change_password}
                    onChange={handlePassword}
                />
                <br></br>
                <img
                    src='/2.PNG'
                    width='400'
                    height='400'
                    alt='My Image'
                    className='title'
                ></img>
                <button>비밀번호 변경</button>
            </Form>
        </>
    );
};

export default UpdatePassword;
