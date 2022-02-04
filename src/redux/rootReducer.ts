import { createSlice } from '@reduxjs/toolkit';

interface IState {
    startdate: string;
    selectdate: string;
}

const initialState: IState = {
    startdate: '',
    selectdate: '',
};

export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState: initialState,
    reducers: {
        updateStartdate: (state, { payload }) => {
            state.startdate = payload;
        },
        updateSelectdate: (state, { payload }) => {
            state.selectdate = payload;
        },
    },
});

export const { updateStartdate, updateSelectdate } = rootReducer.actions;

export default rootReducer.reducer;
