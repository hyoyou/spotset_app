import React, { Component } from 'react';

export default class Setlist extends Component {
  render() {
    const { setlist } = this.props;

    return (
      <div className="SetlistView">
        { setlist.artist && (
          <h2>{ setlist.artist.name } at { setlist.venue.name } on { setlist.eventDate }</h2>
        )}

        { setlist.sets &&
          setlist.sets.set.map((act, id) => {
            return (
              <div key={id}>
                <h3>Act {id + 1}:</h3>
                <ul>
                  {act.song.map((track, id) => {
                    return (
                      <li key={id}>{track.name}</li>
                    )
                  })}
                </ul>
              </div>
            )
          }) 
        }
      </div>
    );
  }
}