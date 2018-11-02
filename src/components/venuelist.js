import React, { Component } from 'react';
import VenueItem from './venue';

class VenueList extends Component {
  state = {

  }
  render(){
    return (
      <div>
        <ul className='venue-list'>
        {this.props.venues &&
          this.props.venues.map((venue,index) => (<VenueItem key={index} {...venue}/>
      ))}
        </ul>
      </div>
    )
  }
}


export default VenueList
