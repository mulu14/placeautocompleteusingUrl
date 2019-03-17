import {SEND_REQUEST_DETAIL, SEND_REQUEST_SUCCESS, SEND_REQUEST_FAIL} from './actiontype'



export const sendPLacerequest =(data)=>{
    return {
        type: SEND_REQUEST_DETAIL, 
        data: data
    }
}

export const sendPlacerequestsuccess=(data)=>{
    return {
        type: SEND_REQUEST_SUCCESS, 
        data: data
    }
}

export const sendPlacerequesfail =(data)=>{
    return{
        type: SEND_REQUEST_FAIL,
        data: data 
    } 
}