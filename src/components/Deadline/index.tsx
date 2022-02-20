import { useSelector, useDispatch } from '../../redux/hooks';
import { shallowEqual } from 'react-redux';
import { updatestartTime, updateTerm } from '../../redux/rootReducer';
import { useEffect } from 'react';

const Deadline = () => {
    const dispatch = useDispatch(); // 수정

    const { startTime, term } = useSelector(
        (state) => ({
            startTime: state.startTime,
            term: state.term,
        }),
        shallowEqual // 객체 반환할 때 필요
    );

    useEffect(() => {
        dispatch(updatestartTime(''));
        dispatch(updateTerm(''));
    }, []);

    return (
        <>
            <div>
                <span id='deadline'>기한</span>
                <label>Start date:</label>
                <input
                    type='date'
                    id='start'
                    min='2022-02-20'
                    max=''
                    value={startTime}
                    onChange={(e) => dispatch(updatestartTime(e.target.value))}
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
