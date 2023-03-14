class Vue {
   constructor(obj_instance) {
     this.$data = obj_instance.data
     Observer(this.$data)
     Compile(obj_instance.el, this)
   }
}

// 数据劫持 - 监听实例里的数据
function Observer(data_instance) {
    //  递归出口-防止死循环
    if(!data_instance || typeof data_instance != 'object')  return
    // 实例化收集和通知订阅者类
    const dependency = new Dependency()
    // console.log(Object.keys(data_instance));
    Object.keys(data_instance).forEach(key => {
        // 劫持前需要先保存值，不然会变成undefined
        let value = data_instance[key]
        Observer(value)  // 递归 - 子属性数据劫持
        Object.defineProperty(data_instance, key, {
           // 标识属性是否可以枚举
           enumerable: true,
           // 标识属性是否可以改变
           configurable: true,
           // 获取属性时触发
           get() {
              console.log(`访问了属性： ${key} -> 值：${value}`);
              // 订阅者加入依赖实例的数组
              Dependency.temp && dependency.addSub(Dependency.temp)
              if(Dependency.temp) {
                console.log('订阅者', Dependency.temp);
              }
              return value
           },
           // 设置属性时触发
           set(newValue) {
               console.log(`属性${key}的值${value}修改为 -> ${newValue}`);
               value = newValue
               // 防止改写值时没有重新劫持 
                Observer(newValue)
               // 通知订阅者
               dependency.notify()
           }
        })
    })
}

// 创建一个解析dom的函数
function Compile(element, vm) {
   // 挂载dom
   vm.$el = document.querySelector(element)
   // 定义一个文档碎片 用来渲染页面
   const fragment = document.createDocumentFragment()
   let child
   while (child = vm.$el.firstChild) {
      fragment.append(child)
   }
   console.log('fragment>>',fragment)
   console.log('fragment-childNodes', fragment.childNodes)
   fragment_compile(fragment)  
   // 修改文档随便内容函数
   function fragment_compile(node) {
      const pattern = /\{\{\s*(\S+)\s*\}\}/
      // 当nodeType为3 说明是文本节点-也就是我们需要转译的数据
      if(node.nodeType === 3) {
         console.log('node.nodeType == 3 >> node', node);
         console.log('node.nodeType == 3 >> node.nodeValue', node.nodeValue);
         const nodeValue = node.nodeValue
         const result_regex = pattern.exec(node.nodeValue)
         if(result_regex) {
             // 当符合{{}}要求则说明是vue语法糖 需要动态插值
              const arr = result_regex[1].split('.')
              console.log('arr', arr);
              // 使用链式调用属性值
              const value = arr.reduce(
               (total, current) => total[current], vm.$data
              )
              console.log('value', value);
              // 替换文本{{}} 里的变量内容
              node.nodeValue = nodeValue.replace(pattern, value)
              // 创建订阅者
              new Watcher(vm, result_regex[1], newValue => {
               node.nodeValue = nodeValue.replace(pattern, newValue)
              })
         }
        

         return 
      }
      // 当为input 时
      if(node.nodeType === 1 && node.nodeName === 'INPUT') {
         // 查找input的属性值并转成数组
         const attr = Array.from(node.attributes)
         console.log(attr, node.attributes)
         attr.forEach(item => {
            // 当为v-model语法糖时说明是双向绑定, 则取出双向绑定的属性并劫持用来动态更新
             if(item.nodeName === 'v-model') {
                 const value = item.nodeValue.split('.').reduce(
                  (total, current) => total[current], vm.$data
                 )
                 console.log('input-value', value)
                 node.value = value
                 // 创建订阅者
                 new Watcher(vm, item.nodeValue, newValue => {
                    node.value = newValue
                 })
                 // 给input 添加输入框改变监听事件
                 node.addEventListener('input', e => {
                      // ['more', 'like']
                      const arr1 = item.nodeValue.split('.')
                      // ['more']
                      const arr2 = arr1.splice(0, arr1.length - 1)
                      // vm.$data.more
                      const final = arr2.reduce((total, current) => total[current], vm.$data)
                      // vm.$data.more['like'] = e.target.value
                      final[arr1[arr1.length - 1]] = e.target.value
                 })
             }
         })
      }
      node.childNodes.forEach(child => fragment_compile(child))
   }
   // 加载动态文档碎片内容
   vm.$el.appendChild(fragment)
}


// 依赖 - 收集和通知订阅者
class Dependency {
    constructor() {
      this.subscribers = []
    }
    // 添加订阅者
    addSub(sub) {
      console.log('addSub-params', sub);
      this.subscribers.push(sub)
      console.log('subscribers-arr', this.subscribers);
    }
    // 通知订阅者信息
    notify() {
      this.subscribers.forEach(sub => sub.update())
    }
}

// 订阅者
class Watcher {
    constructor(vm, key, callback) {
       this.vm = vm
       this.key = key
       this.callback = callback
       // 临时属性 - 触发getter
       Dependency.temp = this
       console.log(`用属性${key}创建订阅者`);
       key.split('.').reduce((total, current) => total[current], vm.$data)
       Dependency.temp = null
    }

    update() {
      const value = this.key.split('.').reduce((total, current) => total[current], this.vm.$data)
      this.callback(value)
    }
}