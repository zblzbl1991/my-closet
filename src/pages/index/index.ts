import Taro from "@tarojs/taro";
import {request} from "../../service/request";
import {useOpenidStore, useSessionKeyStore, useTokenStore} from "../../store/wechat";
import {ref} from "vue";

export function login(f: VoidFunction) {
    let openid = Taro.getStorageSync('openid');
    Taro.login({
        success: function (res) {
            if (res.code) {
                //发起网络请求
                request({
                    url: '/wx/user/wxc7a91a709ffd2852/login',
                    data: {
                        code: res.code,
                        openid:openid
                    }, success: function (res) {
                        Taro.hideLoading()
                        let data = res.data;

                        useOpenidStore.val = data.data.openid
                        useSessionKeyStore.val = data.data.sessionKey
                        useTokenStore.val = data.data.token
                        Taro.setStorage({
                            key:"openid",
                            data:useOpenidStore.val
                        })

                        f();
                    }
                })
            } else {
                console.log('登录失败！' + res.errMsg)
            }
        }
    })
}
//排序
export const options2 = ref([
    {text: '默认排序', value: 'default'},
    {text: '价格从高到低', value: 'priceDesc'},
    {text: '价格从低到高', value: 'priceAsc'},
    {text:'穿搭次数从低到高',value: "countAsc"},
    {text:'穿搭次数从高到低',value: "countDesc"}
])
