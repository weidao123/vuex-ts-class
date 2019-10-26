
>### 简介：
 * vuex-ts-class 是对Vuex的一层包装，使用Class类的写法来使用Vuex
 * vuex-ts-class 拥有更好的开发体验，模块化更加的清晰
 * 建议把 vuex-ts-class 当成一个service层来使用
 * 内置封装了 request 方法， 基于 XMLHttpRequest
 * 对外提供了 RequestContext 来做一些全局的配置
 *      例如： 
            请求头部: RequestContext.setRequestHeaders
            全局的参数: RequestContext.setGlobalParams
            以及一些相关的生命周期方法等等
                
>### 使用:
* `yarn add vuex-ts-class`

* `import {Service, RequestContext} from 'yarn add vuex-ts-class'`

    ```typescript
  const service = new Service({
      state: {count: 40},
      actions: {
          ...MainAction
      },
      mutations: {
          ...MainMutations
      }
  });
  
  //设置全局请求头部
  RequestContext.setRequestHeaders({"Content-Type": "application/json;charset=UTF-8"});
  
  //注册一个模块
  service.registerModule(Order);
  service.registerModule(UserModule);
  
  //导出vuex的实例
  export default service.createStore();

>#### 模块：:
```typescript
import {MutationMethod, VuexModule, ActionMethod, Request, VuexModuleClass} from 'vuex-ts-class';

//使用VuexModule装饰器来生成一个vuex模块
@VuexModule({name: 'User'})
export class UserModule {

    public name: string = 'hhh';

    @MutationMethod
    public setName(state: any, params: number): void {
        state.name = 'mutations setName' + params;
    }

    @ActionMethod
    @Request({url: '/test/url', method: 'POST'})
    public async getName({commit}: any, params: number): Promise<any> {
        const names = await this.request({params});
        commit('setName', names);
    }

    //该方法只是为了不让ts提示没this.request报错
    private request(params: any) {}
}

//通过继承VuexModuleClass 来生成一个vuex模块
class UserModule extends VuexModuleClass {
   constructor() {
        super("Order");
        //必须调用父类的generate方法 并且传入this
        super.generate(this);
    }
    //other...
}

//导出实例
export const Order: VuexModule = new OrderModule();

```
