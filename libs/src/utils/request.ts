import {
    RequestMethodType,
    RequestOptions, RequestParams,
    RequestParamsConfig,
    Response,
    XMLHttpRequestInterface
} from "../../interface/Request";
import {RequestMethod} from "../../enum/Request";
import {requestContext} from "../context/RequestContext";

class XMLHttp implements XMLHttpRequestInterface {

    public xhr: XMLHttpRequest | any;

    public activeXObjectText: string = "Microsoft.XMLHTTP";

    /**
     * 初始化 XMLHttpRequest 对象
     * @param url
     * @param method
     * @param body
     */
    public async initXMLHttp(url: string, method: RequestMethodType, body: any): Promise<Response> {

        if (XMLHttpRequest) {
            this.xhr = new XMLHttpRequest();
        } else {
            this.xhr = new ActiveXObject(this.activeXObjectText);
        }

        if (!this.xhr) throw new Error("XMLHttp initialization failed");

        return new Promise(this.xhrPromise.bind(this, {url, method, body}));
        //@ts-ignore
    }

    /**
     * 异步等待XMLHttpRequest的请求成功回调
     * 相关的生命周期方法也在这里执行
     * @param requestOptions
     * @param resolve
     * @param reject
     */
    public xhrPromise(requestOptions: RequestOptions, resolve: Function, reject: Function): void {

        //开始请求 beforeRequest 生命周期方法
        requestContext.afterRequest && requestContext.beforeRequest(requestOptions);

        this.xhr.onreadystatechange = async () => {
            const state: boolean = await this.onReadyStateChange();
            if (state) {
                const response: Response = JSON.parse(this.xhr.responseText);
                //请求成功 调用afterRequest 生命周期方法
                requestContext.afterRequest && requestContext.afterRequest(response);
                resolve(response);
                return;
            } else {
                if (this.xhr.readyState === 4) {
                    //请求成功 调用afterRequest 生命周期方法
                    requestContext.requestFail && requestContext.requestFail(this.xhr);
                    reject();
                }
            }
        };

        //判断有没有设置全局的请求参数
        let params: any = requestOptions.body;
        let globalParams = requestContext.getGlobalParams();
        if(typeof globalParams === 'object' && globalParams) params = Object.assign({}, globalParams, params);

        //设置非GET参数 如果不是GET请求 并且请求的参数是object 将请求参数转换为json字符串
        if (typeof params === 'object' && requestOptions.method.toLocaleUpperCase() !== RequestMethod.GET) {
            params = JSON.stringify(params);
        }

        //设置GET参数
        if (requestOptions.method.toLocaleUpperCase() === "GET") {
            let urlParams: string = "";
            let keys: string[] = Object.keys(params);
            keys.forEach((key: string, index: number) => urlParams += `${key}=${params[key]}${index + 1 !== keys.length ? '&' : ''}`);
            if (requestOptions.url.indexOf("?") === -1) requestOptions.url = requestOptions.url + "?";
            requestOptions.url += urlParams;
        }

        //判断有没有设置baseURL
        if(requestContext.getBaseURL()) {
            requestOptions.url = requestContext.getBaseURL() + requestOptions.url;
        }

        this.xhr.open(requestOptions.method, requestOptions.url, true);
        this.xhr.send(params);
    }

    public onReadyStateChange(): boolean {
        if (this.xhr.readyState === 4) return this.xhr.status === 200;
        return false;
    }
}

/**
 * 可传入的参数配置
 * 其他的参数待配置
 */
export class HttpService extends XMLHttp implements RequestParamsConfig {

    constructor(requestOptions: RequestOptions) {
        super();
        this.url = requestOptions.url;
        this.method = requestOptions.method;
        this.body = requestOptions.body;
    }

    public readonly url: string;

    public readonly method: RequestMethodType;

    public readonly body: any;

    public async request(): Promise<Response> {
        return await this.initXMLHttp(this.url, this.method, this.body);
    }
}

/**
 * 提供给Request装饰器的方法 也可单独使用
 * @param requestParams
 * @param body
 */
export async function request(requestParams: RequestParams, body: any) {
    requestParams.body = body;
    const httpService = new HttpService(requestParams);
    return await httpService.request();
}
