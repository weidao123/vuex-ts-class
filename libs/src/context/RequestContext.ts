/**
 * 暴露对外Request设置全局的上下文参数
 * 以及beforeRequest 和 afterRequest生命周期函数
 */
import {Header, RequestContext} from "../../interface/RequestContext";
import {RequestOptions, Response} from "../../interface/Request";

class RequestContextImpl implements RequestContext {

    /**
     * 根路径
     */
    public baseURL: string | null = null;

    /**
     * 全局的参数
     */
    public globalParams: object | null = null;

    /**
     * 请求头部
     */
    public requestHeaders: object | null = null;

    /**
     * 全局超时时间
     */
    public timeout: number = 30000;

    /**
     * 请求之前用
     */
    public beforeRequest(requestParams: RequestOptions): any {
    }

    /**
     * 请求成功之后
     * @param response
     */
    public afterRequest(response: Response): void {
    }

    /**
     * 请求失败之后
     */
    public requestFail(xhr: XMLHttpRequest): void {
    }

    /**
     * 设置baseURL
     * @param baseURL
     */
    public setBaseURL(baseURL: string): void {
        this.baseURL = baseURL;
    }

    /**
     * 获取baseURL
     */
    public getBaseURL(): string | null {
        return this.baseURL;
    }

    /**
     * 设置全局请求参数
     */
    public setGlobalParams(params: object): void {
        this.globalParams = params;
    }

    /**
     * 获取全局参数
     */
    public getGlobalParams(): object | null {
        return this.globalParams;
    }

    /**
     * 设置请求头部
     */
    public setRequestHeaders(header: Header): void {
        if (this.requestHeaders === null) this.requestHeaders = {};
        Object.assign(this["requestHeaders"], header);
    }

    /**
     * 获取请求头部信息
     */
    public getRequestHeaders(): object {
        if (this.requestHeaders === null) return {};
        return this.requestHeaders;
    }

    /**
     * 设置超时时间
     */
    public setTimeout(timeout: number): void {
        this.timeout = timeout;
    }

    /**
     * 获取超时时间
     */
    public getTimeout(): number {
        return this.timeout;
    }

    /**
     * 监听超时事件
     */
    public onTimeout(): any {
    }

    /**
     * 请求出错
     */
    public onError(): any {}

    /**
     * 上传的实时进度
     */
    public onprogress(params: any): any {

    }
}

export const requestContext: RequestContext = new RequestContextImpl();

