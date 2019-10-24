import Vue from 'vue';
import Vuex, {Store} from 'vuex';
import {VuexModule, VuexStoreConfig} from "../interface";

Vue.use(Vuex);

export class Service {

    constructor(vuexStoreConfig: VuexStoreConfig = {}) {
        this.vuexStoreConfig = vuexStoreConfig || {};
    }

    private readonly vuexStoreConfig: VuexStoreConfig;

    public registerModule(vuexModule: VuexModule): void {
        if(!this.vuexStoreConfig.modules) this.vuexStoreConfig.modules = {};
        //@ts-ignore
        Object.assign(this.vuexStoreConfig.modules, vuexModule)
    }

    public createStore(): Store<any> {
        return new Vuex.Store(this.vuexStoreConfig);
    }
}
