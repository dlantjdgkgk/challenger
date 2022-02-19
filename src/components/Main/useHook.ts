import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCacheApi } from 'react-cache-api';
import { useCookies } from 'react-cookie';
import { useSelector, useDispatch } from '../../redux/hooks';
import { updateTemporaryMember } from '../../redux/rootReducer';
import { shallowEqual } from 'react-redux';

const useMain = () => {
    const TOTAL_SLIDES = 5;
    const [currentSlide, setCurrentSlide] = useState(0);
    const slideRef = useRef(null);
    const [cookies, setCookie] = useCookies([]);
    const [category_data, setcategory_data] = useState(null);
    const images = ['health', 'movie', 'drama', 'routine', 'food', 'music'];
    const dispatch = useDispatch(); // 수정

    const { temporaryMember } = useSelector(
        (state) => ({
            temporaryMember: state.temporaryMember,
        }),
        shallowEqual // 객체 반환할 때 필요
    );

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

    //인기 게시글 조회
    const { data, error, isValidation } = useCacheApi(`/documents-popularity`);

    // 카테고리 항목 조회
    useEffect(() => {
        const appendAPI = async () => {
            setcategory_data(
                await axios.get('https://api.digital-hamster.net/categories')
            );
        };
        appendAPI();
    }, []);
    return {
        cookies,
        currentSlide,
        slideRef,
        PrevSlide,
        NextSlide,
        category_data,
        images,
        data,
    };
};

export default useMain;
