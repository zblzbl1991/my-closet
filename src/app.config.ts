export default defineAppConfig({
    pages: [
        'pages/index/index',
        'pages/my-closet/index',
        'pages/my-clock/index',
        'pages/closet/index',
        'pages/personal/index',
        'pages/statistics/index',
        'pages/config/config-type/index',
        'pages/config/config-color/index',
        'pages/config/config-size/index',
        'pages/config/config-brand/index',
    ],
    window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#fff',
        navigationBarTitleText: 'WeChat',
        navigationBarTextStyle: 'black'
    },
    permission: {
        "scope.userLocation": {
            "desc": "你的位置信息将用于小程序位置接口的效果展示"
        }
    },
    requiredPrivateInfos: ["chooseLocation"],
    tabBar: {
        custom: true,
        color: '#000000',
        selectedColor: '#DC143C',
        backgroundColor: '#ffffff',
        list: [
            {
                pagePath: 'pages/index/index',
                // selectedIconPath: 'images/tabbar_home_on.png',
                // iconPath: 'images/tabbar_home.png',
                text: '首页'
            },
            {
                pagePath: 'pages/my-closet/index',
                // selectedIconPath: 'images/tabbar_cate_on.png',
                // iconPath: 'images/tabbar_cate.png',
                text: '穿搭灵感'
            },
            {
                pagePath: 'pages/statistics/index',
                // selectedIconPath: '../images/tabbar_cate_on.png',
                // iconPath: '../images/tabbar_cate.png',
                text: '统计'
            },
            {
                pagePath: 'pages/my-clock/index',
                // selectedIconPath: '../images/tabbar_cate_on.png',
                // iconPath: '../images/tabbar_cate.png',
                text: '打卡'
            },
            {
                pagePath: 'pages/personal/index',
                // selectedIconPath: '../images/tabbar_cate_on.png',
                // iconPath: '../images/tabbar_cate.png',
                text: '个人中心'
            },
            // {
            //   pagePath: 'pages/cart/index',
            //   selectedIconPath: 'images/tabbar_cart_on.png',
            //   iconPath: 'images/tabbar_cart.png',
            //   text: '购物车'
            // },
            // {
            //   pagePath: 'pages/my/index',
            //   selectedIconPath: 'images/tabbar_my_on.png',
            //   iconPath: 'images/tabbar_my.png',
            //   text: '个人中心'
            // }
        ]
    },
})