import { createContext, useContext, useState } from "react";

const DataContext = createContext({
  seed: 175698,
  setSeed: () => {},
  selected: [],
  setSelected: () => {},
  value: 0,
  setValue: () => {},
  data: [],
  setData: () => {},
  pageNumber: "",
  setPageNumber: () => {},
  sliceIndex: 20,
  setSliceIndex: () => {},
});

export const DataContextProvider = ({ children }) => {
  const [seed, setSeed] = useState(175698);
  const [selected, setSelected] = useState([]);
  const [value, setValue] = useState(0);
  const [data, setData] = useState([]);
  const [pageNumber, setPageNumber] = useState("");
  const [sliceIndex, setSliceIndex] = useState(20);
  return (
    <DataContext.Provider
      value={{
        seed,
        setSeed,
        selected,
        setSelected,
        value,
        setValue,
        data,
        setData,
        pageNumber,
        setPageNumber,
        sliceIndex,
        setSliceIndex,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
