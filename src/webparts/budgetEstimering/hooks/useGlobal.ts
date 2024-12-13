import * as React from "react";
import { GlobalContext, IGlobalContext } from "../context/GlobalContext";

const useGlobal = (): IGlobalContext => {
  const context = React.useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext can only be used in a GlobalContext tree"
    );
  }

  return context;
};

export default useGlobal;
