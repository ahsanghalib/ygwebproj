import produce from "immer";
import {AppAction, AppState, PageModelEnum} from '../types'

const initialState: AppState = {
    pageModalTitle: '',
    pageModalType: PageModelEnum.NONE,
    pageModal: '',
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
                draft.pageModal = action.pageModal;
                draft.showPageModal = action.showPageModal;
                draft.pageModalType = action.pageModalType;
                draft.pageModalTitle = action.pageModalTitle
            })
        default:
            return state;
    }
}

export default Reducer
