### 推荐使用这个
 [vuex-annotation](https://github.com/weidao123/vuex-annotation)
 * 这个更加的简洁 使用更方便
 
 
 
 
 
 
 
 
 
 
### 简介：
* vuex-ts-class 是对Vuex的一层包装，使用TypeScript的语法来编写Vuex，使得开发大型应用能更好的提高代码的健壮性
* 内置封装了基于 XMLHttpRequest 的 request 方法，并且对外提供了一些全局参数以及生命周期的设置方法 RequestContext
                
 ### 使用:
* `yarn add vuex-ts-class`

```typescript
import {Service, RequestContext} from 'vuex-ts-class'
  const service = new Service({
      state: {},
      actions: {},
      mutations: {}
  });
  
  //全局设置全局请求头部
  RequestContext.setRequestHeaders({"Content-Type": "application/json;charset=UTF-8"});
  
  //注册一个模块
  service.registerModule(Order);
  service.registerModule(UserModule);
  
  //导出vuex的实例
  export default service.createStore();
 ```

#### 模块:
```typescript
import {MutationMethod, VuexModule, ActionMethod, Request, VuexModuleClass, request} from 'vuex-ts-class';

//使用VuexModule装饰器来生成一个vuex模块 (PS: 这里一定要指明模块名称，不然上生产环境会出问题)
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

    @ActionMethod
    public async getAge({commit}: any): Promise<any> {
        const config: RequestParams = {};
        const names = await request(config);
    }


    //该方法只是为了不让ts提示没this.request报错
    private request(params: any) {}
}

//通过继承VuexModuleClass 来生成一个vuex模块
export class Order extends VuexModuleClass {
   constructor() {
        super();
        //必须调用父类的generate方法 并且传入this
        //(PS: 这里一定要指明模块名称，不然上生产环境会出问题)
        super.generate(this, "ModuleName");
    }
    //other...
}
```
