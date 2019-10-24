># 使用说明：
>```
> npm nstall vue-ts-class
> import {Service} from 'vue-ts-class'
>
>//配置项和vuex原来的一样
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

># 装饰器：
>```
>    //装饰一类模块为vuex模块
>   @VuexModule()
>
>   //Mutation方法装饰器 配合VuexModule使用
>  @MutationMethod
>
>    //Getter方法装饰器 配合VuexModule使用
>    @GetterMethod
>
>    //Actions方法装饰器 配合VuexModule使用
>    @ActionMethod
>
>    //类装饰器 vuex的action
>    @ActionMapping    
>
>    //类装饰器 vuex的mutation
>    @MutationsMapping
>
>```

># 示列：
>```
> @VuexModule({name: "User"})
>  export class UserModule {
>
>    public name: string = "hhh";
>    public age: number = 200;
>
>
>    @SetMutations
>    public setName(state: any, params: number): void {
>        state.name = "mutations setName" + params;
>    }
>
>    @SetAction
>    public getName({commit}: any, params: number): void {
>        console.log("action getName" + params);
>        commit("setName", params)
>    }
> }
>```
