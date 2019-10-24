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
Object.defineProperty(exports, "__esModule", { value: true });
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
