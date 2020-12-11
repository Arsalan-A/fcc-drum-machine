import React, { useState, useRef, useEffect } from 'react';
import { bankOne, bankTwo } from '../soundbank';
import PowerToggle from './PowerToggle';
import ModeToggle from './ModeToggle';
import Slider from './Slider';

function DrumPad() {
  //App States
  const [data, setData] = useState(bankOne);
  const [isPowerOn, setIsPowerOn] = useState(true);
  const [changeMode, setChangeMode] = useState(true);
  const [volume, setVolume] = useState(50);
  const [display, setDisplay] = useState('');

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
        //play audio
        playAudio(currentAudio);

        //Get the index of the current audio file in the data
        const index = data
          .map((item) => item.keyTrigger)
          .indexOf(currentAudio.id);

        setDisplay(data[index].id);
      } else {
        setDisplay('Wrong key');
        console.log('Audio Not Found for the key pressed ' + currentAudio);
      }
    }
  };

  //handle audio source toggle
  const onChange = () => {
    //On toggle Change the audio source
    if (changeMode) {
      setData(bankTwo);
    } else {
      setData(bankOne);
    }
    setChangeMode(!changeMode);
  };

  //Handle Volume Change
  const handleVolumeChange = (e) => {
    setVolume(e.target.value);

    //Adjust Volume
    audioRef.current.map((audio) => {
      if (volume / 100 === 0.1) {
        return setVolume(0);
      } else {
        return (audio.volume = volume / 100);
      }
    });
  };

  //Handle Power Change
  const handlePowerChange = () => {
    setIsPowerOn(!isPowerOn);
    if (isPowerOn) {
      setDisplay('POWER OFF');
    } else {
      setDisplay('POWER ON');
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', playOnKeyDown);
    audioRef.current.map((audio) => (audio.volume = volume / 100));
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
      <h1>{display}</h1>
      <ModeToggle changeMode={changeMode} setChangeMode={onChange} />
      <PowerToggle isPowerOn={isPowerOn} setIsPowerOn={handlePowerChange} />
      <Slider value={volume} setValue={handleVolumeChange} />
    </div>
  );
}

export default DrumPad;
