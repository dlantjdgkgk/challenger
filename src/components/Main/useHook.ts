import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useSelector } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';

const useMain = () => {
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
    const [category_data, setcategory_data] = useState(null);
    const images = ['health', 'movie', 'drama', 'routine', 'food', 'music'];

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
    };
};

export default useMain;
