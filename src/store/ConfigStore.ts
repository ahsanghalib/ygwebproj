import {applyMiddleware, combineReducers, createStore} from 'redux'
import Reducer from './Reducer'
import {composeWithDevTools} from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'

export function rootReducer() {
    return combineReducers({
        mainStore: Reducer
    })
}

export const store = createStore(
    rootReducer(),
    composeWithDevTools(applyMiddleware(thunk))
)