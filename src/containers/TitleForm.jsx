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

    if (this.props.saveTitleHandler) {
      this.props.saveTitleHandler(this.state.newTitle);
    }
  }

  render() {
    const { newTitle } = this.state;

    return (
      <div className="App-field">
        <form>
          <input id='title' name='newTitle' type='text' value={ newTitle } onChange={ this.onInput } />
        </form>
      </div>
    )
  }
}
