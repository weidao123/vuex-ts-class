import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import { VuexStoreConfig} from "../../interface";

Vue.use(Vuex);

export class Service {

    constructor(vuexStoreConfig: VuexStoreConfig = {}) {
        this.vuexStoreConfig = vuexStoreConfig || {};
    }

    private readonly vuexStoreConfig: VuexStoreConfig;

    public registerModule(VuexModule: any): void {
        if(!this.vuexStoreConfig.modules) this.vuexStoreConfig.modules = {};
        if(typeof VuexModule === 'function') {
            const vuexModule: any = new VuexModule();
            Object.assign(this.vuexStoreConfig.modules, vuexModule);
        } else {
            Object.assign(this.vuexStoreConfig.modules, VuexModule);
        }
    }

    public createStore(): Store<any> {
        return new Vuex.Store(this.vuexStoreConfig);
    }
}
