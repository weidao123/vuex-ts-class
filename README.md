>>
>### 使用说明：
>```
> npm nstall vue-ts-class
> import {Service} from 'vue-ts-class'
>
>//配置项和
>const service = new Service({
>     state: {count: 40},
>     actions: {
>         ...MainAction
>     },
>     mutations: {
>         ...MainMutations
>     }
>  });
>
>  //组册一个模块
>  service.regsiterModule(UserModule);
>
>  //导出vuex的实列
>  export default service.createStore();
>```

>### 示列：
>```
> @VuexModule({name: "User"})
>  export class UserModule {
>
>    public name: string = "hhh";
>    public age: number = 200;
>
>
>    @MutationMethod
>    public setName(state: any, params: number): void {
>        state.name = "mutations setName" + params;
>    }
>
>    @ActionMethod
>    public getName({commit}: any, params: number): void {
>        console.log("action getName" + params);
>        commit("setName", params)
>    }
>
>    @Request({url: "/test", method: RequestMethod.GET});
>    @ActionMethod
>    public async testAsync({commit}: any, params: number): void {
>        const result = await this.request({username: '测试', id: 1});
>    }
> }
>```

>### 装饰器：
>
`//装饰一个方法为action`
`export declare function ActionMethod(target: any, name: string, desc: any): any;`

`//装饰一个方法为mutation`
`export declare function MutationMethod(target: any, name: string, desc: any): any;`

`//装饰一个方法为getters`
`export declare function GetterMethod(target: any, name: string, desc: any): any;`

`//装饰一个类为一个vuex的模块`
`export declare function VuexModule(vuexModuleConfig?: VuexModuleConfig): (target: any) => VuexModule;`

`//装饰一个类为Action`
`export declare function ActionMapping(target: any): any;`

`//装饰一个类为mutations`
`export declare function MutationsMapping(target: any): any;`

`//请求的装饰器`
`export declare function Request(requestParams: RequestOptions): (target: any, name: string, desc: any) => any;`

>
