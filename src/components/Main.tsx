import {
    useState,
    useEffect,
    useRef,
    // useUserState,
    // useUserDispatch,
} from 'react';
import {
    DIV,
    Container,
    SliderContainer,
    Center,
    Button,
    Text,
    Popular,
    Start,
    Category,
} from './style';
import Link from 'next/link';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCookies } from 'react-cookie';
import { useSelector } from '../redux/hooks';
import { shallowEqual } from 'react-redux';

const Main = () => {
    const { categories_result } = useSelector(
        (state) => ({
            categories_result: state.categories_result,
        }),
        shallowEqual // 객체 반환할 때 필요
    );
    const TOTAL_SLIDES = 2;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const [cookies, setCookie] = useCookies([]);
    // const images = ['DRAMA', 'MOVIE', 'FOOD', 'ROUTINE', 'FOOD', 'MUSIC'];

    const NextSlide = () => {
        if (currentSlide >= TOTAL_SLIDES) {
            setCurrentSlide(0);
        } else {
            setCurrentSlide(currentSlide + 1);
        }
    };

    const PrevSlide = () => {
        if (currentSlide === 0) {
            setCurrentSlide(TOTAL_SLIDES);
        } else {
            setCurrentSlide(currentSlide - 1);
        }
    };

    useEffect(() => {
        slideRef.current.style.transition = 'all 0.5s ease-in-out';
        slideRef.current.style.transform = `translateX(-${currentSlide}00%)`;
    }, [currentSlide]);

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
                    <ul className='fucntion'>
                        {!cookies.token ? (
                            <li>
                                <Link href='/login'>
                                    <a>로그인</a>
                                </Link>
                            </li>
                        ) : (
                            <li>
                                <Link href='/mypage'>
                                    <a>마이페이지</a>
                                </Link>
                            </li>
                        )}
                    </ul>
                </DIV>
                <Container>
                    <Text>
                        <p>{currentSlide + 1}/3</p>
                    </Text>
                    <SliderContainer ref={slideRef}>
                        <SliderContainer>
                            <div>
                                <a href='/confirm'>
                                    <img
                                        src='/캡처.png'
                                        width='1000'
                                        height='500'
                                        className='capture'
                                    ></img>
                                </a>
                            </div>
                            <img src='/2.png' width='1000' height='500'></img>
                            <img src='/3.png' width='1000' height='500'></img>
                        </SliderContainer>
                    </SliderContainer>
                    <Center>
                        <Button onClick={PrevSlide}>Prev</Button>
                        <Button onClick={NextSlide}>Next</Button>
                    </Center>
                </Container>
                <h3>인기 추천</h3>

                <Popular>
                    <div className='image'>
                        <hr
                            style={{ width: '100%', border: '3px solid gray' }}
                        />
                        <img
                            src='/health.jpg'
                            width='400px'
                            height='300px'
                            className='popular'
                        ></img>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                            <span style={{ padding: '10px' }}>공식 챌린지</span>
                            <br />
                            <p>아침 공복에 물 한 잔</p>
                            <p>모레부터 시작</p>
                            <span className='text'>매일</span>
                            <span className='text_box'>2주동안</span>
                        </div>
                    </div>
                    <div className='image'>
                        <hr
                            style={{ width: '100%', border: '3px solid gray' }}
                        />
                        <img
                            src='/movie.jpg'
                            width='400px'
                            height='300px'
                            className='popular'
                        ></img>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                            <span style={{ padding: '10px' }}>공식 챌린지</span>
                            <br />
                            <p>아침 공복에 물 한 잔</p>
                            <p>모레부터 시작</p>
                            <span className='text'>매일</span>
                            <span className='text_box'>2주동안</span>
                        </div>
                    </div>
                    <div className='image'>
                        <hr
                            style={{ width: '100%', border: '3px solid gray' }}
                        />
                        <img
                            src='/music.jpg'
                            width='400px'
                            height='300px'
                            className='popular'
                        ></img>
                        <div>
                            <FontAwesomeIcon icon={faCheckCircle} size='2x' />
                            <span style={{ padding: '10px' }}>공식 챌린지</span>
                            <br />
                            <p>아침 공복에 물 한 잔</p>
                            <p>모레부터 시작</p>
                            <span className='text'>매일</span>
                            <span className='text_box'>2주동안</span>
                        </div>
                    </div>
                </Popular>

                <br></br>
                <h3>카테고리</h3>
                <hr style={{ width: '1200px', border: '3px solid gray' }} />
                <Category>
                    {categories_result.map((categories) => {
                        return (
                            <div className='image'>
                                <Link href='/category'>
                                    <img
                                        src='/HEALTH.jpg'
                                        width='190px'
                                        height='150px'
                                        className='category'
                                    ></img>
                                </Link>
                                <div>
                                    <span>
                                        <b>{categories.value}</b>
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </Category>
            </Start>
        </>
    );
};

export default Main;
function dispatch() {
    throw new Error('Function not implemented.');
}
