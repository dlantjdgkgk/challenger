import { DIV, Start } from '../style';
import Link from 'next/link';
import { faCheckCircle, faEdit } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMypage from './useHook';

const Mypage = () => {
    const { Logout, userWrite, userParticipant } = useMypage();
    console.log(userWrite);
    console.log(userParticipant);

    return (
        <>
            <Start>
                <DIV>
                    <Link href='/write'>
                        <FontAwesomeIcon icon={faEdit} size='3x' />
                    </Link>
                    <Link href='/'>
                        <img src='/create.PNG' width='100' height='100'></img>
                    </Link>

                    <div>
                        <ul className='function'>
                            <li>
                                <Link href='/'>
                                    <button onClick={Logout}>로그아웃</button>
                                </Link>
                            </li>
                            <li>
                                <Link href='/deleteUser'>
                                    <button>회원탈퇴</button>
                                </Link>
                            </li>
                            <li>
                                <Link href='/resetPassword'>
                                    <button>비밀번호 초기화</button>
                                </Link>
                            </li>
                            <li>
                                <Link href='/updatePassword'>
                                    <button>비밀번호 변경</button>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </DIV>
                <h3>유저가 작성한 게시글</h3>
                <div className='writer'>
                    {userWrite?.result?.map((a) => {
                        return (
                            <div className='image1'>
                                <Link href={`detail?value=${a?.documentId}`}>
                                    <img
                                        src={`${a?.img}`}
                                        width='200px'
                                        height='200px'
                                        className='popular'
                                    />
                                </Link>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        size='2x'
                                    />
                                    <span style={{ padding: '10px' }}>
                                        공식 챌린지
                                    </span>
                                    <br />
                                    <p>{a?.title}</p>
                                    <p>{a?.remaining_days}일 후부터 시작</p>
                                    <span className='text'>매일 </span>
                                    <span className='text_box'>
                                        {a?.term / 7}주 동안
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <div className='participant'>
                    <h3>유저가 참여한 게시글</h3>
                    {userParticipant?.result?.map((a) => {
                        return (
                            <div className='image'>
                                <Link href={`detail?value=${a?.documentId}`}>
                                    <img
                                        src={`${a?.img}`}
                                        width='200px'
                                        height='200px'
                                        className='popular'
                                    />
                                </Link>
                                <div>
                                    <FontAwesomeIcon
                                        icon={faCheckCircle}
                                        size='2x'
                                    />
                                    <span style={{ padding: '10px' }}>
                                        공식 챌린지
                                    </span>
                                    <br />
                                    <p>{a?.title}</p>
                                    <p>{a?.remaining_days}일 후부터 시작</p>
                                    <span className='text'>매일 </span>
                                    <span className='text_box'>
                                        {a?.term / 7}주 동안
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </Start>
        </>
    );
};

export default Mypage;
