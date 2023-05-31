import React, { createContext, useContext, useEffect, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';
import { usePlayer } from './playerContext';
import { Dimensions, StyleSheet } from 'react-native';

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
      <GestureRecognizer style={styles.swipeZone} config={{ velocityThreshold: 0.1, directionalOffsetThreshold: 100 }}
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

const styles = StyleSheet.create({
  swipeZone: {
    // width: Dimensions.get('screen').width,
    // height: Dimensions.get('screen').height
  },
});

export const useSwipe = () => useContext(SwipeContext);