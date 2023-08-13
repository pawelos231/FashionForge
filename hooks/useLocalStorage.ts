import { useEffect, useState } from "react";

type FuncType = <T>(val: T) => any;
type updateValue<K> = K extends Function ? FuncType : K;

const functionTypeName = "function";

const useLocalStorage = <T>(key: string, value?: T) => {
  const [storageVal, setStorageVal] = useState<T>(() => {
    try {
      const val = localStorage.getItem(key);
      if (val) {
        return JSON.parse(val);
      } else {
        return value;
      }
    } catch (e) {
      return value;
    }
  });

  const updateLocalStorage = <K>(newValue: updateValue<K>): void => {
    if (typeof newValue == functionTypeName) {
      const fn = newValue as FuncType;
      setStorageVal(fn(storageVal));
    } else {
      const val = newValue as any;
      setStorageVal(val);
    }
  };

  useEffect(() => {
    const rawValue = JSON.stringify(storageVal);
    localStorage.setItem(key, rawValue);
  }, [storageVal]);

  return { storageVal, updateLocalStorage };
};

export default useLocalStorage;
