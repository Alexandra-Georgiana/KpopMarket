import React, { createContext, useState, useEffect } from 'react';
import { ALL } from '../assets/all'; 

export const ShopContext = createContext(null);

const ShopContextProvider = (props) => {
  const shopContextValue = {ALL};
  return (
    <ShopContext.Provider value={shopContextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
