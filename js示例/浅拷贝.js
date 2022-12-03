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