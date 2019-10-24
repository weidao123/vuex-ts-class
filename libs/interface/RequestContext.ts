import {RequestOptions, Response} from "./Request";

export interface RequestContext {
    baseURL: string

    globalParams: object | null

    /**
     * 开始请求之前
     * @param requestParams
     */
    beforeRequest(requestParams: RequestOptions): any

    /**
     * 请求成功后
     */
    afterRequest(response: Response): void

    /**
     * 请求失败之后调用
     * @param xhr
     */
    requestFail(xhr: XMLHttpRequest): void

    getBaseURL(): string | null

    setBaseURL(baseURL: string): void

    setGlobalParams(params: object): void

    getGlobalParams(): object | null
}
