import React from 'react';
import Button from '../../components/Button/Button';

export const SetlistSearchField = ({ onSubmit, onChange, setlistId }) => {
  return (
    <form onSubmit={onSubmit}>
      <input id='setlistId' type='text' value={setlistId} onChange={onChange} placeholder='Enter setlist ID' />

      <Button id='btn-setlistId' onClick={onSubmit}>
        Display Setlist
      </Button>
    </form>
  )
}

export default SetlistSearchField;
