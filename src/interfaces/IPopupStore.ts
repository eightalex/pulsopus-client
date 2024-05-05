
export const enum EPopupType {
    AUTH = 'AUTH'
}

export interface IPopupStore {
    popups: Record<typeof EPopupType[keyof typeof EPopupType], boolean>
}