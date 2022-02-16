import { Form } from '../style';
import useDeleteUser from './useHook';

// 링크 만들 때 토큰 인증 부분이 이상해질수도..
// useEffect : 게시글 fetch 계속 렌더링 할 필요가 없을 때
const DeleteUser = () => {
    const data = useDeleteUser();
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
