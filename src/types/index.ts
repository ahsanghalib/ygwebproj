import {Action} from 'redux'

// App store types

export enum PageModelEnum {
    mange = 'MANAGEMENT PAGE',
    prod = 'PRODUCT PAGE',
    com = 'COMPANY PAGE',
    NONE = 'NONE'
}

export interface AppState {
    loading: boolean
    error: boolean
    responseText: string
    showPageModal: boolean
    pageModal: string
    pageModalType: PageModelEnum
    pageModalTitle: string
}

export interface AppStateType {
    mainStore: AppState;
}


// App action types
export interface AppStatusActionType extends Action {
    type: 'APP STATUS',
    loading: boolean,
    error: boolean,
    responseText: string,
}

export interface PageModalActionType extends Action {
    type: 'PAGE MODAL'
    showPageModal: boolean
    pageModal: string
    pageModalType: PageModelEnum
    pageModalTitle: string
}

export type AppAction = AppStatusActionType | PageModalActionType
