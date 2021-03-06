import { Form } from '../style';
import Link from 'next/link';
import useLogin from './useHook';

const Login = () => {
    const { handleSubmit, handleEmail, handlePw, email, password } = useLogin();

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
                <ul className='function'>
                    <li>
                        <Link href='/signup'>
                            <a>회원가입</a>
                        </Link>
                    </li>
                </ul>
                <button>로그인</button>
            </Form>
        </>
    );
};

export default Login;
