import axios from 'axios';
import Router from 'next/router';
import { useState, useEffect } from 'react';
import { Form } from './style';
import { useSelector, useDispatch } from '../redux/hooks';
import { shallowEqual } from 'react-redux';
import { updateSelectdate, updateStartdate } from '../redux/rootReducer';

const Deadline = () => {
    const dispatch = useDispatch(); // 수정

    const { startdate, selectdate } = useSelector(
        (state) => ({
            startdate: state.startdate,
            selectdate: state.selectdate,
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
                    min='2022-01-01'
                    max='2022-02-28'
                    value={startdate}
                    onChange={(e) => dispatch(updateStartdate(e.target.value))}
                />
                <label>
                    Pick your deadline for the challenge:
                    <select
                        value={selectdate}
                        onChange={(e) => {
                            dispatch(updateSelectdate(e.target.value));
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
