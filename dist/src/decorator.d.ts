import { VuexModuleConfig, VuexModule } from "../interface";
/**
 * 装饰一个方法为action
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export declare function ActionMethod(target: any, name: string, desc: any): any;
/**
 * 装饰一个方法为mutation
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export declare function MutationMethod(target: any, name: string, desc: any): any;
/**
 * 装饰一个方法为getters
 * @param target
 * @param name
 * @param desc
 * @constructor
 */
export declare function GetterMethod(target: any, name: string, desc: any): any;
/**
 * 装饰一个类为一个vuex的模块
 * @constructor
 */
export declare function VuexModule(vuexModuleConfig?: VuexModuleConfig): (target: any) => VuexModule;
/**
 * 装饰一个类为Action
 * @param target
 * @constructor
 */
export declare function ActionMapping(target: any): any;
/**
 * 装饰一个类为mutations
 * @param target
 * @constructor
 */
export declare function MutationsMapping(target: any): any;
