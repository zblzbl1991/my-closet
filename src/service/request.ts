import Taro from "@tarojs/taro";
import {useTokenStore} from "../store/wechat";
// import * as process from "process";

const interceptor = function (chain) {
    const requestParams = chain.requestParams
    let { method, data, url } = requestParams

    console.log(`http ${method || 'GET'} --> ${url} data: `, data)

    return chain.proceed(requestParams)
        .then(res => {
            // console.log(`http <-- ${url} result:`, res)
            return res
        })
}




export function request(options){
    Taro.addInterceptor(interceptor)
    options.url=process.env.TARO_APP_API+options.url
    var tokenValue = useTokenStore.val;
    if(!options.header){
        options.header={}
    }
    // console.log(options.header)
    options.header['satoken']=tokenValue
    Taro.request(options)
}