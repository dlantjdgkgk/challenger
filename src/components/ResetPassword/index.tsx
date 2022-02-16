import { Form } from '../style';
import useResetPassword from './useHook';

const ResetPassword = () => {
    const { handleSubmit, email, handleEmail } = useResetPassword();
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
                    type='text'
                    placeholder='email'
                    value={email}
                    onChange={handleEmail}
                />
                <br></br>
                <img
                    src='/2.PNG'
                    width='400'
                    height='400'
                    alt='My Image'
                    className='title'
                ></img>
                <button>비밀번호 초기화</button>
            </Form>
        </>
    );
};

export default ResetPassword;
