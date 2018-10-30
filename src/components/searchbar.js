import React, { Component } from 'react';

class Searchbar extends Component {
  state = {
    query: ''
  }
  inputChange = (query) => {
    this.setState({ query }, () => {
      console.log(this.state.query)
    })

  }
  render() {
    return (
      <div className="searchbar">
        <input
          type="search"
          placeholder="Type what you're looking for"
          onChange={(event) => this.inputChange(event.target.value)}
          value={this.state.query.value}
          />
      </div>
    );
  }
}

export default Searchbar;
