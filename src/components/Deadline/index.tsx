import axios from 'axios';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';
import { updateStart_time, updateTerm } from '../../redux/rootReducer';

const Deadline = () => {
    const dispatch = useDispatch(); // 수정

    const { start_time, term } = useSelector(
        (state) => ({
            start_time: state.start_time,
            term: state.term,
        }),
        shallowEqual // 객체 반환할 때 필요
    );
    return (
        <>
            <div>
                <span id='deadline'>기한</span>
                <label>Start date:</label>
                <input
                    type='date'
                    id='start'
                    min='2022-02-14'
                    max=''
                    value={start_time}
                    onChange={(e) => dispatch(updateStart_time(e.target.value))}
                />
                <label>
                    Pick your deadline for the challenge:
                    <select
                        value={term}
                        onChange={(e) => {
                            dispatch(updateTerm(e.target.value));
                        }}
                    >
                        <option value={7}>1주</option>
                        <option value={14}>2주</option>
                        <option value={21}>3주</option>
                    </select>
                </label>
            </div>
        </>
    );
};

export default Deadline;
