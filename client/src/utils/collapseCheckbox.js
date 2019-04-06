import React, { Component } from 'react'
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'; 
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp'; 


export default class CollapseCheckBox extends Component {

    state = {
        open: false,
        checked:[]
    }

    componentDidMount() {

        if(this.props.initState){
            this.setState({
                    open : this.props.initState
            })
        }

    }

    state = {
        open: false, 
        checked: []
    }

    handleClick = () =>{
        this.setState({ open: !this.state.open })
    }

    handleAngle = () =>  (
            this.state.open ? <FontAwesomeIcon icon={faAngleUp} /> : <FontAwesomeIcon icon={faAngleDown}/> 
   )

   handleToggle= value  => () => {
    const {checked} = this.state; 
    const currentIndex = checked.indexOf(value); 
    const newChecked = [...checked]

    if(currentIndex === -1){
        newChecked.push(value)
    }else {
        newChecked.splice(currentIndex,1)
    }

    this.setState({
        checked: newChecked
    }, () =>{
        this.props.handleFilters(newChecked)
    })

    
}

   renderList=() => (
       this.props.list ? this.props.list.map((item, i) => (
        <ListItem key={item._id} style={{padding: '10px 0 '}}>
            <ListItemText primary={item.name}/>
            <ListItemSecondaryAction>
                <Checkbox color="primary" onChange={ this.handleToggle(item._id)} checked={this.state.checked.indexOf(item._id) !== -1 ? true : false} />
            </ListItemSecondaryAction>

        </ListItem>    
       )): null
   )

  render() {
    return (
      <div className="collapse_items_wrapper">
            <List style={{borderBottom: '1px solid #dbdbdb'}}>

                <ListItem onClick={this.handleClick}  style={{padding: '10px 23px 10 px 0 '}} >
                  <ListItemText primary={this.props.title} className="collapse_title" /> 
                  {this.handleAngle()}  
                </ListItem>
                <Collapse in = {this.state.open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {this.renderList()}
                   </List>
                </Collapse>

            </List>
      </div>
    )
  }
}
