// 重置HTML的fontsize
function resetSize () {
  // 获取的到当前设备的屏幕大小
  var windowsW = document.documentElement.clientWidth
  // 使用iPhone5的屏幕大小作为参考
  var size = windowsW / 320
  // 计算字体大小
  var newSize = size * 10
  // 设置html 的字体大小
  document.getElementsByTagName('html')[0].style.fontSize = newSize + 'px'
}
// 当设备的屏幕大小发生改变时 重新计算文字大小
window.addEventListener('resize', function () {
  resetSize()
})
resetSize()
