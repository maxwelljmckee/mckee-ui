"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var _ = require('lodash');
var StoreController = /** @class */ (function () {
    function StoreController() {
        var _this = this;
        this.createStore = function (_a) {
            var _b = _a === void 0 ? {} : _a, _c = _b.root, root = _c === void 0 ? 'root' : _c, _d = _b.defaults, defaults = _d === void 0 ? {} : _d, _e = _b.config, config = _e === void 0 ? {} : _e;
            if (root !== 'root') {
                _this.root = root;
                localStorage.removeItem('root');
            }
            // if (params.config) this.config = params.config;
            var initial = localStorage.getItem(_this.root);
            if (!initial) {
                localStorage.setItem(_this.root, JSON.stringify(defaults));
            }
        };
        // fetch latest data from store
        this.getStore = function () { return JSON.parse(localStorage.getItem(_this.root) || ''); };
        // fetch a particular item from store
        this.getItem = function (path) { return _.get(JSON.parse(localStorage.getItem(_this.root) || ''), path); };
        // spread an object into a particular path
        this.setItem = function (path, item) {
            var store = _this.getStore();
            var pathArray = path.split(".");
            var nextStore = _this._updateNestedItem(store, pathArray, item);
            localStorage.setItem(_this.root, JSON.stringify(nextStore));
        };
        // recursively overwrite the value of a nested store item
        this._updateNestedItem = function (parent, pathArray, item) {
            var _a, _b, _c;
            var key = pathArray[0];
            var currentLayer = _.get(parent, "" + key, {});
            if (pathArray.length === 1) {
                if (typeof item === "object" && !Array.isArray(item)) {
                    return __assign(__assign({}, parent), (_a = {}, _a[key] = __assign(__assign({}, currentLayer), item), _a));
                }
                return __assign(__assign({}, parent), (_b = {}, _b[key] = item, _b));
            }
            var child = _this._updateNestedItem(currentLayer, pathArray.slice(1), item);
            return __assign(__assign({}, parent), (_c = {}, _c[key] = __assign({}, child), _c));
        };
        // remove an entire domain, or a particular property from a domain
        this.removeItem = function (path, blacklist) {
            var store = _this.getStore();
            var pathArray = path.split(".");
            var nextStore = _this._removeNestedItem(store, pathArray, blacklist);
            localStorage.setItem(_this.root, JSON.stringify(nextStore));
        };
        // recursively remove a nested store item
        this._removeNestedItem = function (parent, pathArray, blacklist) {
            var _a, _b;
            var key = pathArray[0];
            var currentLayer = _.get(parent, "" + key);
            if (!currentLayer)
                throw new Error("KeyError: key-name \"" + key + "\" not found");
            if (pathArray.length === 1) {
                if (blacklist) {
                    var rest = _.omit(currentLayer, blacklist);
                    return __assign(__assign({}, parent), (_a = {}, _a[key] = rest, _a));
                }
                else {
                    var rest = _.omit(parent, key);
                    return rest;
                }
            }
            var child = _this._removeNestedItem(currentLayer, pathArray.slice(1), blacklist);
            return __assign(__assign({}, parent), (_b = {}, _b[key] = __assign({}, child), _b));
        };
        this.clear = function () { return localStorage.setItem(_this.root, JSON.stringify({})); };
        localStorage.setItem('root', JSON.stringify({}));
        this.root = "root";
        this.config = {};
    }
    return StoreController;
}());
exports["default"] = new StoreController();
