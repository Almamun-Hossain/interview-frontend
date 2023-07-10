"use client";
import { fetchCarts } from "@/redux/features/cartSlices";
import { fetchProducts } from "@/redux/features/productSlices";
import store from "@/redux/store";
import React, { useEffect } from "react";
import { Provider } from "react-redux";

store.dispatch(fetchProducts());
const ReduxProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    let userId = localStorage.getItem("user");
    store.dispatch(fetchCarts(userId));
  }, []);

  return <Provider store={store}>{children}</Provider>;
};

export default ReduxProvider;
