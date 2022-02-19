import { createSlice } from '@reduxjs/toolkit';

interface IState {
    startTime: string;
    term: string;
    categoriesResult: {
        description: string;
        value: string;
    }[];
    temporaryMember: boolean;
}

const initialState: IState = {
    startTime: '',
    term: '',
    categoriesResult: [],
    temporaryMember: true,
};

export const rootReducer = createSlice({
    name: 'rootReducer',
    initialState: initialState,
    reducers: {
        updatestartTime: (state, { payload }) => {
            state.startTime = payload;
        },
        updateTerm: (state, { payload }) => {
            state.term = payload;
        },
        updateCategoriesResult: (state, { payload }) => {
            state.categoriesResult = payload;
        },
        updateTemporaryMember: (state, { payload }) => {
            state.temporaryMember = payload;
        },
    },
});

export const {
    updatestartTime,
    updateTerm,
    updateCategoriesResult,
    updateTemporaryMember,
} = rootReducer.actions;

export default rootReducer.reducer;
