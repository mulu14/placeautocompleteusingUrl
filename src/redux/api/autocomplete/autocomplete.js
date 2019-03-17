import {sendPlacerequest, sucessPlacerequest, failedRequest} from './actioncreator'

let headers =  new Headers(); 
headers.append('Access-Control-Allow-Origin', 'http://localhost:3000');
headers.append('Access-Control-Allow-Credentials', 'true');

const createKeyValuepair =(arr)=>{
  const data =  arr.map(e => Object.assign({
        place: e.description,
        place_id: e.place_id
    }))

    return data; 
}

const  jsUcfirst =(string)=>
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

const autocomplete= (name) => {
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json?input="+jsUcfirst(name)+"&types=geocode&key=AIzaSyDWNvL596LmriNUYkkKAQY9_L5Dg9DUz1Q"
     return (dispatch) => {
        dispatch(sendPlacerequest(jsUcfirst(name)))
        return fetch(proxyurl + url, {
            mode: "cors", 
            cache: "no-cache", 
            headers: headers,
        })
        .then(res => res.json())
        .then(data =>{
             dispatch(sucessPlacerequest(createKeyValuepair(data.predictions)))
        })
        .catch(error =>{
            dispatch(failedRequest(error))
        })
    }}

    export default autocomplete; 
