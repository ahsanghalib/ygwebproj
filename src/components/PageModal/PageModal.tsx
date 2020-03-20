import React from 'react';
import Scrollbars from 'react-custom-scrollbars'
import Button from '@material-ui/core/Button'
import Close from '@material-ui/icons/Close';
import {shallowEqual, useDispatch, useSelector} from 'react-redux'
import {pageModalAction} from '../../store/Actions'
import {AppStateType, PageModelEnum} from '../../types'
import classes from './PageModal.module.scss'
import SingleProduct from '../ProductSlider/SingleProduct'
import BusinessDetail from '../Business/BusinessDetail'
import ManagementDetail from '../Management/ManagementDetail'
import Pagination from '../Pagination/Pagination'

function PageModal() {
    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)
    const dispatch = useDispatch()


    return (
        <div className={'full_screen'} style={{transformOrigin: "50% 0"}}>
            <Scrollbars style={{height: '100vh'}}>
                <div style={{padding: '25px'}}>
                    <div className={classes.TopBar}>
                        <div className={classes.BarTitle}>
                            {store.pageModalTitle}
                        </div>
                        <div>
                            <Button
                                type={"button"}
                                size={"large"}
                                onClick={() => dispatch(pageModalAction(false, 0, 0, PageModelEnum.NONE, ''))}>
                                <Close/>Close
                            </Button>
                        </div>
                    </div>

                    {store.pageModalType === PageModelEnum.prod ? (
                        <SingleProduct/>
                    ) : null}

                    {store.pageModalType === PageModelEnum.com ? (
                        <BusinessDetail/>
                    ) : null}

                    {store.pageModalType === PageModelEnum.mange ? (
                        <ManagementDetail/>
                    ) : null}

                </div>
                <div className={classes.Pagination}>
                    <Pagination/>
                </div>
            </Scrollbars>
        </div>
    )
}

export default PageModal