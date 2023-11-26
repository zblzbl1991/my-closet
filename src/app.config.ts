export default defineAppConfig({
  pages: [
    'pages/index/index',
    'pages/my-closet/index',
    'pages/my-fashion/index',
  ],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black'
  },
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
        text: '我的衣橱'
      },
      {
        pagePath: 'pages/my-fashion/index',
        // selectedIconPath: '../images/tabbar_cate_on.png',
        // iconPath: '../images/tabbar_cate.png',
        text: '我的穿搭'
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
  }
})
