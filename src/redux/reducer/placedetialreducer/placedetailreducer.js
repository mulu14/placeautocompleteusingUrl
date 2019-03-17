import {SEND_REQUEST_DETAIL, SEND_REQUEST_SUCCESS, SEND_REQUEST_FAIL} from './../../api/placedetail/actiontype'



const initialState = {
    placedetailRequest : '', 
    placedetailSuccess: '', 
    placedetailFail: ''

}

const placeDeatilreducer =(state= initialState, action)=>{
    switch(action.type){
        case SEND_REQUEST_DETAIL: 
        return {
            ...state, 
            placedetailRequest: action.data,
        }
        case SEND_REQUEST_SUCCESS: 
        return {
            ...state, 
            placedetailSuccess: action.data
        }
        case SEND_REQUEST_FAIL: 
        return {
            ...state, 
            placedetailFail: action.data
        }
        default: 
        return state
    }

}

export default placeDeatilreducer; 