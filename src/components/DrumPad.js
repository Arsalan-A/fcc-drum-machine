import React, { useState, useRef, useEffect, createRef } from 'react';
import { bankOne, bankTwo } from '../soundbank';
import PowerToggle from './PowerToggle';

function DrumPad() {
  const playRef = useRef(bankOne.map(() => createRef()));

  const [audio, setAudio] = useState('');
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(bankOne);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [changeMode, setChangeMode] = useState(true);

  //Play an Audio file
  const playAudio = (audio) => {
    audio.currentTime = 0;
    audio.play();
  };

  //Play the audio file on button click
  const playOnClick = (index, e) => {
    e.preventDefault();
    if (isPowerOn) {
      //get the current audio file
      const currentAudio = playRef.current[index].current;

      //set the audio
      setAudio(currentAudio);

      //set the index
      setIndex(index);

      //play the audio
      playAudio(currentAudio);
    }
  };

  //play the audio file on key down
  const playOnKeyDown = (e) => {
    e.preventDefault();

    if (isPowerOn) {
      let currentAudio = null;
      //loop through the audio files
      for (let i = 0; i < playRef.current.length; i++) {
        //Get the current keyboard key clicked char and ge the current audio file
        if (e.key.toUpperCase() === playRef.current[i].current.id) {
          currentAudio = playRef.current[i].current;
        }
      }

      if (currentAudio) {
        setAudio(currentAudio);

        //play audio
        playAudio(currentAudio);

        //Get the index of the current audio file in the data
        let index = data
          .map((item) => item.keyTrigger)
          .indexOf(currentAudio.id);

        //Set the index
        setIndex(index);
      } else {
        console.log('Audio Not Found for the key pressed ' + currentAudio);
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', playOnKeyDown);
    return () => window.removeEventListener('keydown', playOnKeyDown);
  });

  return (
    <div className='drumpad-container'>
      <p>DrumPad</p>
      {data.map(({ keyCode, keyTrigger, url }, index) => {
        return (
          <div key={keyCode}>
            <audio
              className='clip'
              id={keyTrigger}
              ref={playRef.current[index]}
            >
              <source src={url} type='audio/mpeg' />
            </audio>
            <button id={keyTrigger} onClick={(e) => playOnClick(index, e)}>
              {keyTrigger}
            </button>
          </div>
        );
      })}
      <PowerToggle
        isPowerOn={isPowerOn}
        setIsPowerOn={() => setIsPowerOn(!isPowerOn)}
      />
    </div>
  );
}

export default DrumPad;
