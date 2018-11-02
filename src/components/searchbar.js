import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: '',
    venues: this.props.venues,

  }
  inputChange = (query) => {
    this.setState({ query }, () => {
      console.log(this.state.query)
    })
  }

  filterVenues = (query) => {

  }
  render() {
    return (
      <div className="search-container">
        <input
          id={"search-bar"}
          type="search"
          placeholder="Search"
          onChange={(event) => this.inputChange(event.target.value)}
          value={this.state.query.value}
          />
      </div>
    );
  }
}

export default Searchbar;
//
// <form>
//   <button onClick={(event) => {
//     event.preventDefault();
//     this.filterVenues(this.state.query.value);
//   }}>Submit</button>
// </form>
