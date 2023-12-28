import {useTokenStore} from "../../store/wechat";


export const beforeUpload=(taroUploadFile,options,dynamicForm)=>{
    //taroUploadFile  是 Taro.uploadFile ， 你也可以自定义设置其它函数
    options.url = process.env.TARO_APP_API + '/closet/uploadImg'
    console.log('options', options)
    const uploadTask = taroUploadFile({
        url: options.url,
        filePath: options.taroFilePath,
        fileType: options.fileType,
        timeout: 100000,
        header: {
            'Content-Type': 'multipart/form-data',
            'satoken': useTokenStore.val,
            ...options.headers
        }, //
        formData: options.formData,
        name: options.name,
        success(response: { errMsg; statusCode; data }) {
            if (options.xhrState == response.statusCode) {
                options.onSuccess?.(response, options);
                let imgUrl = JSON.parse(response.data).data;
                dynamicForm.state.value.images.push(imgUrl)
            } else {
                options.onFailure?.(response, options);
            }
        },
        fail(e) {
            options.onFailure?.(e, options);
        }
    });
    options.onStart?.(options);
    uploadTask.progress((res) => {
        options.onProgress?.(res, options);
    });
}