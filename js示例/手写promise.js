class Commitment {
   static PENDING = '待定';
   static FULFILLED = '成功';
   static REJECTED = '拒绝';
  
   constructor(func) {
      this.status = Commitment.PENDING;
      this.result = null;
      this.resolveCallbacks = []
      this.rejectCallbacks = []
      try {
        func(this.resolve.bind(this), this.reject.bind(this))
      }catch(error) {
        this.reject(error)
      }
   }

   resolve(result) {
    //  如果不添加setTimeout 则会出现执行顺序错乱的问题
    setTimeout(() => {
     if(this.status === Commitment.PENDING) {
       this.status = Commitment.FULFILLED;
       this.result = result;
       this.resolveCallbacks.forEach(callback => {
          callback(result)
       })
     }
    })
   }

   reject(result) {
    //  如果不添加setTimeout 则会出现执行顺序错乱的问题
    setTimeout(() => {
     if(this.status === Commitment.PENDING) {
        this.status = Commitment.REJECTED;
        this.result = result;
        this.rejectCallbacks.forEach(callback => {
          callback(result)
        })
     }
    })
   }

   then(onFULFILLED, onREJECTED) {
    //  需要重新执行回调类 实现链式调用
    return new Commitment((resolve, reject) => {
      //  如果回调函数里面参数不是函数则重新赋值为函数
     onFULFILLED = typeof onFULFILLED === 'function' ? onFULFILLED : () => {}
     onREJECTED = typeof onREJECTED === 'function' ? onREJECTED : () => {}
     // 当为待定状态时
     if(this.status === Commitment.PENDING) {
        // 需要then函数稍后执行 保留resolve 和 reject   
        this.resolveCallbacks.push(onFULFILLED)
        this.rejectCallbacks.push(onREJECTED)
     }
    //  当为成功状态时-resolve
     if(this.status === Commitment.FULFILLED) {
      // 添加异步操作
       setTimeout(() => {
        onFULFILLED(this.result)
        resolve(this.result)
       })
     }
    //  当为失败状态时-reject
     if(this.status === Commitment.REJECTED) {
       // 添加异步操作
       setTimeout(() => { 
        onREJECTED(this.result)
        reject(this.result)
       })
     }
    })
   }
}

console.log('第一步')
let commitment = new Commitment((resolve, reject) => {
     // throw new Error('白嫖不成功')
     // 如果回调也异步调用setTimeout 则会不输出resolve 需要给待定状态条件回调
     console.log('第二步')
   setTimeout(() => {
    //  console.log(commitment.status);
     resolve('这次一定')
    //  console.log(commitment.status);
     console.log('第四步')
   })
})

commitment.then(
  result => {
    // console.log(commitment.status);
    console.log(result)},
  // undefined,  // 不重新定义函数 会报错
  result => {console.log(result.message)}
).then(res => {
   console.log(res)
})

console.log('第三步')