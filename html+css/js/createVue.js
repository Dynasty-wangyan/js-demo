
import {ref, createRefs, render, bindEvent} from './hooks.js'

export function createApp(el, {
  refs,
  methods
}) {
   // 获取容器
   const $el = document.querySelector(el)
    // 获取容器下所有的dom树
   const allNodes = $el.querySelectorAll('*')
   console.log(allNodes);
   // 获取所有的dom并且初始化
   const refSet = createRefs(refs, allNodes)
   console.log(refSet);
   // 重新渲染dom 
   render(refSet)
   // 绑定事件
   bindEvent.apply(refSet, [allNodes, methods])
   /***
    * {
    *   title: {
    *     deps: [h1, h1],
    *     _value: defaultValue,
    *    _defaultValue: defaultValue,
    *     value: set => _value = newValue / update
    *            get => return _value
    *     $reset: () => 重置
    *   },
    *  content: {
    *      deps:[p, p],
    *      value: xxx
    * }
    * }
    * ****/
}

export {
  ref
}