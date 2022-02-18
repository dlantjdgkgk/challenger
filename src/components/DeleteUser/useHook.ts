import { useState } from 'react';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import Router from 'next/router';
import jwt from 'jsonwebtoken';

const useDeleteUser = () => {
    const [password, Setpassword] = useState('');
    const [cookies, setCookie, removeCookie] = useCookies([]);

    const handlePassword = (e) => {
        Setpassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        removeCookie('token');
        withdrawalAPI();
    };

    // 회원탈퇴 API
    const withdrawalAPI = async () => {
        const payload = {
            password: password,
        };
        const token = cookies.token.split(' ')[1];
        const id = jwt.decode(token);
        const userid = id.id; // 77

        const withdrawal = await axios.delete(
            'https://api.digital-hamster.net/users/' + userid,
            {
                data: payload,
                headers: {
                    Authorization: `${cookies.token}`,
                },
            }
        );
        Router.push('/');
    };
    return { password, handleSubmit, handlePassword };
};

export default useDeleteUser;
