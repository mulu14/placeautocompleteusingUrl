import React from "react";
import {connect} from 'react-redux'
import {withRouter} from 'react-router'
import autocomplete from './../../redux/api/autocomplete/autocomplete'
import getPlaceDetail from './../../redux/api/placedetail/placedetail'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import isEmpty from 'lodash/isEmpty'
class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      placename: '', 
      suggestionsList: [], 
      place_id: ''
    }
  }

  handleChange =(e)=>{
    const value = e.target.value; 

    let suggestions = []; 
    if(value.length > 0){
        suggestions = this.props.placesuggestion.length !==0? this.props.placesuggestion:[];
    }
    this.setState({
        ...this.state, 
        suggestionsList: suggestions, 
        placename: value
    })
     this.props.autocomplete(value)
}
suggestedSelected =(data)=>{
  this.setState({
      placename: data.place,
      place_id: data.place_id, 
      suggestionsList: []
  })
}
 
 getUniquePlace =(arr, comp) =>{
  const unique = arr
       .map(e => e[comp])
       .map((e, i, final) => final.indexOf(e) === i && i)
       .filter(e => arr[e]).map(e => arr[e]);
   return unique;
}

  renderSuggetionList =()=>{
    if(this.state.suggestionsList.length === 0){
        return null; 
    }
    let place = "place_id"; 
    const  uniqueplaces = this.getUniquePlace(this.state.suggestionsList.flat(), place); 
    return (
        <List>
            {uniqueplaces.map((data)=>
              <ListItem key={data.place_id} onClick={()=>this.suggestedSelected(data)}>{data.place}</ListItem>
            )}
        </List>
    )
  }

  handleSubmit =()=>{
    const requestPlaceDetail = Object.assign({
      place_id: this.state.place_id
    })
    this.props.getPlaceDetail(requestPlaceDetail)
  }

  render() {
    
    return (
      <Card>
          <CardContent>
            <input
                value={this.state.placename}
                name="placename"
                onChange={this.handleChange}
                id="autocomplete"
                placeholder="Enter your address"
                type="text"
            />
            {this.renderSuggetionList()}
            </CardContent>
    <CardActions>{ !isEmpty(this.state.place_id)?<Button onClick={this.handleSubmit}>Search</Button>:null}</CardActions>
      </Card>
    );
  }
}

const mapStateToProps =state =>{
  return{
      onprogress : state.authcomplete.onprogress, 
      placesuggestion: state.authcomplete.placesuggestion || []

  }
}
const mapDispatchToProps=dispatch=>{
  return {
    autocomplete: data =>dispatch(autocomplete(data)), 
    getPlaceDetail :param =>dispatch(getPlaceDetail(param))
  }
} 

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Autocomplete));