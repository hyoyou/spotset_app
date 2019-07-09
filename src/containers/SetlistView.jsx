/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import TitleForm from './TitleForm';
import './SetlistView.css';

export default class SetlistView extends Component {
  render() {
    const { saveTitleHandler, setlist, title } = this.props;

    return (
      <div className="SetlistView">
        <TitleForm title={title} saveTitleHandler={saveTitleHandler} />

        { setlist.tracks &&
          <div className="SetlistTable">
            <ol>
              {setlist.tracks.map((track, id) => {
                return <li key={ id }>{ track.name }</li>
              })}
            </ol>
          </div>
        }
      </div>
    );
  }
}