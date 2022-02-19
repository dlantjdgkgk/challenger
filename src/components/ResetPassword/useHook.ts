import { useState } from 'react';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';

const useResetPassword = () => {
    const [email, setEmail] = useState('');
    const [cookies, setCookies, removeCookie] = useCookies([]);

    const handleEmail = (e) => {
        setEmail(e.target.value);
    };

    const ResetPasswordAPI = async () => {
        const payload = {
            email: email,
        };
        const resetPassword = await axios.post(
            'https://api.digital-hamster.net/reset/password',
            payload,
            {
                headers: {
                    Authorization: `${cookies.token}`,
                },
            }
        );
        Router.push('/');
        console.log(resetPassword);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        removeCookie('token');
        ResetPasswordAPI();
    };
    return { handleSubmit, email, handleEmail };
};
export default useResetPassword;
