import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

export const MapContext = createContext();

export const MapProvider = ({ map, children }) => {
  const [mapInfo, setMapInfo] = useState(map);

  useEffect(() => {
    if(!map) return
    map.grid = JSON.parse(map.grid)
    map.tileSize = (Dimensions.get('screen').width / map.nbCols)
    map.loaded = true
    setMapInfo(map)
  }, [map])

  // useEffect(() => {
  //   if(mapInfo === null) return
  //   setMapInfo({...mapInfo, 
  //     "loaded": true, 
  //     "tileSize": (Dimensions.get('screen').width / mapInfo.nbCols)
  //   })
  // }, [mapInfo])

  useEffect(() => {
    if(mapInfo === null) return
    if(mapInfo.win === true) {
      win()
    }
  }, [mapInfo])

  const win = () => {
    
  }

  return (
    <MapContext.Provider value={{ mapInfo, setMapInfo }}>
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => useContext(MapContext);