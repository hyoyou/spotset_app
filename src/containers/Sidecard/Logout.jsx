import React from 'react';
import PropTypes from 'prop-types';

export const Logout = ({ logOutHandler }) => {
  return (
    <div className="Logout">
      <button id="btn-spotify" onClick={logOutHandler} type="button">Log Out</button>
    </div>
  );
}

Logout.propTypes = {
  logOutHandler: PropTypes.func.isRequired
}

export default Logout;