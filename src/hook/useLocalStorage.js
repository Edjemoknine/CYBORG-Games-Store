import { useState, useEffect } from "react";

const GetStorage = (key, value) => {
  const oldData = JSON.parse(localStorage.getItem(key));
  if (oldData) return oldData;
  return value;
};

const useLocalStorage = (key, value) => {
  const [data, setData] = useState(() => GetStorage(key, value));

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(data));
  }, [data]);

  return [data, setData];
};

export default useLocalStorage;
