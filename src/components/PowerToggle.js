import React from 'react';
import '../PowerToggle.css';

function PowerToggle({ isPowerOn, setIsPowerOn }) {
  return (
    <>
      <p>power Toggle</p>
      <input
        onChange={setIsPowerOn}
        checked={isPowerOn}
        type='checkbox'
        className='powerToggle-checkbox'
        id={`toggle`}
      />
      <label
        style={{ background: isPowerOn && '#06D6A0' }}
        className='powerToggle-label'
        htmlFor={`toggle`}
      >
        <span className='powerToggle-btn' />
        <span
          style={{ left: !isPowerOn && '55px' }}
          className='powerToggle-status'
        >
          {isPowerOn ? 'ON' : 'OFF'}
        </span>
      </label>
    </>
  );
}

export default PowerToggle;
