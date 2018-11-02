import React, { Component } from 'react';

class VenueItem extends Component {
  render(){
    return(
        <li className='listed-items' onClick={() => this.props.clickedVenue(this.props)}>
        {this.props.name}
        </li>
    )
  }
}

export default VenueItem
