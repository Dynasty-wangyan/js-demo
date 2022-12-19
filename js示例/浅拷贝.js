// assgin 实现浅拷贝

let target = {}
let obj = {
  a: 1,
  b: {
    a: 2
  }
}

Object.assign(target, obj)

console.log(target)

obj.a = 2
obj.b.a = 5
console.log(obj)
console.log(target)

setTimeout(() => {
  console.log('setTimeout')
}, 0)
new Promise((resolve) => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })
console.log('script end')