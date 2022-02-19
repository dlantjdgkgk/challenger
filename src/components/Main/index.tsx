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
} from '../style';
import Link from 'next/link';
import { faEdit, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useMain from './useHook';
import Modal from 'react-modal';
import { useState } from 'react';
import { updateTemporaryMember } from '../../redux/rootReducer';
import { useSelector, useDispatch } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';

const Main = () => {
    const {
        cookies,
        currentSlide,
        slideRef,
        PrevSlide,
        NextSlide,
        category_data,
        images,
    } = useMain();
    const dispatch = useDispatch();

    const { temporaryMember } = useSelector(
        (state) => ({
            temporaryMember: state.temporaryMember,
        }),
        shallowEqual // 객체 반환할 때 필요
    );

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

                <Modal
                    isOpen={!temporaryMember}
                    onRequestClose={() => dispatch(updateTemporaryMember(true))}
                >
                    <p>
                        회원가입후 정식회원 이용하는 법 : 이메일을 확인해주세요
                    </p>
                </Modal>

                <Container>
                    <Text>
                        <p>{currentSlide + 1}/6</p>
                    </Text>
                    <SliderContainer ref={slideRef}>
                        <SliderContainer>
                            {category_data?.data?.result.map(
                                (categories, i) => {
                                    return (
                                        <div>
                                            <Link
                                                href={`/category?value=${categories.value}`}
                                            >
                                                <img
                                                    src={`/${images[i]}.jpg`}
                                                    width='1000'
                                                    height='500'
                                                ></img>
                                            </Link>
                                        </div>
                                    );
                                }
                            )}
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
                    {category_data?.data?.result.map((categories, i) => {
                        return (
                            <div className='image'>
                                <Link
                                    href={`/category?value=${categories.value}`}
                                >
                                    <img
                                        src={`/${images[i]}.jpg`}
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
