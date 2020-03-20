import produce from "immer";
import {AppAction, AppState, PageModelEnum} from '../types'

const initialState: AppState = {
    pageIndex: 0,
    pageTotal: 0,
    pageModalTitle: '',
    pageModalType: PageModelEnum.NONE,
    showPageModal: false,
    loading: false,
    error: false,
    responseText: ''
}

function Reducer(state = initialState, action: AppAction) {
    switch (action.type) {
        case 'APP STATUS':
            return produce(state, draft => {
                draft.error = action.error;
                draft.loading = action.loading;
                draft.responseText = action.responseText
            })
        case 'PAGE MODAL':
            return produce(state, draft => {
                draft.pageIndex = action.pageIndex;
                draft.pageTotal = action.pageTotal;
                draft.showPageModal = action.showPageModal;
                draft.pageModalType = action.pageModalType;
                draft.pageModalTitle = action.pageModalTitle
            })
        case 'NEXT PAGINATION':
            return produce(state, draft => {
                draft.pageIndex += 1
            })
        case 'PREV PAGINATION':
            return produce(state, draft => {
                draft.pageIndex -= 1
            })
        default:
            return state;
    }
}

export default Reducer
