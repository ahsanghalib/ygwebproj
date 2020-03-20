import {
    AppStatusActionType,
    NextPaginationActionType,
    PageModalActionType,
    PageModelEnum,
    PrevPaginationActionType
} from '../types'

export function appStatusAction(loading: boolean, error: boolean, responseText: string): AppStatusActionType {
    return {
        type: 'APP STATUS',
        error,
        loading,
        responseText
    }
}

export function pageModalAction(show: boolean, index: number, total: number, pageType: PageModelEnum, title: string): PageModalActionType {
    return {
        type: 'PAGE MODAL',
        showPageModal: show,
        pageModalType: pageType,
        pageModalTitle: title,
        pageTotal: total,
        pageIndex: index
    }
}

export function nextPaginationAction (): NextPaginationActionType {
    return {
        type: 'NEXT PAGINATION'
    }
}

export function prevPaginationAction () : PrevPaginationActionType {
    return {
        type: 'PREV PAGINATION'
    }
}
