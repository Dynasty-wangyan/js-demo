/*******
 * 观察者模式： 观察者（Observer）直接订阅（Subscribe） 主题（Subject）, 而当主题被激活的时候，会触发（Five Event）观察者里的事件
 * ******** */

// Subject  被观察对象
class Subject  {
    constructor(name) {
       // 被观察者名字
       this.name = name
       // 被观察对象的状态
       this.state = '开心'
       this.observers = []  // 存储观察者
    }
    // 需要将观察者放到自己身上
    attach(ther) {
      this.observers.push(ther)
    }
    // 更新被观察者的状态，告诉观察者
    setState(state) {
      this.state = state
      // 循环取出每个观察者
      this.observers.forEach(ther => {
         ther.update(this)
      })
    }
}

// 观察者
class Observer {
    constructor(name) {
       this.name = name
    }
    // 观察被观察者的状态
    update(subject) {
       console.log(`${this.name}: ${subject.name}, 当前状态是${subject.state} `)
    }
}

const baby = new Subject('小宝宝')

const father = new Observer('爸爸')
const mother = new Observer('妈妈')

baby.attach(father)
baby.attach(mother)

baby.setState('不开心了')
baby.setState('非常开心')