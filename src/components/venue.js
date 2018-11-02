import React, { Component } from 'react';



class VenueItem extends Component {
  render(){
    return(
        <li className='listed-items'>
        {this.props.name}
        </li>
    )
  }
}

export default VenueItem
