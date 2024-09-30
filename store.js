import { configureStore, createSlice } from "@reduxjs/toolkit";

const reportFetchTriggerSlice = createSlice({
    name: 'reportFetchTrigger',
    initialState: {
        triggerUpdate: false
    },
    reducers: {
        reportUpdateAction: (state) => {
            state.triggerUpdate = !state.triggerUpdate;
        },
        reportTriggerReset: (state) => {
            state.triggerUpdate = false;
        },
    }
});

export const { reportUpdateAction, reportTriggerReset } = reportFetchTriggerSlice.actions;

const store = configureStore({
    reducer: {
        report: reportFetchTriggerSlice.reducer,
    },
});

export default store;