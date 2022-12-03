/*******
 * 发布订阅模式： 订阅者（Subscriber）把自己想订阅的事件注册（Subscribe）到调度中心（Topic），当发布者（Publisher）发布该事件（Publisher topic）到调度中心，也就是改事件触发时由调度中心统一调度（Fire Event）订阅者注册到调度中心的代码
 * ******** */

//  on： 订阅者  emit： 发布

// 调度中心
const topic = {
    // 存订阅者
    _callback: [],
    // 订阅
    on(callback) {
       this._callback.push(callback)
    },
    // 发布
    emit(value) {
      this._callback.forEach(method => {
        method(value)
      })
    }     
}

// 订阅
topic.on(value => {
   console.log('张山订阅：' + value)
})

// 订阅
topic.on(value => {
  console.log('李四订阅：' + value)
})

// 订阅
topic.on(value => {
  console.log('王五订阅：' + value)
})

// 发布
topic.emit('中央日报')