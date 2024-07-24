export const enum EAuthSignType {
    MICROSOFT = 'Microsoft',
    GOOGLE = 'Google',
}

export const enum EAuthStage {
    AUTH_STAGE_SIGN = 'AUTH_STAGE_SIGN',
    AUTH_STAGE_SIGN_EMAIL = 'AUTH_STAGE_SIGN_EMAIL',
    AUTH_STAGE_REQUEST_ACCESS = 'AUTH_STAGE_REQUEST_ACCESS',
    AUTH_STAGE_REQUEST_ACCESS_SUCCESS = 'AUTH_STAGE_REQUEST_ACCESS_SUCCESS',
    AUTH_STAGE_REQUEST_ACCESS_ERROR = 'AUTH_STAGE_REQUEST_ACCESS_ERROR',
}
