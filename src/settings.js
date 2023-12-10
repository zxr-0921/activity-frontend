// 导出一个对象，这个对象包含了一些配置项
module.exports = {

  // 标题，可能用于显示在页面的标题栏或者导航栏中
  title: 'Vue Admin Template',

  /**
   * @type {boolean} true | false
   * @description 是否固定头部
   * 如果这个值为 true，那么头部会被固定在页面顶部，即使用户滚动页面，头部也不会移动
   * 如果这个值为 false，那么头部在用户滚动页面时会随着页面一起滚动
   */
  fixedHeader: false,

  /**
   * @type {boolean} true | false
   * @description 是否在侧边栏显示 logo
   * 如果这个值为 true，那么 logo 会显示在侧边栏中
   * 如果这个值为 false，那么侧边栏中不会显示 logo
   */
  sidebarLogo: false
}

