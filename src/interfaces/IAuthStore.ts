import { EAuthStage } from "@/constants/EAuth.ts";

export interface IAuthStore {
    isAuthorized: boolean;
    isLoading: boolean;
    stage: EAuthStage;
    credential?: IAuthCredential,
    target: string;
}

export interface IAuthCredential {
    login: string;
}

export interface IAuthTokensData {
    accessToken: string;
    refreshToken: string;
}
export interface IAuthReturnData extends IAuthTokensData {
    userId?: string;
}