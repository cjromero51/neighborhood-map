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
      <div className="searchbar" >
        <input
          type="search"
          placeholder="Search"
          onChange={(event) => this.inputChange(event.target.value)}
          value={this.state.query.value}
          />
        <form>
          <button onClick={(event) => {
            event.preventDefault();
            this.filterVenues(this.state.query.value);
          }}>Submit</button>
        </form>
      </div>
    );
  }
}

export default Searchbar;
