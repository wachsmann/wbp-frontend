
import { serviceBoy } from '../../shared/helpers'

import BaseService from './BaseService'

const messageCodes = { FETCH_FAILURE: "routing/fetch_failure" }


class RoutingService extends BaseService {

    getSingleList = (path, service = serviceBoy) => async dispatch => {
        dispatch(
            this.actions.requestGetItems()
        )

        return service.get(`/routing`)
        .then(
            res => {
                dispatch(this.actions.requestGetItemsSuccess({list: res.data }))
            }
        )
        .catch((error) => {
            dispatch(this.actions.requestGetItemsError({ error: { code: messageCodes.FETCH_FAILURE } }))
        })
    }
    getList = (payload = null, service = serviceBoy) => async dispatch => {
        
        dispatch(this.actions.requestGetItems({}));
   
        const url = `/routing/${payload.page}/${payload.rowsPerPage}`
        
        return service.get(url).then((res)=>{
            const actionData = payload ? {
                list: {
                    page:res.data.pageable.pageNumber,
                    data:res.data.content,
                    totalCount:res.data.totalElements,
                    rowsPerPage:res.data.pageable.pageSize,
                }
            } : {
                list: {
                    page: 0,
                    data:res.data,
                    totalCount: 0,
                    rowsPerPage: 10,
                }
            }
            dispatch(this.actions.requestGetItemsSuccess(actionData))
        }).catch((error)=>{
            console.log(error)
            //notificationDispatcherBoy({color: notificationColorOptions.error,message:messageCodes.FETCH_FAILURE})
        })
    }

    getItem = (id) => async dispatch => {
        if (id) {
            return serviceBoy.get(`/routing/${id}`).then((res)=>{
                dispatch(this.actions.requestGetItemSuccess(
                    {
                        item: res.data
                    }
                ))
            }).catch((error)=>{
                //notificationDispatcherBoy({color: notificationColorOptions.error,message:messageCodes.FETCH_FAILURE})
            })
        } else {
            dispatch(this.actions.requestGetItemSuccess({ item: {} }))
        }
    }

    store = (routing, history, service = serviceBoy) => async dispatch => {
     
        dispatch(this.actions.requestStore(routing));
        return service.post("/routing", routing)
            .then(
                res => {
                    dispatch(this.actions.storeSuccess({}))
                    //notificationDispatcherBoy({color:"success",message:"service.dataSuccessfulMessage"})
                    history.push('/app/roteirizacao/inicio');
                }
            )
            .catch((error) => {
                dispatch(this.actions.storeFail({ error: { code: messageCodes.FETCH_FAILURE } }))
                //notificationDispatcherBoy({color: notificationColorOptions.error,message:messageCodes.FETCH_FAILURE})
            })
    }

    update = (routing, history, service = serviceBoy) => async dispatch => {
     
        dispatch(this.actions.requestUpdate({ routing }));
        return service.put("/routing",routing)
            .then(
                res => {
                    dispatch(this.actions.storeSuccess({}))
                    //notificationDispatcherBoy({color:"success",message:"service.dataSuccessfulMessage"})
                    history.push('/app/roteirizacao/inicio');
                }
            )
            .catch((error) => {
                dispatch(this.actions.storeFail({ error: { code: messageCodes.FETCH_FAILURE } }))
                //notificationDispatcherBoy({color: notificationColorOptions.error,message:messageCodes.FETCH_FAILURE})
            })
    }

    delete = (id, service = serviceBoy) => async dispatch => {
        dispatch(this.actions.requestDelete({}));

        return service.delete("/routing/" + id)
            .then(
                res => { 
                    dispatch(this.actions.deleteSuccess({}))
                    //notificationDispatcherBoy({color:"success",message:"service.dataSuccessfulMessage"})
                }
            )
            .catch((error) => { 
                dispatch(this.actions.deleteFail({ error: { code: messageCodes.FETCH_FAILURE } }))
                //dispatch(notificationDispatcherBoy({color: notificationColorOptions.error, message: 'Não é permitido excluir o grupo pois existem passageiros relacionados' }))
        })
    }

}

export default RoutingService;
