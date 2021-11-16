const _ = require('lodash');

interface CreateStoreParams {
  root?: string,
  defaults?: object,
  config?: object
}

class StoreController {
  root: string;
  config: object;

  constructor() {
    localStorage.setItem('root', JSON.stringify({}))
    this.root = "root";
    this.config = {};
  }

  createStore = ({root = 'root', defaults = {}, config = {}}: CreateStoreParams = {}): void => {
    if (root !== 'root') {
      this.root = root;
      localStorage.removeItem('root')
    }
    // if (params.config) this.config = params.config;
    const initial: string | null = localStorage.getItem(this.root);
    if (!initial) {
      localStorage.setItem(this.root, JSON.stringify(defaults));
    }
  };

  // fetch latest data from store
  getStore = () => JSON.parse(localStorage.getItem(this.root) || '');

  // fetch a particular item from store
  getItem = (path: string): any => _.get(JSON.parse(localStorage.getItem(this.root) || ''), path);

  // spread an object into a particular path
  setItem = (path: string, item: string | object): void => {
    const store = this.getStore();
    const pathArray = path.split(".");

    const nextStore = this._updateNestedItem(store, pathArray, item);

    localStorage.setItem(this.root, JSON.stringify(nextStore));
  };

  // recursively overwrite the value of a nested store item
  _updateNestedItem = (parent: object, pathArray: string[], item: string | object): object => {
    const key = pathArray[0];
    const currentLayer = _.get(parent, `${key}`, {});

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
  removeItem = (path: string, blacklist: string | string[]): void => {
    const store = this.getStore();
    const pathArray = path.split(".");

    const nextStore = this._removeNestedItem(store, pathArray, blacklist);

    localStorage.setItem(this.root, JSON.stringify(nextStore));
  };

  // recursively remove a nested store item
  _removeNestedItem = (parent: object, pathArray: string[], blacklist: string | string[]): object => {
    const key = pathArray[0];
    const currentLayer = _.get(parent, `${key}`);
    if (!currentLayer) throw new Error(`KeyError: key-name "${key}" not found`);

    if (pathArray.length === 1) {
      if (blacklist) {
        const rest = _.omit(currentLayer, blacklist);
        return { ...parent, [key]: rest };
      } else {
        const rest = _.omit(parent, key);
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

export default new StoreController();
