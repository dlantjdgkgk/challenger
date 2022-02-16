import { Form } from '../style';
import useUpdatePassword from './useHook';

const UpdatePassword = () => {
    const { handleSubmit, password, handlePassword, changePw, handleChangePw } =
        useUpdatePassword();

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
