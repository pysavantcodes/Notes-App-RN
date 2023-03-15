import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageContext = createContext();

export const useStorage = () => {
  return useContext(StorageContext);
};

const StorageProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('notes');
        if (value) {
          setNotes(JSON.parse(value));
        } else {
          console.log('no data');
        }
      } catch (error) {
        console.log(error);
      }
    };
    getData();
  }, []);


  const setData = async (newNotes) => {
    try {
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      await setNotes(newNotes);
    } catch (error) {
      console.log(error);
    }
  };

  const value = { setNotes, notes, setData };
  return <StorageContext.Provider value={value}>{children}</StorageContext.Provider>;
};

export default StorageProvider;
