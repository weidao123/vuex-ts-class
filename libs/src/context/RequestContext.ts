/**
 * 暴露对外Request设置全局的上下文参数
 * 以及beforeRequest 和 afterRequest生命周期函数
 */
import {RequestContext} from "../../interface/RequestContext";
import {RequestOptions, Response} from "../../interface/Request";

class RequestContextImpl implements RequestContext{

    public baseURL: string = "";

    public beforeRequest(requestParams: RequestOptions): any {
    }

    public afterRequest(response: Response): void {
    }

    public setBaseURL(baseURL: string): void {
        this.baseURL = baseURL;
    }

    public getBaseURL(): string | null {
        if(this.baseURL !== "" && this.baseURL.length > 0) {
            return this.baseURL;
        }
        return null;
    }

}

export const requestContext: RequestContext = new RequestContextImpl();
