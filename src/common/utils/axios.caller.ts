import {HWMap} from "@/core/common/common.vo";

import axios from 'axios'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import APIs from "../apis/APIs";
import WebUtils from "./web.utils";

let isSavingPoint = false;
let isTokenRefreshing = false;
let refreshSubscribers: ((accessToken: string) => void)[] = [];

const onTokenRefreshed = (accessToken: string) => {
    refreshSubscribers.map((callback) => callback(accessToken))
}

const addRefreshSubscriber = (callback: (accessToken: string) => void) => {
    refreshSubscribers.push(callback)
}

function getCurrentDateKey() {
    const now = new Date();
    return `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
}

class AxiosCaller {
    private static setToken(token: string) {
        localStorage.setItem("token", token);
    }

    private static getToken() {
        return localStorage.getItem("token");
    }

    static clearInterceptor() {
        axios.interceptors.request.clear();
        axios.interceptors.response.clear();
    }

    static setInterceptor(isProgress: boolean) {
        this.clearInterceptor();

        // intercept request
        axios.interceptors.request.use(async (config: any) => {
            if (isProgress) {
                NProgress.start();
            }

            const token = AxiosCaller.getToken();

            // JWT 토큰 첨부
            if (token) {
                config.headers = {
                    Authorization: "Bearer " + token,
                    ...config.headers,
                };
            }


            return config;
        }, (error: any) => {
            if (isProgress) {
                NProgress.done();
            }

            return Promise.reject(error);
        });

        // intercept response
        axios.interceptors.response.use((response: any) => {
            if (isProgress) {
                NProgress.done();
            }

            return response;
        }, async (error: any) => {
            const {config, response} = error;

            if (!response) {
                return Promise.reject(error);
            }

            if (isProgress) {
                NProgress.done();
            }

            return Promise.reject(error);
        });
    }


    static async ajax<HWMap>(url: string, method: string, data: HWMap, headers = {}, params = {}, isProgress: boolean) {
        try {
            this.setInterceptor(isProgress)

            const response = await axios({
                url,
                method,
                data,
                headers: {
                    'Content-Type': 'application/json',
                    ...headers,
                },
                params,
                withCredentials: false, // todo cye 임시 해결
            })

            const result: HWMap = {
                ...response.data,
                statusCode: response.status,
                statusText: response.statusText
            }

            return result;

        } catch (error) {
            console.error('AJAX M_Error:', error);
            //closeLoading();
            throw error;
        }
    }


    static get<T = any>(url: string, params?: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.ajax(url, 'GET', {}, headers, params, isProgress);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static post<T = any>(url: string, data: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.ajax(url, 'POST', data, headers, undefined, isProgress);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static put<T = any>(url: string, data: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.ajax(url, 'PUT', data, headers, undefined, isProgress);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static patch<T = any>(url: string, data: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.ajax(url, 'PATCH', data, headers, undefined, isProgress);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static delete<T = any>(url: string, params: HWMap = {}, headers = {}, isProgress: boolean = true): HWMap {
        try {

            return this.ajax(url, 'DELETE', {}, headers, params, isProgress);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }


    static getHide<T = any>(url: string, params?: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.get(url, params, headers, false);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static postHide<T = any>(url: string, data: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.post(url, data, headers, false);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static putHide<T = any>(url: string, data: HWMap, headers = {}): HWMap {
        try {
            return this.put(url, data, headers, false);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static patchHide<T = any>(url: string, data: HWMap, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.patch(url, data, headers, false);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

    static deleteHide<T = any>(url: string, params: HWMap = {}, headers = {}, isProgress: boolean = true): HWMap {
        try {
            return this.delete(url, params, headers, false);
        } catch (error) {
            console.error('AJAX M_Error:', error);
            throw error;
        }
    }

}

export default AxiosCaller;