import {ThunkAction} from 'redux-thunk'
import {AppAction, AppState} from '../types'


type Effect = ThunkAction<any, AppState, any, AppAction>;
