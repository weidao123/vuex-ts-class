/**
 * 一个VuexModule模块 可以直接继承此类 也可以使用 @VuexModule 装饰器来构造一个vuex的模块
 */

type VuexModuleOptions = "actions" | "mutations" | "state" | "getters";

export class VuexModuleClass {

    constructor(name: string, namespace: boolean = true, strict: boolean = true) {
        if (!name) throw new Error("Module name must be passed in");
        this._name = name;
        this._namespace = namespace;
        this._strict = strict;
    }

    private readonly _name: string;

    private readonly _namespace: boolean;

    private readonly _strict: boolean;

    public generate(target: any) {

        const keys: string[] = Object.getOwnPropertyNames(target.__proto__).slice(1);
        const state: { [key: string]: any } = {};
        const mutations: { [key: string]: Function } = {};
        const actions: { [key: string]: Function } = {};
        const getters: { [key: string]: Function } = {};
        const stateKeys: string[] = Object.getOwnPropertyNames(target);

        stateKeys.forEach((key: string) => {
            if (key !== '_name' && key !== '_namespace' && key !== "_strict") state[key] = target[key];
        });

        keys.forEach((key: string) => {
            let type: VuexModuleOptions = target.__proto__[key].VUEX_MODULE_TYPE;
            switch (type) {
                case "actions":
                    actions[key] = target.__proto__[key].bind(mutations);
                    break;
                case "mutations":
                    mutations[key] = target.__proto__[key].bind(state);
                    break;
                case "getters":
                    getters[key] = target.__proto__[key];
            }
        });

        target[this._name] = {
            actions,
            mutations,
            state,
            namespace: this._namespace,
            strict: this._strict
        };

        stateKeys.forEach((key: string) => delete target[key]);
    }
}
