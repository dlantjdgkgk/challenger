import { useState, useEffect } from 'react';
import { Form } from './style';
import axios from 'axios';
import Router from 'next/router';
import { useCookies } from 'react-cookie';
import jwt from 'jsonwebtoken';

// 링크 만들 때 토큰 인증 부분이 이상해질수도..
// useEffect : 게시글 fetch 계속 렌더링 할 필요가 없을 때
const DeleteUser = () => {
    const [password, Setpassword] = useState('');
    const [cookies, setCookie] = useCookies([]);

    const handlePassword = (e) => {
        Setpassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        withdrawalAPI();
    };

    const withdrawalAPI = async () => {
        const payload = {
            password: password,
        };
        const token = cookies.token.split(' ')[1];
        const id = jwt.decode(token);
        const userid = id.id; // 77

        const withdrawal = await axios.delete(
            'https://api.digital-hamster.net/users/' + userid,
            { data: payload }
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
                <h3>회원 탈퇴</h3>
                <input
                    type='password'
                    placeholder='password'
                    value={password}
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
                <button>회원 탈퇴</button>
            </Form>
        </>
    );
};

export default DeleteUser;
