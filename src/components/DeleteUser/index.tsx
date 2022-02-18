import { Form } from '../style';
import useDeleteUser from './useHook';

const DeleteUser = () => {
    const { password, handleSubmit, handlePassword } = useDeleteUser();
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
