import React, { Component } from 'react';

export default class Setlists extends Component {
  state = {
    setlistId: '',
  }

  onInput = (event) => {
    this.setState({
      setlistId: event.target.value
    })
  }

  onClick = (event) => {
    event.preventDefault();
    this.props.onClick(this.state.setlistId);
  }

  render() {
    const { setlistId } = this.state;

    return (
      <div className="App-field">
        <form onSubmit={ this.onClick }>
          <input id='setlistId' name='setlistId' type='text' value={ setlistId } onChange={ this.onInput } placeholder='Enter setlist ID' />
          
          <input id='btn-setlistId' type='submit' value='Display Setlist' onClick={this.onClick} />
        </form>
        Search for your favorite artist and performance from <a href='https://www.setlist.fm/'>Setlist.fm</a>
      </div>
    )
  }
}