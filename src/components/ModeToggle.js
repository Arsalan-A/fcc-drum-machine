import React from 'react';
import '../PowerToggle.css';

function ModeToggle({ changeMode, setChangeMode }) {
  return (
    <>
      <p>Mode Toggle</p>
      <input
        onChange={setChangeMode}
        checked={changeMode}
        type='checkbox'
        className='powerToggle-checkbox'
        id={`mode-toggle`}
      />
      <label
        style={{ background: changeMode && '#06D6A0' }}
        className='powerToggle-label'
        htmlFor={`mode-toggle`}
      >
        <span className='powerToggle-btn' />
        <span
          style={{ left: !changeMode && '55px' }}
          className='powerToggle-status'
        >
          {changeMode ? 'ON' : 'OFF'}
        </span>
      </label>
    </>
  );
}

export default ModeToggle;
