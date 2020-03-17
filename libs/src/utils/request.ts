import {
    RequestMethodType,
    RequestOptions, RequestParams,
    RequestParamsConfig,
    Response,
    XMLHttpRequestInterface
} from "../../interface/Request";
import {RequestMethod} from "../../enum/Request";
import {requestContext} from "../context/RequestContext";
import {Header} from "../../interface/RequestContext";

class XMLHttp implements XMLHttpRequestInterface {

    public xhr: XMLHttpRequest | any;

    public activeXObjectText: string = "Microsoft.XMLHTTP";

    /**
     * 初始化 XMLHttpRequest 对象
     * @param url
     * @param method
     * @param body
     * @param timeout
     * @param header
     */
    public async initXMLHttp<T>(url: string, method: RequestMethodType, body: any, timeout: number | undefined, header: Header | undefined): Promise<T> {

        if (XMLHttpRequest) {
            this.xhr = new XMLHttpRequest();
        } else {
            this.xhr = new ActiveXObject(this.activeXObjectText);
        }

        if (!this.xhr) throw new Error("XMLHttp initialization failed");

        return new Promise(this.xhrPromise.bind(this, {url, method, body, timeout, header}));
        //@ts-ignore
    }

    /**
     * 异步等待XMLHttpRequest的请求成功回调
     * 相关的生命周期方法也在这里被调用
     * requestContext的一些配置新也在这里面获取
     * @param requestOptions
     * @param resolve
     * @param reject
     */
    public xhrPromise(requestOptions: RequestOptions, resolve: Function, reject: Function): void {

        //获取超时时间
        let timeoutTime: number = requestOptions.timeout || requestContext.getTimeout();

        //部分浏览器不支持timout 待后期使用setTimeout 方法模拟实现
        if(this.xhr.timeout) this.xhr.timeout = timeoutTime;
        if(this.xhr.ontimeout) this.xhr.ontimeout = requestContext.onTimeout;

        //上传进度
        this.xhr.upload.onprogress = requestContext.onprogress;

        this.xhr.addEventListener("error",  requestContext.onError, false);

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
        let globalParams: object | null | any = requestContext.getGlobalParams();
        let isFormData = params.append && params.entries && params.delete && params.get;

        if(typeof globalParams === 'object' && globalParams) params = Object.assign({}, globalParams, params);

        //设置非GET参数 如果不是GET请求 并且请求的参数是object 将请求参数转换为json字符串
        if (typeof params === 'object' && requestOptions.method.toLocaleUpperCase() !== RequestMethod.GET) {
            if(isFormData) {
                //传入 FormData 将全局的参数添加到FormData
                if(globalParams) Object.keys(globalParams).forEach((key: string) => params.append(key, globalParams[key]));
            } else {
                params = JSON.stringify(params);
            }
        }

        //设置GET参数
        if (requestOptions.method.toLocaleUpperCase() === RequestMethod.GET) {
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

        //先打开连接
        this.xhr.open(requestOptions.method, requestOptions.url, true);

        //设置请求
        let requestHeaders: any = requestContext.getRequestHeaders() || {};
        let currentHeader: any = requestOptions.header || {};
        let headers: any = Object.assign({}, requestHeaders, currentHeader);

        //如果上传的FormData 就不去设置请求头 浏览器会自动识别
        if(headers && !isFormData) {
            let header: string[] = Object.keys(headers);
            header.forEach((key: string) => this.xhr.setRequestHeader(key, headers[key]))
        }

        this.xhr.send(params);
    }

    public onReadyStateChange(): boolean {
        if (this.xhr.readyState === 4) return this.xhr.status === 200;
        return false;
    }
}

/**
 * 外部可传入的参数配置
 * 其他的参数待配置
 */
export class HttpService<T> extends XMLHttp implements RequestParamsConfig {

    constructor(requestOptions: RequestOptions) {
        super();
        this.url = requestOptions.url;
        this.method = requestOptions.method;
        this.body = requestOptions.body;
        this.timeout = requestOptions.timeout;
        this.header = requestOptions.header;
    }

    public readonly url: string;

    public readonly method: RequestMethodType;

    public readonly body: any;

    public readonly timeout: number | undefined;

    public readonly header: Header | undefined;

    public async request<T>(): Promise<T> {
        return await this.initXMLHttp<T>(this.url, this.method, this.body, this.timeout, this.header);
    }
}

/**
 * 提供给Request装饰器的方法 也可单独使用
 * @param requestParams 装饰器的初使参数
 * @param body 请求题
 */
export async function request<T = Response>(requestParams: RequestOptions, body?: any): Promise<T> {
    requestParams.body = Object.assign(requestParams.body, body);
    const httpService = new HttpService<Response>(requestParams);
    return await httpService.request();
}
