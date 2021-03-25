import React, { useState, useEffect } from 'react';
import { faPencilAlt } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import Icon from '../../components/Icon/Icon';
import TextInput from '../../components/Form/TextInput';

export const TitleField = ({ title, saveTitleHandler }) => {
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
        <TextInput id='title' value={newTitle} onChange={handleChange} />
        <Icon id='icon-edit' icon={faPencilAlt} />
      </form>
    </div>
  )
}

TitleField.propTypes = {
  title: PropTypes.string,
  saveTitleHandler: PropTypes.func,
}

TitleField.defaultProps = {
  title: '',
  saveTitleHandler: null,
}

export default TitleField;
