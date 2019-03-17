import { sendPLacerequest, sendPlacerequestsuccess, sendPlacerequesfail} from './actioncreator'
import requestWeatherData from './../smhi/smhi'


let headers =  new Headers(); 
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');


const getPlaceDetail =(param)=>{
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const urldetail = "https://maps.googleapis.com/maps/api/place/details/json?placeid="+param.place_id+"&key=AIzaSyDWNvL596LmriNUYkkKAQY9_L5Dg9DUz1Q"
    return dispatch=>{
        dispatch(sendPLacerequest(param))
        return fetch(proxyurl + urldetail, {
            method: 'GET',
            mode: "cors", 
            cache: "no-cache", 
            headers: headers,
        })
        .then(response =>response.json())
        .then(data =>{
            dispatch(sendPlacerequestsuccess(data.result.geometry.location))
            dispatch(requestWeatherData(data.result.geometry.location))
        })
        .catch(error =>{
            dispatch(sendPlacerequesfail(error))
        })
    }
}

export default getPlaceDetail; 