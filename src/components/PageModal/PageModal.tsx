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

function PageModal() {
    const store = useSelector((state: AppStateType) => state.mainStore, shallowEqual)
    const dispatch = useDispatch()


    const prod = () => {
        const img = `./prod/${store.pageModal}`
        return <SingleProduct src={img}/>
    }

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
                                onClick={() => dispatch(pageModalAction(false, '', PageModelEnum.NONE, ''))}>
                                <Close/>Close
                            </Button>
                        </div>
                    </div>

                    {store.pageModalType === PageModelEnum.prod ? prod() : null}

                    {store.pageModalType === PageModelEnum.com ? (
                        <BusinessDetail company={store.pageModal}/>
                    ) : null}
                    
                    {store.pageModalType === PageModelEnum.mange ? (
                        <ManagementDetail id={store.pageModal}/>
                    ): null}
                </div>
            </Scrollbars>
        </div>
    )
}

export default PageModal