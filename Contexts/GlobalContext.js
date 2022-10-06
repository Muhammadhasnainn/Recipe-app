import axios from 'axios';
import {createContext, useContext, useState} from 'react';

const GlobalContext = createContext();

export default function GlobalContextProvider({children}) {
  const [Foods, setFoods] = useState([]);
  const [query, setQuery] = useState('');

  return (
    <GlobalContext.Provider value={{Foods, setFoods, query,setQuery}}>
      {children}
    </GlobalContext.Provider>
  );
}

export function useGlobalContext() {
  return useContext(GlobalContext);
}
