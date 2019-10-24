
export type RequestMethodType = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface RequestParams extends RequestOptions{

    /**
     * 请求头
     */
    headers?: object

    /**
     * 超时时间
     */
    timeout?: number

}

/**
 * 请求的参数
 */
export interface RequestOptions {
    /**
     * 请求的URL
     */
    url: string

    /**
     * 请求的方法
     */
    method: RequestMethodType

    /**
     * 请求的内容参数
     */
    body?: any
}

/**
 * 初始化HttpService的时候的参数
 */
export interface RequestParamsConfig extends RequestParams{

    /**
     * 请求的入口方法
     */
    request(): Promise<Response>
}

export interface XMLHttpRequestInterface {

    /**
     * XMLHttpRequest的上下文
     */
    xhr: XMLHttpRequest

    onReadyStateChange(): boolean

    activeXObjectText: string

    /**
     * 初始化XMLHttpRequest
     * @param url
     * @param method
     * @param body
     */
    initXMLHttp(url: string, method: RequestMethodType, body: any): Promise<Response>

    /**
     * 用于异步等待XMLHttpRequest的执行结果
     * @param requestOptions
     * @param resolve
     * @param reject
     */
    xhrPromise(requestOptions: RequestOptions, resolve: Function, reject: Function): void
}

/**
 * 响应类型
 */
export interface Response {
    status: number

    message: string

    data: any
}
