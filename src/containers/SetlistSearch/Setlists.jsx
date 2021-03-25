import React, { useState } from 'react';
import PropTypes from 'prop-types';
import SetlistSearchField from './SetlistSearchField';

export const Setlists = ({ onClick }) => {
  const [setlistId, setSetlistId] = useState('');

  const handleChange = (event) => {
    setSetlistId(event.target.value);
  }

  const handleClick = (event) => {
    event.preventDefault();
    onClick(setlistId);
  }

  return (
    <div className='App-field'>
      <SetlistSearchField onSubmit={handleClick} onChange={handleChange} setlistId={setlistId} />

      <div id='instructions'>
        <p>Search for your favorite artist and performance from <a href='https://www.setlist.fm/' target="_blank" rel="noopener noreferrer">Setlist.fm</a></p>
        <p>Find the Setlist ID from the URL of your chosen performance like below and enter in the field above</p>
        <img src='https://spotset.s3.amazonaws.com/Screen+Shot+2019-07-18+at+12.54.38+AM.png' alt='location of setlist id' />
      </div>

      <p><br /><br />Search for setlists by artist coming soon!</p>
    </div>
  )
}

Setlists.propTypes = {
  onClick: PropTypes.func
}

Setlists.defaultProps = {
  onClick: () => { }
}

export default Setlists;
