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
    pageIndex: number
    pageTotal: number
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
    pageIndex: number
    pageTotal: number
    pageModalType: PageModelEnum
    pageModalTitle: string
}

export interface NextPaginationActionType extends Action {
    type: 'NEXT PAGINATION'
}


export interface PrevPaginationActionType extends Action {
    type: 'PREV PAGINATION'
}

export type AppAction = AppStatusActionType | PageModalActionType | NextPaginationActionType | PrevPaginationActionType
