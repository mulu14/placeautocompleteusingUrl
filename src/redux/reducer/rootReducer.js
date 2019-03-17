import {combineReducers } from 'redux'
import smhiReducer  from './smhireducer/smhiReducer'
import autoCompleteReducer from './autocompletereducer/autocomplteReducer'
import placeDeatilreducer from './placedetialreducer/placedetailreducer'




const rootReducer = combineReducers({
    authcomplete: autoCompleteReducer, 
    weather: smhiReducer, 
    placedetail: placeDeatilreducer
})

export default rootReducer; 
