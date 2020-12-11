import React, { useState, useRef, useEffect, createRef } from 'react';
import { bankOne, bankTwo } from '../soundbank';
import PowerToggle from './PowerToggle';
import ModeToggle from './ModeToggle';

function DrumPad() {
  const [audio, setAudio] = useState('');
  const [index, setIndex] = useState(0);
  const [data, setData] = useState(bankOne);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [changeMode, setChangeMode] = useState(true);

  const audioRef = useRef([]);

  //Play an Audio file
  const playAudio = (audio) => {
    //reset the audiio play
    audio.currentTime = 0;

    //Reload the audio when source changes
    audio.load();

    //play the audio
    audio.play();
  };

  //Play the audio file on button click
  const playOnClick = (index, e) => {
    e.preventDefault();
    if (isPowerOn) {
      //get the current audio file
      const currentAudio = audioRef.current[index];
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
    // console.log(data);

    if (isPowerOn) {
      let currentAudio = null;
      //loop through the audio files
      for (let i = 0; i < audioRef.current.length; i++) {
        //Get the current keyboard key clicked char and ge the current audio file
        if (e.key.toUpperCase() === audioRef.current[i].id) {
          currentAudio = audioRef.current[i];
        }
        //  console.log(audioRef.current[0].current);
      }

      if (currentAudio) {
        setAudio(currentAudio);
        //console.log(currentAudio);
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

  const onChange = () => {
    if (changeMode) {
      setData(bankTwo);
    } else {
      setData(bankOne);
    }
    setChangeMode(!changeMode);
  };

  useEffect(() => {
    window.addEventListener('keydown', playOnKeyDown);
    return () => window.removeEventListener('keydown', playOnKeyDown);
  });

  return (
    <div className='drumpad-container'>
      <ModeToggle changeMode={changeMode} setChangeMode={onChange} />
      <p>DrumPad</p>
      {data.map(({ keyCode, keyTrigger, url }, index) => {
        return (
          <div key={keyCode}>
            <audio
              className='clip'
              id={keyTrigger}
              ref={(element) => (audioRef.current[index] = element)}
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
