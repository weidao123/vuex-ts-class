"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_1 = __importDefault(require("vue"));
var vuex_1 = __importDefault(require("vuex"));
vue_1.default.use(vuex_1.default);
var Service = /** @class */ (function () {
    function Service(vuexStoreConfig) {
        if (vuexStoreConfig === void 0) { vuexStoreConfig = {}; }
        this.vuexStoreConfig = vuexStoreConfig || {};
    }
    Service.prototype.registerModule = function (vuexModule) {
        if (!this.vuexStoreConfig.modules)
            this.vuexStoreConfig.modules = {};
        //@ts-ignore
        Object.assign(this.vuexStoreConfig.modules, vuexModule);
    };
    Service.prototype.createStore = function () {
        return new vuex_1.default.Store(this.vuexStoreConfig);
    };
    return Service;
}());
exports.Service = Service;
