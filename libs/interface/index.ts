import {ActionTree, StoreOptions} from "vuex";
import {Actions, Getters, Mutations, State} from "./Options";

export interface VuexModule {
    [name: string]: VuexModuleOptions
}

export interface VuexModuleOptions extends VuexModuleConfig{
    state: State

    actions: Actions

    mutations: Mutations

    getters: Getters
}

export interface VuexModuleConfig {
    name?: string

    strict?: boolean

    namespace?: boolean

}

export interface VuexStoreConfig extends StoreOptions<any>{

}
