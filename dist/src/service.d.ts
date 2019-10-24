import { Store } from 'vuex';
import { VuexModule, VuexStoreConfig } from "../interface";
export declare class Service {
    constructor(vuexStoreConfig?: VuexStoreConfig);
    private readonly vuexStoreConfig;
    registerModule(vuexModule: VuexModule): void;
    createStore(): Store<any>;
}
