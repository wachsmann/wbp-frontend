
import BaseService from './BaseService'
import { setToken } from '../../shared/helpers'
import { serviceBoy} from '../../shared/helpers'

import { setUser } from '../../shared/helpers/authBoy'

const messageCodes = {
    INVALID_INPUT: "Campos inválidos.",
    FETCH_FAILURE: "Não foi possível acessar o sistema. Verifique suas credenciais.",
    SUCCESS_RESET: "Resetado com sucesso!"
}


export default class AuthService extends BaseService {

    logIn = (payload, service = serviceBoy) => async dispatch => {


        const { email, password,history } = payload
        dispatch(this.actions.authRequestAttempt({ email, password }))
        return serviceBoy.post(`/authenticate`,{ username:email, password },false).then((res)=>{
            dispatch(this.actions.authRequestSuccessful(
                {
                    item: res.data
                }
            ))
            setToken(res.data.token)
            setUser(res.data)
            history.push("/app/roteirizacao")
        }).catch((error)=>{
            
            dispatch(this.actions.authRequestFailure(
                {
                    error:{message:"Credenciais inválidas, tente novamente."}
                }
            ))
        })
        
    }
    register = (payload, service = serviceBoy) => async dispatch => {

        const { email, password,history } = payload
        dispatch(this.actions.accountCreationAttempt({ email, password }))
        return serviceBoy.post(`/register`,{ username:email, password },false).then((res)=>{
            dispatch(this.actions.accountCreationSuccessful(
                {
                    item: res.data,
                    error:{}
                }
            ))
            history.push("/log_in")
        }).catch((error)=>{
            dispatch(this.actions.accountCreationFailure(
                {
                    error:{message:"Não foi possível criar sua conta, tente novamente."}
                }
            ))
        })
        
    }
   


}

