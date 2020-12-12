import React from 'react';
import '../modeToggle.css';
import { CgPiano } from 'react-icons/cg';
import { GiDrum } from 'react-icons/gi';

function ModeToggle({ changeMode, setChangeMode }) {
  return (
    <div className='modeToggle'>
      <label htmlFor='toggle'>MODE</label>
      <input
        onChange={setChangeMode}
        checked={changeMode}
        type='checkbox'
        className='modeToggle-checkbox'
        id={`mode-toggle`}
      />
      <label
        style={{ background: changeMode && '#5ebacc' }}
        className='modeToggle-label'
        htmlFor={`mode-toggle`}
      >
        <span className='modeToggle-btn' />
        <span
          style={{ left: !changeMode && '38px' }}
          className='modeToggle-status'
        >
          {changeMode ? <GiDrum /> : <CgPiano />}
        </span>
      </label>
    </div>
  );
}

export default ModeToggle;
