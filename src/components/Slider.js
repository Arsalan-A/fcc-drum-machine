import React from 'react';

function Slider({ value, setValue }) {
  return (
    <div className='slidecontainer'>
      <input
        min={0}
        max={100}
        type='range'
        value={value}
        onChange={setValue}
        className='slider'
        id='myRange'
      />
      <p>Slider Value: {value}</p>
    </div>
  );
}

export default Slider;
