// 需求：一个数姐中判断是否有createBy,如果没有去除id和index，就将余参数取出和有createBy的对象一起放入断的数组
let arr = [
  { createBy: 1234, id: 001, index: 1, test1: '测试1', test2: '测试2' },
  { createBy: 1234, id: 001, index: 1, test1: '测试1', test2: '测试2' },
  { id: 001, index: 1, test1: '测试1', test2: '测试2' },
  { id: 001, index: 1, test1: '测试1', test2: '测试2' }
]

/******
 *  [
  { createBy: 1234, id: 001, index: 1, test1: '测试1', test2: '测试2' },
  { createBy: 1234, id: 001, index: 1, test1: '测试1', test2: '测试2' },
  { test1: '测试1', test2: '测试2' },
  { test1: '测试1', test2: '测试2' }
]
 * 
 * *******/

// 菜逼写法

// const newArr = []

// arr.forEach(item => {
//     if(item.createBy === undefined) {
//          let obj = {}
//          let objName = Object.keys(item)
//          objName.forEach(key => {
//             if(key !== 'id' && key !== 'index') {
//                 obj[key] = item[key]
//             }
//          })
//          newArr.push(obj)
//     }else {
//        newArr.push(item)
//     }
// })

// console.log(newArr);

// reduce写法

// let res = arr.reduce((acc, item) => {
//    const {createBy,id, index, ...rest} = item
//    const obj = !createBy ? {...rest} : {...item}
//    acc.push(obj)
//    return acc
// }, [])

// console.log(res);

// map 写法
let res = arr.map(({ createBy, id, index, ...rest }) => createBy ? { createBy, id, index, ...rest } : {...rest })  

console.log(res);