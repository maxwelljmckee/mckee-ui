import React from "react";
import _omit from "lodash/omit";

let rootPath;
export const createStore = ({ root = "root", persist = false } = {}) => {
  console.log("============ createStore fired =============");
  const initial = JSON.parse(localStorage.getItem(root));
  if (!initial || !persist) {
    localStorage.setItem(root, JSON.stringify({}));
  }
  rootPath = root;
};

export const useStore = (domain = "store", cb) => {
  // fetch latest update from store
  const getStore = React.useCallback(
    () => JSON.parse(localStorage.getItem(rootPath)) || {},
    []
  );

  // spread an object into a particular domain
  const setStoreItem = React.useCallback((domain, item) => {
    const store = getStore();
    const path = [rootPath, ...domain.split(".")];
    const currentDomain = [rootPath];
    path.reduce((acc, subdomain) => {
      currentDomain.push(subdomain);
      return;
    });

    if (typeof item === "string") {
      return localStorage.setItem(
        rootPath,
        JSON.stringify({ ...store, [domain]: item })
      );
    }
    localStorage.setItem(
      rootPath,
      JSON.stringify({ ...store, [domain]: { ...store.domain, ...item } })
    );
  }, []);

  // remove an entire domain, or a particular property from a domain
  const removeStoreItem = React.useCallback((domain, property) => {
    const store = getStore();
    // remove entire domain
    if (!property) {
      const rest = _omit(store, `${domain}`);
      return localStorage.setItem(rootPath, JSON.stringify(rest));
    }
    // remove property from domain
    const slice = store[domain];
    const rest = _omit(slice, `${property}`);
    return localStorage.setItem(
      rootPath,
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
