
/******
 * 当正则表达式中出现非正则语义的字符，就表示为普通字符
 * 正则中想把\当普通字符使用，必须使用/来转译
 * 如果想使用或者条件判断，则可以用小括号括起来，在括号内用|做或者条件
 * *******/
/****
 * \d 等价于[0-9]
 * 当/^...$/ 当正则的开头出现^,结尾出现$, 则表示全景匹配
 * ^ 以什么开头
 * $  以什么结尾
 * \d  数字
 * \d{2}  二位数字
 * \d{2,4} 2-4位数字
 * \d{2,}  大于2位的数字
 * \d+  等价于 \d{1,}
 * \d*  等价于 \d{0,}
 * \d?  等价于 \d{0,1}
 * *******/

const reg = /^\d?$/
console.log(reg.test('1'))  // true

// 邮箱验证

/*******
 * [0-9a-z_] 可以是0-9的数字，也可以是a-z的字母，也可以是_, -代表区间
 * [ABCD1234.] 可以是ABCD1234. 其中的任意一项，在中括号中.就是.的意思
 * [^.] 当中括号中出现^ 的时候，表示取反，这句的意思是除了.以外的字符
 * *******/
const reg1 = /^[0-9a-z_]{2,20}@[a-z0-9]{1,10}[.a-z0-9]+[^.]+$/i
console.log(reg1.test('45646464654@163.com.cn'))  // true

// 去掉字符中非数字的部分

/*****
 *replace 替换字符串函数，参数可以传入正则
 * 正则后面的g代表全量匹配，会匹配多次
 * \D 代表非数字
 * *******/
//  const str = 'ab123ad'.replace(/\d/, '')   // 'ab23ad'
//  const str = 'ab123ad'.replace(/\d/g, '')  // 'abad'
// const str = 'ab123ad'.replace(/[^0-9]/g, '')  // '123'
const str = 'ab123ad'.replace(/\D/g, '')  // '123'
console.log(str)  // 123

// 正则当中的简写语法

/*****
 * \s   空白符包括换行
 * \S   非空白符  与\s取反
 * \t   元字符 用于查找制表字符
 * \w  [a-zA-Z0-9_]
 * \W   [^a-zA-Z0-9_] 与\w相反
 * .  任意字符(除了\n\r 换行符)
 * ********/

// 身份证号验证

const reg2 = /^(\d{15}|\d{17}[0-9X]{1})$/i
console.log(reg2.test('32514545455784544X'))  // true

// 数字转千分位
const money = 9999999999999
console.log('money', money.toLocaleString())  // 9,999,999,999,999

// 校验名字为中文
/****
 * [\u4e00-\u9fa5] 表示Unicode 中文区间编码
 * ******/
const reg3 = /^[\u4e00-\u9fa5]{2,5}$/
console.log(reg3.test('战三'));

// 获取url 参数
/*****
 * .*?  非贪婪匹配，表示会一直查找，找到后面的正则规则位置
 * 当使用.match 的时候会返回正则的匹配结果，具体为： 结果、括号1结果、括号2结果...括号n
 * 当我们需要用动态正则的时候，可以用RegExp 对象，把正则字符串传入
 * *****/
function queryString(path, key) {
  // const path = '?id=55&name=abc'
  // const reg = path.match(/id=(.*?)(&|$)/)   // ['id=55&', '55', '&']
  // const reg = path.match(/name=(.*?)(&|$)/)   // ['name=abc', 'abc', '']
  const exp = new RegExp(key + '=(.*?)(&|$)')
  const reg = path.match(exp)    
  return reg ? reg[1] : null
}
console.log(queryString('?id=55&name=abc', 'name'))  // abc

// 过滤html标签
const htmlStr = '<div><a href="">跳转</a>xxxxxxxxxxx<img src="地址..."/></div>'

console.log(htmlStr.replace(/<[^>]+>/g, ''))  // 跳转xxxxxxxxxxx
// 只保留图片标签 
/***
 * 小括号括起来的就是回调函数里的group1参数
 * ？表示可能有可能没有的
 * i 忽略大小写
 * *****/
console.log(htmlStr.replace(/<\/?([a-z]+).*?>/ig, (result, group1) => {
  // group1  => img div
  if(group1 === 'img') {
     return result
  }
  return ''
}))  // 跳转xxxxxxxxxxx<img src="地址..."/>


// 数据格式化
const text = `xxxxxx;张三：13522252525,65465465dsad545;xxxxx;xxxxx;李四：18625252625,6456sadasd6546;xxxxx;xxxxx`

const arr = []
text.replace(/;([\u4e00-\u9fa5]+)：(1\d{10}),([0-9a-z]+);/g, (result, group1, group2, group3) => {
     arr.push({
        name: group1,
        phone: group2,
        orderId: group3
     })
})

console.log('数据格式化=>>>', arr) 
 /**返回
  *  [
  { name: '张三', phone: '13522252525', orderId: '65465465dsad545' },
  { name: '李四', phone: '18625252625', orderId: '6456sadasd6546' }
] 
*/
