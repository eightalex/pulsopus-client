import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EPopupType, IPopupStore } from "@/interfaces/IPopupStore.ts";

const initialState: IPopupStore = {
    popups: {
        [EPopupType.AUTH]: false,
    },
};

export const popupSlice = createSlice({
    name: 'popup',
    initialState,
    reducers: {
        setOpenPopup: (state, action: PayloadAction<keyof typeof EPopupType>) => {
            if(!action.payload) return state;
            state.popups = { ...state.popups, [action.payload]: true };
            return state;
        },
        setClosePopup: (state, action: PayloadAction<keyof typeof EPopupType>) => {
            if(!action.payload) return state;
            state.popups = { ...state.popups, [action.payload]: false };
            return state;
        },
        setTogglePopup: (state, action: PayloadAction<keyof typeof EPopupType>) => {
            if(!action.payload) return state;
            const prevValue = state.popups[action.payload] || false;
            state.popups = { ...state.popups, [action.payload]: !prevValue };
            return state;
        },
    }
});

const { reducer, actions } = popupSlice;

export { reducer, actions };
export default reducer;