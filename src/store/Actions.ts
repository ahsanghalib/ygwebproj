import {AppStatusActionType, PageModalActionType, PageModelEnum} from '../types'

export function appStatusAction(loading: boolean, error: boolean, responseText: string): AppStatusActionType {
    return {
        type: 'APP STATUS',
        error,
        loading,
        responseText
    }
}

export function pageModalAction(show: boolean, modal: string, pageType: PageModelEnum, title: string): PageModalActionType {
    return {
        type: 'PAGE MODAL',
        pageModal: modal,
        showPageModal: show,
        pageModalType: pageType,
        pageModalTitle: title
    }
}
