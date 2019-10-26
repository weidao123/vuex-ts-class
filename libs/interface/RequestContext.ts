import {RequestOptions, Response} from "./Request";

export interface Header {
    [key: string]: string | number
}

/**
 * request全局的上下文配置信息
 */
export interface RequestContext {
    /**
     * 根路径
     */
    baseURL: string | null

    /**
     * 全局公共参数
     */
    globalParams: object | null

    /**
     * 请求头
     */
    requestHeaders: object | null

    /**
     * 超时时间
     */
    timeout: number

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

    getRequestHeaders(): object

    setRequestHeaders(header: Header): void

    getTimeout(): number

    setTimeout(timeout: number): void

    onTimeout(): any

    onError(): any

    onprogress(params: any): any
}
