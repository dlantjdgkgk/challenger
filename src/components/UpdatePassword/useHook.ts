import { useState, useEffect } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

const useUpdatePassword = () => {
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
            `https://api.digital-hamster.net/users/${userid}`,
            payload
        );
        Router.push('/');
    };
    return { handleSubmit, password, handlePassword, changePw, handleChangePw };
};
export default useUpdatePassword;
