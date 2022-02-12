import { useState, useEffect } from 'react';
import { Form } from './style';
import Link from 'next/link';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState(null);
    const [url, setUrl] = useState('');
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        if (res?.data?.Token) {
            setCookie('token', `Bearer ${res?.data?.Token}`);
            console.log(res?.data?.Token);
            const a = jwt.decode(res?.data?.Token);
            console.log(a.id);
        }
    }, [res?.data?.Token]);

    useEffect(() => {
        setUrl('https://api.digital-hamster.net/login');
    }, []);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const handlePw = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (email === '') {
            alert('email을 입력해주세요');
        }
        if (email !== '' && password === '') {
            alert('pw을 입력해주세요');
        }
        setEmail('');
        setPassword('');
        loginAPI();
    };

    const loginAPI = async () => {
        const payload = {
            email: email,
            password: password,
        };
        const login = await axios.post(url, payload);
        Router.push('/');
        setRes(login);
    };
    console.log(res);

    return (
        <>
            <Form method='post' action='/' onSubmit={handleSubmit}>
                <img
                    src='/create.PNG'
                    width='200'
                    height='200'
                    alt='My Image'
                    className='title'
                ></img>
                <input
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={handleEmail}
                />
                <br></br>
                <input
                    type='password'
                    placeholder='pw'
                    value={password}
                    onChange={handlePw}
                />
                <ul className='fucntion'>
                    <li>
                        <Link href='/signup'>
                            <a>회원가입</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/resetPassword'>
                            <a>비밀번호 초기화</a>
                        </Link>
                    </li>
                    <li>
                        <Link href='/updatePassword'>
                            <a>비밀번호 변경</a>
                        </Link>
                    </li>
                </ul>
                <button>로그인</button>
            </Form>
        </>
    );
};

export default Login;
