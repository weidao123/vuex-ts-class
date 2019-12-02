import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {ServiceInter, VuexStoreConfig} from "../../interface";
import {VuexModuleClass} from "./vuex";

Vue.use(Vuex);

export class Service implements ServiceInter{

    constructor(vuexStoreConfig: VuexStoreConfig = {}) {
        this.vuexStoreConfig = vuexStoreConfig || {};
    }

    public readonly vuexStoreConfig: VuexStoreConfig;

    public registerModule(VuexModule: any): void {
        if(!this.vuexStoreConfig.modules) this.vuexStoreConfig.modules = {};
        if(typeof VuexModule === 'function') {
            const vuexModule: any = new VuexModule();

            //判断是否继承了 VuexModuleClass
            if(vuexModule instanceof VuexModuleClass) {
                Object.assign(this.vuexStoreConfig.modules, vuexModule);
            } else {
                let errMsg = "Error registering module: module must inherit VuexModuleClass or decorate with @VuexModule";
                throw new Error(errMsg)
            }
        } else {
            Object.assign(this.vuexStoreConfig.modules, VuexModule);
        }
    }

    public createStore(): Store<any> {
        return new Vuex.Store(this.vuexStoreConfig);
    }
}
