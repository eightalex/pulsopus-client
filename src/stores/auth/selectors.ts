import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";

export const getAuthState = (state: IRootState): IAuthStore => state.auth;

export const getIsAuthorized = (state: IRootState): IAuthStore["isAuthorized"] => getAuthState(state).isAuthorized;