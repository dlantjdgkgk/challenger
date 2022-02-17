import { useRouter } from 'next/router';
import axios from 'axios';
import Link from 'next/link';
import { useState } from 'react';

// 임시회원일 때 링크(내가 홈페이지 만들어서 윤아한테 보내주기)가 이메일로 간다 => 사용자가 그걸 눌러 => 나는 AUTH API를 호출한다.
// 페이지가 인증이 완료되었습니다 하고 메인 페이지로 간다?
const Auth = () => {
    const router = useRouter();
    const { authcode } = router.query;
    const [ment, Setment] = useState('로딩중');

    const AuthAPI = async () => {
        try {
            const result = await axios.post(
                `https://api.digital-hamster.net/auths/${authcode}`
            );
            Setment('인증 성공입니다 축하드려요');
        } catch (ex) {
            if (ex.response && ex.response.status === 400) {
                Setment(ex?.response?.data?.message);
            }
        }
    };
    AuthAPI();

    return (
        <>
            <div>{ment}</div>
            <Link href='/'>메인으로</Link>
        </>
    );
};

export default Auth;
