import { IAuthStore } from "@/interfaces/IAuthStore.ts";
import { IRootState } from "@/interfaces/IRootStore.ts";

export const selectAuthState = (state: IRootState): IAuthStore => state.auth;
export const selectIsAuthorized = (state: IRootState): IAuthStore["isAuthorized"] => selectAuthState(state).isAuthorized;
export const selectIsLoading = (state: IRootState): IAuthStore["isLoading"] => selectAuthState(state).isLoading;
export const selectAuthStage = (state: IRootState): IAuthStore["stage"] => selectAuthState(state).stage;
export const selectAuthRedirectTarget = (state: IRootState): IAuthStore["target"] => selectAuthState(state).target;