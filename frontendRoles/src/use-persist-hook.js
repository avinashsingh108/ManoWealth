import { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  // Retrieve data from localStorage on initial render
  const storedData = localStorage.getItem(key);
  const initialData = storedData ? JSON.parse(storedData) : initialValue;

  // State to manage the data
  const [data, setData] = useState(initialData);

  // Update localStorage when data changes
  const setLocalStorageData = (newData) => {
    setData(newData);
    localStorage.setItem(key, JSON.stringify(newData));
    console.log(localStorage.getItem('user'))
  };

  return [data, setLocalStorageData];
};

export default useLocalStorage;
