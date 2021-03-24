import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

export const TitleForm = ({ title, saveTitleHandler }) => {
  const [newTitle, setNewTitle] = useState(title);

  useEffect(() => {
    setNewTitle(title)
  }, [title]);

  const handleChange = (event) => {
    setNewTitle(event.target.value)

    if (saveTitleHandler) {
      saveTitleHandler(newTitle);
    }
  }

  return (
    <div className="App-field">
      <form>
        <input id='title' name='newTitle' type='text' value={newTitle} onChange={handleChange} />
        <FontAwesomeIcon id='icon-edit' icon={faPencilAlt} />
      </form>
    </div>
  )
}

TitleForm.propTypes = {
  title: PropTypes.string,
  saveTitleHandler: PropTypes.func,
}

TitleForm.defaultProps = {
  title: '',
  saveTitleHandler: null,
}

export default TitleForm;
