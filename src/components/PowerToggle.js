import React from 'react';
import '../PowerToggle.css';

function PowerToggle({ isPowerOn, setIsPowerOn }) {
  return (
    <div className='powerToggle'>
      <label htmlFor={'toggle'}>POWER</label>
      <input
        onChange={setIsPowerOn}
        checked={isPowerOn}
        type='checkbox'
        className='powerToggle-checkbox'
        id='toggle'
      />
      <label
        style={{ background: isPowerOn && '#06D6A0' }}
        className='powerToggle-label'
        htmlFor='toggle'
      >
        <span className='powerToggle-btn' />
        <span
          style={{ left: !isPowerOn && '34px', fontSize: '0.85rem' }}
          className='powerToggle-status'
        >
          {isPowerOn ? 'ON' : 'OFF'}
        </span>
      </label>
    </div>
  );
}

export default PowerToggle;
