import api from "@/api/APIRequester.ts";
import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { IRootState, TAppDispatch } from "@/interfaces/IRootStore.ts";
import { selectIsAuthorized } from "@/stores/auth/selectors.ts";
import { actions } from "@/stores/popup";

export const actionAuthGetStart = () => {
    return (dispatch: TAppDispatch, getState: () => IRootState) => {
        const state: IRootState = getState();
        const isAuthorized = selectIsAuthorized(state);
        if(isAuthorized) {
            api.authService.redirectApp();
            return;
        }
        dispatch(actions.setOpenPopup(EPopupType.AUTH));
    };
};