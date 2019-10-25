import {Actions, Getters, Mutations, State} from "./Options";
import {ActionTree, GetterTree, ModuleTree, MutationTree, Plugin} from "vuex";

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

export interface VuexStoreConfig{
    state?: {[key: string]: any};
    getters?: {[key: string]: Function | any};
    actions?: {[key: string]: Function | any};
    mutations?: {[key: string]: Function | any};
    modules?: {[key: string]: VuexModule};
    plugins?: any;
    strict?: boolean;
}
