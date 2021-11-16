const _omit = require("lodash/omit");
const _get = require("lodash/get");

class StoreController {
  constructor() {
    this.root = "root";
    this.config = {};
  }

  createStore = ({ root, defaults = {}, config = {} }) => {
    if (root) this.root = root;
    const initial = JSON.parse(localStorage.getItem(this.root));
    if (!initial) {
      localStorage.setItem(this.root, JSON.stringify(defaults));
    }
  };

  // fetch latest data from store
  getStore = () => JSON.parse(localStorage.getItem(this.root));

  // fetch a particular item from store
  getItem = (path) => _get(JSON.parse(localStorage.getItem), path);

  // spread an object into a particular path
  setItem = (path, item) => {
    const store = this.getStore();
    const pathArray = path.split(".");

    const nextStore = this._updateNestedItem(store, pathArray, item);

    localStorage.setItem(this.root, JSON.stringify(nextStore));
  };

  // recursively overwrite the value of a nested store item
  _updateNestedItem = (parent, pathArray, item) => {
    const key = pathArray[0];
    const currentLayer = _get(parent, `${key}`, {});

    if (pathArray.length === 1) {
      if (typeof item === "object" && !Array.isArray(item)) {
        return { ...parent, [key]: { ...currentLayer, ...item } };
      }
      return { ...parent, [key]: item };
    }

    const child = this._updateNestedItem(
      currentLayer,
      pathArray.slice(1),
      item
    );
    return { ...parent, [key]: { ...child } };
  };

  // remove an entire domain, or a particular property from a domain
  removeItem = (path, blacklist) => {
    const store = this.getStore();
    const pathArray = path.split(".");

    const nextStore = this._removeNestedItem(store, pathArray, blacklist);

    localStorage.setItem(this.root, JSON.stringify(nextStore));
  };

  // recursively remove a nested store item
  _removeNestedItem = (parent, pathArray, blacklist) => {
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

    const child = this._removeNestedItem(
      currentLayer,
      pathArray.slice(1),
      blacklist
    );
    return { ...parent, [key]: { ...child } };
  };

  clear = () => localStorage.setItem(this.root, JSON.stringify({}));
}

const quickStore = new StoreController();

const createStore = quickStore.createStore;

module.exports = quickStore;
module.exports.createStore = createStore;
