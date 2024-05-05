import { createSlice } from '@reduxjs/toolkit';
import { IAuthStore } from "@/interfaces/IAuthStore.ts";

const initialState: IAuthStore = {
    token: undefined,
    isAuthorized: false,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        // setDraggedItem: (state, action: PayloadAction<ISidebarState["draggedItem"]>) => {
        //     state.draggedItem = action.payload;
        //     return state;
        // },
        // setItems: (state, action: PayloadAction<ISidebarState["items"]>) => {
        //     // const payload = action?.payload || [];
        //     // const history = [...Array.from(state.itemsHistory), payload].reduce((acc, items) => {
        //     //     if (!items.length) return acc;
        //     //     return [...acc, items];
        //     // }, []);
        //     // state.itemsHistory = history;
        //     state.items = action?.payload || [];
        //
        //     return state;
        // },
        // setShowPopup: (state, action: PayloadAction<ISidebarState["showPopup"]>) => {
        //     state.showPopup = action.payload;
        //     return state;
        // },
    }
});

const { reducer, actions } = authSlice;

export { reducer, actions };
export default reducer;