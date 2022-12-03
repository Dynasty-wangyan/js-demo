/****************
 * 防抖（debounce）： 指触发事件后在N秒内函数只执行一次，如果在N秒内又触发了事件，则会重新计算函数执行时间
 * 
 * 应用：
 * 1. search 搜索联想，用户在不断输入值时，可以用防抖来节约请求资源和次数
 * 2. window触发resize时，不断调整浏览器窗口大小会不断触发这个事件，用防抖来让其只执行一次
 * 3. ...........
 * ***********************/

  const debounce = (fn, wait = 500, isImmediate = false) =>  {
    let timerId = null;
    let flag = true;
    if (isImmediate) {
      return function() {
        clearTimeout(timerId);
        if (flag) {
          fn.apply(this, arguments);
          flag = false
        }
        timerId = setTimeout(() => {
          flag = true
        }, wait)
      }
    }
    return function() {
      clearTimeout(timerId);
      timerId = setTimeout(() => {
        fn.apply(this, arguments)
      }, wait)
    }
  }

/****************
 * 节流（throttle）： 指连续触发事件但是在N秒内只执行一次函数
 * 
 * 应用：
 * 1. 鼠标不断点击触发mousedown(单位时间只触发一次)
 * 2. 监听滚动事件，比如是否滑动到底部自动加载更多，用throttle来判断
 * 3、 ......
 * ***********************/

 const throttle = (fn, time) => {
	let timer = null;
	return function(...args) {
		if (timer) {
			clearTimeout(timer);
		}
		let ctx = this;
		timer = setTimeout(function() {
			timer = null;
			fn.apply(ctx, args);
		}, time)
	}
}