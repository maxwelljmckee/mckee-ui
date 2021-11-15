import React from "react";
import _omit from "lodash/omit";
import _get from "lodash/get";

let rootPath;
export const createStore = ({ root = "root" }) => {
  const initial = JSON.parse(localStorage.getItem(root));
  if (!initial) {
    localStorage.setItem(root, JSON.stringify({}));
  }
  rootPath = root;
};

export const useStore = (domain = "store", cb) => {
  // fetch latest update from store
  const getStore = React.useCallback(
    () => JSON.parse(localStorage.getItem(rootPath)),
    []
  );

  // recursively overwrite the value of a nested store item
  const _updateNestedItem = (parent, pathArray, item) => {
    const key = pathArray[0];
    const currentLayer = _get(parent, `${key}`, {});

    if (pathArray.length === 1) {
      if (typeof item === "object" && !Array.isArray(item)) {
        return { ...parent, [key]: { ...currentLayer, ...item } };
      }
      return { ...parent, [key]: item };
    }

    const child = _updateNestedItem(currentLayer, pathArray.slice(1), item);
    return { ...parent, [key]: { ...child } };
  };

  // spread an object into a particular path
  const setStoreItem = React.useCallback(
    (path, item) => {
      const store = getStore();
      const pathArray = path.split(".");

      const nextStore = _updateNestedItem(store, pathArray, item);

      localStorage.setItem(rootPath, JSON.stringify(nextStore));
    },
    // eslint-disable-next-line
    []
  );

  // recursively remove a nested store item
  const _removeNestedItem = (parent, pathArray, blacklist) => {
    const key = pathArray[0];
    const currentLayer = _get(parent, `${key}`);
    if (!currentLayer) throw new Error(`KeyError: key-name "${key}" not found`);

    if (pathArray.length === 1) {
      if (blacklist) {
        const rest = _omit(currentLayer, blacklist);
        return { ...parent, [key]: rest };
      } else {
        const rest = _omit(parent, key);
        return rest;
      }
    }

    const child = _removeNestedItem(
      currentLayer,
      pathArray.slice(1),
      blacklist
    );
    return { ...parent, [key]: { ...child } };
  };

  // remove an entire domain, or a particular property from a domain
  const removeStoreItem = React.useCallback((path, blacklist) => {
    const store = getStore();
    const pathArray = path.split(".");

    const nextStore = _removeNestedItem(store, pathArray, blacklist);

    localStorage.setItem(rootPath, JSON.stringify(nextStore));
    // eslint-disable-next-line
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
