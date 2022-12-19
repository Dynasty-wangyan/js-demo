// 定义一个匹配双括号正则
const reg = /\{\{(.+?)\}\}/

class Ref {
  constructor(defaultValue) {
      this.deps = new Set()
      this._defaultValue = defaultValue
      this._value = defaultValue
  }
  
  get value() {
     return this._value
  }

  set value(newValue) {
     this._value = newValue
     update(this)
  }

  $reset() {
     this.value = this._defaultValue
  }

}

// // 定义一个ref方法 返回一个响应式对象-不用类
// export function ref (defaultValue) {
//     const refWrapper = {
//        deps: new Set(),
//        _value: defaultValue,
//        _defaultValue: defaultValue,
//        $reset() {
//         this.value = this._defaultValue
//        }
//     }
    
//     Object.defineProperty(refWrapper, 'value', {
//        get() {
//          return refWrapper._value
//        },
//        set(newValue) {
//          refWrapper._value = newValue
//          update(refWrapper)
//        }
//     })
//      console.log(refWrapper)
//      return refWrapper
// }

// 用类
export function ref (defaultValue) { 
   return new Ref(defaultValue)
}

// 定义一个初始化ref对象的方法
export function createRefs (refs, nodes) {
    nodes.forEach(el => {
      // 匹配是否双括号
       if(reg.test(el.textContent)) {
            console.log(el.textContent.match(reg));
           const refKey = el.textContent.match(reg)[1].trim()
           refs[refKey].deps.add(el)
       }
    })
   
   return refs
}

// 定义一个render渲染函数 循环需要渲染的dom（双括号包起来的）
export  function render(refs) {
    for(let key in refs) {
       const ref = refs[key]
       _render(ref)
    }
}

// 定义一个更新dom的方法
export function update({deps, value}) {
  _render({deps, value})
}

// 更改dom的方法
function _render({deps, value}) {
  deps.forEach(dep => {
     dep.textContent = value
  }) 
}

// 定义一个绑定事件方法  转译@click
export function bindEvent(nodes, methods) {
   console.log(this)
   nodes.forEach(el => {
      const handlerName = el.getAttribute('@click')
      if(handlerName) {
          el.addEventListener('click', methods[handlerName].bind(this), false)
      }
   })
}
