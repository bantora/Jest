import { createContext, useContext, useState } from "react";
import { pricePerItem } from "../constants";

const OrderDetails = createContext({});

export const useOrderDetails = () => {
  const contextValue = useContext(OrderDetails);

  if (!contextValue) {
    throw new Error(
      "useOrderDetails must be called from within an OrderDetailsProvider"
    );
  }

  return contextValue;
};

export const OrderDetailsProvider = (props) => {
  const initValue = {
    scoops: {},
    toppings: {},
  };
  const [optionsCounts, setOptionsCounts] = useState(initValue);

  const updateItemCount = (itemName, newItemCount, optionType) => {
    const newOptionCounts = { ...optionsCounts };

    newOptionCounts[optionType][itemName] = newItemCount;

    setOptionsCounts(newOptionCounts);
  };

  const resetOrder = () => {
    setOptionsCounts(initValue);
  };

  const calculateTotal = (optionType) => {
    const countsArray = Object.values(optionsCounts[optionType]);
    const totalCount = countsArray.reduce((accum, curr) => accum + curr, 0);

    return totalCount * pricePerItem[optionType];
  };

  const totals = {
    scoops: calculateTotal("scoops"),
    toppings: calculateTotal("toppings"),
  };

  const value = { optionsCounts, updateItemCount, resetOrder, totals };
  return <OrderDetails.Provider value={value} {...props} />;
};
