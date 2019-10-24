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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var request_1 = require("./utils/request");
/**
 * 装饰一个方法为action
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
function ActionMethod(target, name, desc) {
    desc.value.VUEX_MODULE_TYPE = 'actions';
    return desc;
}
exports.ActionMethod = ActionMethod;
/**
 * 装饰一个方法为mutation
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
function MutationMethod(target, name, desc) {
    desc.value.VUEX_MODULE_TYPE = 'mutations';
    return desc;
}
exports.MutationMethod = MutationMethod;
/**
 * 装饰一个方法为getters
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
function GetterMethod(target, name, desc) {
    desc.value.VUEX_MODULE_TYPE = 'getters';
    return desc;
}
exports.GetterMethod = GetterMethod;
/**
 * 装饰一个类为一个vuex的模块
 * @constructor
 */
function VuexModule(vuexModuleConfig) {
    return function (target) {
        var _a;
        var MODULES = {};
        vuexModuleConfig = vuexModuleConfig || {};
        MODULES.state = {};
        var tar = new target();
        var keys = Object.getOwnPropertyNames(target.prototype);
        var moduleName = vuexModuleConfig.name ? vuexModuleConfig.name : target.name;
        keys.forEach(function (name) {
            var _a;
            if (name !== 'constructor') {
                var moduleType = target.prototype[name].VUEX_MODULE_TYPE;
                if (moduleType) {
                    if (!MODULES[moduleType]) {
                        MODULES[moduleType] = {};
                    }
                    //@ts-ignore
                    MODULES[moduleType] = Object.assign(MODULES[moduleType], (_a = {}, _a[name] = target.prototype[name], _a));
                }
            }
        });
        for (var key in tar) {
            MODULES.state[key] = tar[key];
        }
        return _a = {},
            _a[moduleName] = __assign(__assign({ strict: true, namespace: true }, vuexModuleConfig), MODULES),
            _a;
    };
}
exports.VuexModule = VuexModule;
/**
 * 装饰一个类为Action
 * @param target
 * @constructor
 */
function ActionMapping(target) {
    var newObj = new target();
    var keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach(function (name) {
        if (name !== 'constructor') {
            newObj[name] = target.prototype[name];
        }
    });
    return newObj;
}
exports.ActionMapping = ActionMapping;
/**
 * 装饰一个类为mutations
 * @param target
 * @constructor
 */
function MutationsMapping(target) {
    var newObj = new target();
    var keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach(function (name) {
        if (name !== 'constructor') {
            newObj[name] = target.prototype[name];
        }
    });
    return newObj;
}
exports.MutationsMapping = MutationsMapping;
/**
 * 请求的装饰器
 * @param requestParams
 * @constructor
 */
function Request(requestParams) {
    requestParams.method = requestParams.method || 'GET';
    return function (target, name, desc) {
        var _this = this;
        desc.value = desc.value.bind({ request: function (body) {
                if (body === void 0) { body = {}; }
                return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, request_1.request(requestParams, body)];
                        case 1: return [2 /*return*/, _a.sent()];
                    }
                }); });
            } });
        return desc;
    };
}
exports.Request = Request;
