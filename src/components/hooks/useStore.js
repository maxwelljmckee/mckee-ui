import React from "react";
import _omit from "lodash/omit";

export const useStore = (domain = "store", cb) => {
  // on initial load, make sure that we have at least an empty object in store
  React.useEffect(() => {
    const initial = JSON.parse(localStorage.getItem("artbots"));
    if (!initial) {
      localStorage.setItem("artbots", JSON.stringify({}));
    }
    // eslint-disable-next-line
  }, []);

  // fetch latest update from store
  const getStore = React.useCallback(
    () => JSON.parse(localStorage.getItem("artbots")) || {},
    []
  );

  // spread an object into a particular domain
  const setStoreItem = React.useCallback((domain, item) => {
    const store = getStore();
    localStorage.setItem(
      "artbots",
      JSON.stringify({ ...store, [domain]: { ...store.domain, ...item } })
    );
  }, []);

  // remove an entire domain, or a particular property from a domain
  const removeStoreItem = React.useCallback((domain, property) => {
    const store = getStore();
    // remove entire domain
    if (!property) {
      const rest = _omit(store, `${domain}`);
      return localStorage.setItem("artbots", JSON.stringify(rest));
    }
    // remove property from domain
    const slice = store[domain];
    const rest = _omit(slice, `${property}`);
    return localStorage.setItem(
      "artbots",
      JSON.stringify({ ...store, [domain]: rest })
    );
  }, []);

  const callback = () => {
    const store = getStore();
    if (cb) return cb(store);
    return store[domain];
  };

  return {
    getStore,
    setStoreItem,
    removeStoreItem,
    [domain]: callback(getStore()),
  };
};
