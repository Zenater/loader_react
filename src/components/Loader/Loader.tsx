import React, { useState, useRef, useEffect } from 'react';
import './Loader.css';

export const Loader = () => {
  const [progress, setProgress] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleStop = () => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsRunning(false);
  };

  const handleStart = () => {
    intervalRef.current = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          handleStop();
          return 0;
        } else {
          return prevProgress + 1;
        }
      });
    }, 50);
    setIsRunning(true);
  };

  const handleOnClick = () => isRunning ? handleStop() : handleStart();

  useEffect(() => {
    handleStart();
    return () => {
      clearInterval(intervalRef.current!);
    };
  }, []);

  return (
    <div className='container'>
      <h1>Loading...</h1>
      <main className='progress-bar'>
        <div className='progress' style={{ width: `${progress}%` }} />
        <div className='indicator'>{`${progress}%`}</div>
      </main>
      <button className='start-stop-button' onClick={handleOnClick}>
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};


