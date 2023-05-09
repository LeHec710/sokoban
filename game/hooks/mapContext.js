import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const MapContext = createContext();

export const MapProvider = ({ children }) => {
  const [mapInfo, setMapInfo] = useState({
    grid: [
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', 'X', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', 'C', '#'],
        ['#', '.', '.', '.', '.', 'P', '.', '.', '.', '#'],
        ['#', '.', '.', '#', '#', '#', '.', '.', '.', '#'],
        ['#', '#', '.', '.', '.', 'X', '.', '.', '.', '#'],
        ['#', '.', '.', '#', '.', '#', '.', 'C', '.', '#'],
        ['#', '.', '.', '.', '.', '#', '.', '.', '.', '#'],
        ['#', '.', '.', '.', '.', '.', '.', '.', '.', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#']
    ],
    cols: 10,
    rows: 10,
    loaded: false,
    win: false
  });

  useEffect(() => {
    setMapInfo({...mapInfo, 
      "loaded": true, 
      "tileSize": (Dimensions.get('screen').width / mapInfo.cols)
    })
  }, [])

  useEffect(() => {
    if(mapInfo.win === true) {
      console.log("you're the winner !!")
    }
  }, [mapInfo])

  return (
    <MapContext.Provider value={{ mapInfo, setMapInfo }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);