import React, { createContext, useContext, useState } from 'react';
import { useMap } from './mapContext';

export const TargetContext = createContext();

export const TargetProvider = ({ children }) => {
  const [targetInfo, setTargetInfo] = useState([])
  const { mapInfo } = useMap()
  const { grid } = mapInfo 
  return (
    <TargetContext.Provider value={{ targetInfo, setTargetInfo }}>
        {children}
    </TargetContext.Provider>
  );
};

export const useTarget = () => useContext(TargetContext);