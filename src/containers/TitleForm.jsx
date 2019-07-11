import React, { Component } from 'react';

export default class TitleForm extends Component {
  state = {
    newTitle: '',
  }

  componentDidUpdate(prevProps) {
    if (this.props.title !== prevProps.title) {
      this.setState({
        newTitle: this.props.title
      })
    }
  }

  onInput = (event) => {
    this.setState({
      newTitle: event.target.value
    })
  }

  onClick = (event) => {
    event.preventDefault();
    this.props.saveTitleHandler(this.state.newTitle);
  }

  render() {
    const { newTitle } = this.state;

    return (
      <div className="App-field">
        <form onSubmit={ this.onClick }>
          <input id='title' name='newTitle' type='text' value={ newTitle } onChange={ this.onInput } />
          <input id='btn-title' type='submit' value='Update Title' />
        </form>
      </div>
    )
  }
}
