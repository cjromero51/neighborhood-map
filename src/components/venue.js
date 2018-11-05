import React, { Component } from 'react';

class VenueItem extends Component {
  render(){
    return(
        <li role="button" tabIndex="1" className='listed-items' onClick={() => this.props.clickedVenue(this.props)}>
        {this.props.name}
        </li>
    )
  }
}

export default VenueItem
