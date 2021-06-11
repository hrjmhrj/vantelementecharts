const loading = '';
// 加载中
export function customLoadingOpen(){
  this.loading = this.$loading({
    lock: true,
    text: '正在加载中',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
}
// 关闭加载
export function customLoadingClose(){
  setTimeout(() => {
    this.loading.close()
  }, 200);
}
