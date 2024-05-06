import { EAuthStage } from "@/constants/EAuth.ts";

export interface IAuthStore {
    token?: string;
    isAuthorized: boolean;
    isLoading: boolean;
    stage: EAuthStage;
}

export interface IAuthCredential {
    login: string;
    password: string;
    redirect?: string;
}

export interface IAuthTokensData {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthReturnData extends IAuthTokensData {
    userId?: string;
}