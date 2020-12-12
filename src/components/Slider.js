import React from 'react';

function Slider({ value, setValue }) {
  return (
    <div className='slidecontainer'>
      <label htmlFor='myRange'>VOLUME: {value}</label>
      <input
        min={0}
        max={100}
        type='range'
        value={value}
        onChange={setValue}
        className='slider'
        id='myRange'
      />
    </div>
  );
}

export default Slider;
