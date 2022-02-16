import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const useLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [res, setRes] = useState(null);
    const [cookies, setCookie] = useCookies([]);

    useEffect(() => {
        if (res?.data?.Token) {
            setCookie('token', `Bearer ${res?.data?.Token}`);
            console.log(res?.data?.Token);
            const a = jwt.decode(res?.data?.Token);
            console.log(a.id);
        }
    }, [res?.data?.Token]);

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
        const login = await axios.post(
            'https://api.digital-hamster.net/login',
            payload
        );
        Router.push('/');
        setRes(login);
    };
    return { handleSubmit, handleEmail, handlePw, email, password };
};
export default useLogin;
