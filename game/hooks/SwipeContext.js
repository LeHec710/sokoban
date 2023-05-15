import React, { createContext, useContext, useEffect, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { usePlayer } from './playerContext';

export const SwipeContext = createContext();

export const SwipeProvider = ({ children }) => {
  const [swipeInfo, setSwipeInfo] = useState([])
  const {move} = usePlayer()

  const handleSwipe = dir => {
    setTimeout(() => {
      move(dir)
    }, 1)
  }
  
  useEffect(() => {
    requestAnimationFrame(handleSwipe)
  }, [])

  return (
    <SwipeContext.Provider value={{ swipeInfo, setSwipeInfo }}>
      <GestureRecognizer config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 100 }}
        onSwipeUp={() => handleSwipe("up")}
        onSwipeDown={() => handleSwipe("down")}
        onSwipeRight={() => handleSwipe("right")}
        onSwipeLeft={() => handleSwipe("left")}
      >
        {children}
        </GestureRecognizer>
    </SwipeContext.Provider>
  );
};

export const useSwipe = () => useContext(SwipeContext);