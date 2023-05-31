import React, { createContext, useContext, useEffect, useImperativeHandle, useState } from 'react';
import GestureRecognizer from 'react-native-swipe-gestures';

import { useMap } from './mapContext';
import { useBox } from './boxContext';

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const [playerInfo, setPlayerInfo] = useState()
  const { boxInfo, setBoxInfo } = useBox()
  const { mapInfo } = useMap()
  const [grid, setGrid] = useState()

  useEffect(() => {
      if(!mapInfo) return
      setGrid(mapInfo.grid);
  }, [mapInfo])

  const move = async (dir) => {
    if(!playerInfo) return 
    const { x, y } = playerInfo.position;
    let newPosition;
    let newBoxPosition;
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
        return
    }

    const nextTile = grid[newPosition.y][newPosition.x];
    if (nextTile === "#") {
      return
    }

    // check box push
    const boxIndex = boxInfo.findIndex(
      (box) => box.position.x === newPosition.x && box.position.y === newPosition.y
    );
    if (boxIndex !== -1) {
      const nextBoxTile = grid[newBoxPosition.y][newBoxPosition.x];
      if (nextBoxTile === "#") {
        return
      }

      const updatedBoxInfo = [...boxInfo];
      updatedBoxInfo[boxIndex].position = { ...newBoxPosition };
      setBoxInfo((lastBoxInfo) => updatedBoxInfo);
      setPlayerInfo((prevPlayerInfo) => ({
        ...prevPlayerInfo,
        direction: dir,
      }))
    }

    setPlayerInfo((prevPlayerInfo) => ({
      ...prevPlayerInfo,
      position: { ...newPosition },
      direction: dir,
    }))
  };

  return (
    <PlayerContext.Provider value={{ playerInfo, setPlayerInfo, move }}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);