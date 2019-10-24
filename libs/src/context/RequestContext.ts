/**
 * 暴露对外Request设置全局的上下文参数
 * 以及beforeRequest 和 afterRequest生命周期函数
 */
import {RequestContext} from "../../interface/RequestContext";
import {RequestOptions, Response} from "../../interface/Request";

class RequestContextImpl implements RequestContext{

    public baseURL: string = "";

    public globalParams: object | null = null;

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
        if(this.baseURL !== "" && this.baseURL.length > 0) {
            return this.baseURL;
        }
        return null;
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
}

export const requestContext: RequestContext = new RequestContextImpl();
