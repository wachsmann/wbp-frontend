
import { getUser, serviceBoy } from '../../shared/helpers'

import BaseService from './BaseService'

const messageCodes = { FETCH_FAILURE: "routing/fetch_failure" }


class RoutingService extends BaseService {

    getList = (payload = null, service = serviceBoy) => async dispatch => {
        
        dispatch(this.actions.requestGetItems({}));
   
        const url = `/routing/all/${getUser().id}`
        
        return service.get(url).then((res)=>{
            dispatch(this.actions.requestGetItemsSuccess(res.data))
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
    solve = (payload)=>async dispatch=>{
        dispatch(this.actions.requestSolution(payload));
    }
    solution = (payload)=>async dispatch=>{
        dispatch(this.actions.routeSolution(payload));
    }
    store = (data, history, service = serviceBoy) => async dispatch => {
        dispatch(this.actions.requestStore(data));
        return service.post("/routing", data)
            .then(
                res => {
                    dispatch(this.actions.storeSuccess())
                    history.push("/app")
                }
            )
            .catch((error) => {
                dispatch(this.actions.storeFail({ error: { code: messageCodes.FETCH_FAILURE } }))
               
            })
    }

    storeSuccess = (history) => async dispatch => {
        dispatch(this.actions.requestStoreSuccess());
    }
    update = (routing, history, service = serviceBoy) => async dispatch => {
     
        dispatch(this.actions.requestUpdate({ routing }));
        return service.put(`/routing/${routing.id}`,routing)
            .then(
                res => {
                    dispatch(this.actions.storeSuccess({}))
                    history.push('/app');
                }
            )
            .catch((error) => {
                dispatch(this.actions.storeFail({ error: { code: messageCodes.FETCH_FAILURE } }))
                //notificationDispatcherBoy({color: notificationColorOptions.error,message:messageCodes.FETCH_FAILURE})
            })
    }

    delete = (id, service = serviceBoy) => async dispatch => {
        dispatch(this.actions.requestDelete({}));

        return service.delete(`/routing/${id}`)
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
