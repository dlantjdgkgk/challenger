import { createSlice } from '@reduxjs/toolkit';

interface IState {
    start_time: string;
    term: string;
    categories_result: {
        description: string;
        value: string;
    }[];
}

const initialState: IState = {
    start_time: '',
    term: '',
    categories_result: [],
};

export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState: initialState,
    reducers: {
        updateStart_time: (state, { payload }) => {
            state.start_time = payload;
        },
        updateTerm: (state, { payload }) => {
            state.term = payload;
        },
        updateCategories_result: (state, { payload }) => {
            state.categories_result = payload;
        },
    },
});

export const { updateStart_time, updateTerm, updateCategories_result } =
    rootReducer.actions;

export default rootReducer.reducer;
