import React, { createContext, useContext, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useMap } from './mapContext';
import { useBox } from './boxContext';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState({})
  const { boxInfo, setBoxInfo } = useBox()
  const { mapInfo } = useMap()
  const { grid } = mapInfo

  const move = (dir) => {
    setPlayerInfo((prevPlayerInfo) => {
      const { x, y } = prevPlayerInfo.position;
      let newPosition;
      let newBoxPosition;
      let isBoxPushed = false;
      switch (dir) {
        case "up":
          newPosition = { x, y: y - 1 };
          newBoxPosition = { x, y: y - 2 };
          break;
        case "down":
          newPosition = { x, y: y + 1 };
          newBoxPosition = { x, y: y + 2 };
          break;
        case "left":
          newPosition = { x: x - 1, y };
          newBoxPosition = { x: x - 2, y };
          break;
        case "right":
          newPosition = { x: x + 1, y };
          newBoxPosition = { x: x + 2, y };
          break;
        default:
          return prevPlayerInfo;
      }

      const nextTile = grid[newPosition.y][newPosition.x];
      if (nextTile === "#") {
        return prevPlayerInfo;
      }

      const boxIndex = boxInfo.findIndex(
        (box) => box.position.x === newPosition.x && box.position.y === newPosition.y
      );
      if (boxIndex !== -1) {
        const nextBoxTile = grid[newBoxPosition.y][newBoxPosition.x];
        if (nextBoxTile === "#") {
          return prevPlayerInfo;
        }

        const updatedBoxInfo = [...boxInfo];
        updatedBoxInfo[boxIndex].position = { ...newBoxPosition };
        isBoxPushed = true;
        setPlayerInfo((prevPlayerInfo) => ({
          ...prevPlayerInfo,
          direction: dir,
          isBoxPushed: isBoxPushed
        }));
        setBoxInfo(updatedBoxInfo);
      }

      return {
        ...prevPlayerInfo,
        position: { ...newPosition },
        direction: dir,
        isBoxPushed: isBoxPushed
      };
    });
  };


  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo }}>
      <GestureRecognizer config={{ velocityThreshold: 0.3, directionalOffsetThreshold: 300, minDeltaX: 2, minDurationMs: 100 }}
        onSwipeUp={() => move("up")}
        onSwipeDown={() => move("down")}
        onSwipeRight={() => move("right")}
        onSwipeLeft={() => move("left")}
      >
        {children}
      </GestureRecognizer>
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);