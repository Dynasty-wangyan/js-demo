const arr1 = [1, 2, 3, 4, 5]
const arr2 = [
  { name: '张三', age: 20, id: 1 },
  { name: '李四', age: 20, id: 2 },
  { name: '王五', age: 18, id: 3 },
  { name: '赵六', age: 19, id: 4 },
  { name: '钱七', age: 18, id: 5 },
  { name: '孙八', age: 19, id: 6 },
  { name: '李九', age: 20, id: 7 }
]


/*****
 * reduce 四个参数
 * @prev : 上一次return的结果，可以赋初始值
 * @curr : 当前值
 * @index : 当前索引
 * @arr : 原数组
 * ******/
//场景一：number数组求和
const result1 = arr1.reduce((prev, curr) => prev + curr)
// 鲁场景二：对象属性求和
const result2 = arr2.reduce((prev, curr) => prev + curr.age, 0)
//场景三：对象根据age进行分组
const result3 = arr2.reduce((prev, curr) => {
  const index = prev.findIndex(v => v.age === curr.age)
  if (index >= 0) {
    prev[index].list.push(curr)
  } else {
    prev.push({
      age: curr.age,
      list: [curr]
    })
  }
  return prev
}, [])
// 场景四： 数组转对象
const result4 = arr2.reduce((prev, curr) => {
   prev[curr.id] = curr
   return prev
}, {})

console.log('result1 ', result1)   // 15
console.log('result2 ', result2)   // 134
console.log('result3 ', result3)   
/***
 * [
  { age: 20, list: [ [Object], [Object], [Object] ] },
  { age: 18, list: [ [Object], [Object] ] },
  { age: 19, list: [ [Object], [Object] ] }
]
 * **/
console.log('result4 ', result4)   
/***
 * {
  '1': { name: '张三', age: 20, id: 1 },
  '2': { name: '李四', age: 20, id: 2 },
  '3': { name: '王五', age: 18, id: 3 },
  '4': { name: '赵六', age: 19, id: 4 },
  '5': { name: '钱七', age: 18, id: 5 },
  '6': { name: '孙八', age: 19, id: 6 },
  '7': { name: '李九', age: 20, id: 7 }
}
 * **/