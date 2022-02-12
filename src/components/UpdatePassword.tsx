import { useState, useEffect } from 'react';
import { Form } from './style';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const UpdatePassword = () => {
    const [password, setPassword] = useState('');
    const [changePw, setchangePw] = useState('');
    const [cookies, setCookie] = useCookies([]);

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleChangePw = (e) => {
        setchangePw(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setPassword('');
        UpdatePasswordAPI();
    };

    const UpdatePasswordAPI = async () => {
        const payload = {
            password: password,
            changePw: changePw,
        };
        const token = cookies.token.split(' ')[1];
        const id = jwt.decode(token);
        const userid = id.id; // 77

        const updatePassword = await axios.put(
            'https://api.digital-hamster.net/users/' + userid,
            payload
        );
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
                    type='password'
                    placeholder='password'
                    value={password}
                    onChange={handlePassword}
                />
                <br></br>
                <input
                    type='password'
                    placeholder='change Password'
                    value={changePw}
                    onChange={handleChangePw}
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
