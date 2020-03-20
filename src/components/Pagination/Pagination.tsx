import React from 'react'
import Button from '@material-ui/core/Button'
import NavigateNext from '@material-ui/icons/NavigateNext'
import NavigateBefore from '@material-ui/icons/NavigateBefore'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {nextPaginationAction, prevPaginationAction} from '../../store/Actions'
import {AppStateType} from '../../types'

function Pagination() {

    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)
    const dispatch = useDispatch()

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            maxWidth: '1200px',
            margin: '0 auto',
            paddingLeft: '20px',
            paddingRight: '20px'
        }}>
            <div>
                <Button type={"button"} size={"small"} color="default" variant="contained"
                        disableElevation
                        onClick={() => dispatch(prevPaginationAction())}
                        disabled={store.pageIndex <= 0}
                ><NavigateBefore/>Prev</Button>
            </div>
            <div>
                <Button type={"button"} size={"small"} color="default" variant="contained"
                        disableElevation
                        onClick={() => dispatch(nextPaginationAction())}
                        disabled={(store.pageIndex + 1) >= store.pageTotal}
                >Next<NavigateNext/></Button>
            </div>
        </div>
    )
}

export default Pagination