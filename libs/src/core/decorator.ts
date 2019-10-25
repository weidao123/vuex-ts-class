import {VuexModuleConfig, VuexModule} from "../../interface";
import {RequestOptions, RequestParams} from "../../interface/Request";
import {HttpService, request} from "../utils/request";

/**
 * 装饰一个方法为action
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export function ActionMethod(target: any, name: string, desc: any) {
    desc.value.VUEX_MODULE_TYPE = 'actions';
    return desc;
}

/**
 * 装饰一个方法为mutation
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export function MutationMethod(target: any, name: string, desc: any) {
    desc.value.VUEX_MODULE_TYPE = 'mutations';
    return desc;
}

/**
 * 装饰一个方法为getters
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export function GetterMethod(target: any, name: string, desc: any) {
    desc.value.VUEX_MODULE_TYPE = 'getters';
    return desc;
}

/**
 * 装饰一个类为一个vuex的模块
 * @constructor
 */
export function VuexModule(vuexModuleConfig?: VuexModuleConfig): (target: any) => VuexModule {
    return function(target: any): VuexModule {
        const MODULES: any = {};
        vuexModuleConfig = vuexModuleConfig || {};
        MODULES.state = {};
        let tar = new target();
        let keys: string[] = Object.getOwnPropertyNames(target.prototype);
        let moduleName: string = vuexModuleConfig.name ? vuexModuleConfig.name : target.name;

        keys.forEach((name: string) => {
            if (name !== 'constructor') {
                let moduleType = target.prototype[name].VUEX_MODULE_TYPE;
                if (moduleType) {
                    if (!MODULES[moduleType]) {
                        MODULES[moduleType] = {};
                    }
                    //@ts-ignore
                    MODULES[moduleType] = Object.assign(MODULES[moduleType], {[name]: target.prototype[name]});
                }
            }
        });

        for (let key in tar) {
            MODULES.state[key] = tar[key];
        }

        return {
            [moduleName]: {
                strict: true,
                namespace: true,
                ...vuexModuleConfig,
                ...MODULES,
            },

        };
    };
}

/**
 * 装饰一个类为Action
 * @param target
 * @constructor
 */
export function ActionMapping(target: any) {
    const newObj = new target();
    let keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach((name: string) => {
        if (name !== 'constructor') {
            newObj[name] = target.prototype[name];
        }
    });
    return newObj;
}

/**
 * 装饰一个类为mutations
 * @param target
 * @constructor
 */
export function MutationsMapping(target: any) {
    const newObj = new target();
    let keys = Object.getOwnPropertyNames(target.prototype);
    keys.forEach((name: string) => {
        if (name !== 'constructor') {
            newObj[name] = target.prototype[name];
        }
    });
    return newObj;
}

/**
 * 请求的装饰器
 * @param requestParams
 * @constructor
 */
export function Request(requestParams: RequestOptions) {
    requestParams.method = requestParams.method || 'GET';
    return function(target: any, name: string, desc: any) {
        desc.value = desc.value.bind({request: async (body: object = {}) => await request(requestParams, body)});
        return desc;
    };
}
