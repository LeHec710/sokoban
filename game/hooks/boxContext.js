import React, { createContext, useContext, useState } from 'react';

export const BoxContext = createContext();

export const BoxProvider = ({ children }) => {
  const [boxInfo, setBoxInfo] = useState([])

  return (
    <BoxContext.Provider value={{ boxInfo, setBoxInfo }}>
        {children}
    </BoxContext.Provider>
  );
};

export const useBox = () => useContext(BoxContext);