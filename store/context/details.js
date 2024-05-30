import { createContext, useState } from "react";

export const DetailsContext = createContext({
  rankings: {},
  updateDetails: (property, detail) => {},
});

function DetailsContextProvider({ children }) {
  const [details, setDetails] = useState({
    gender: "",
    name: "",
    telegram: "",
    best: "",
    worst: "",
  });

  function addRanking(property, detail) {
    setDetails((curr) => {
      return {
        ...curr,
        [property]: detail,
      };
    });
  }

  const value = {
    rankings: details,
    updateDetails: addRanking,
  };

  return (
    <DetailsContext.Provider value={value}>{children}</DetailsContext.Provider>
  );
}

export default DetailsContextProvider;
