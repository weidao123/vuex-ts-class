import {RequestOptions, Response} from "./Request";

export interface RequestContext {
    baseURL: string

    /**
     * 开始请求之前
     * @param requestParams
     */
    beforeRequest(requestParams: RequestOptions): any

    /**
     * 请求成功后
     */
    afterRequest(response: Response): void

    getBaseURL(): string | null

    setBaseURL(baseURL: string): void
}
