import { IRootState } from "@/interfaces/IRootStore.ts";
import { EPopupType, IPopupStore } from "@/interfaces/IPopupStore.ts";

export const getPopupsState = (state: IRootState): IPopupStore => state.popup;
export const getAuthPopupState = (state: IRootState): boolean => getPopupsState(state).popups[EPopupType.AUTH] || false;