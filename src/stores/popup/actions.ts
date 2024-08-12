import { EPopupType } from "@/interfaces/IPopupStore.ts";
import { TAppDispatch } from "@/interfaces/IRootStore.ts";
import { actions } from "@/stores/popup";

export const setStateAuthPopup = (set: boolean = true) => {
    return (dispatch: TAppDispatch) => {
        dispatch(actions.setStatePopup({ type: EPopupType.AUTH, set }));
    };
};