import { useState, useEffect } from 'react';

export default function useKeyPress(targetKey, ref, callback) {
  const [keyPressed, setKeyPressed] = useState(false);
  const downHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(true);
    }
  };
  const upHandler = ({ key }) => {
    if (key === targetKey) {
      setKeyPressed(false);
    }
  };

  useEffect(() => {
    if (keyPressed) {
      callback();
    }
  }, [keyPressed]);

  useEffect(() => {
    ref.current.addEventListener('keydown', downHandler);
    ref.current.addEventListener('keyup', upHandler);
    return () => {
      ref.current.removeEventListener('keydown', downHandler);
      ref.current.removeEventListener('keyup', upHandler);
    };
  }, []);

  return keyPressed;
}
