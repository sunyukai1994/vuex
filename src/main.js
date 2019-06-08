import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(Vuex)
// 核心概念1:state是Vuex中的公共的状态, 我是将state看作是所有组件的data, 用于保存所有组件的公共数据.
const store = new Vuex.Store({
  // 此时我们就可以把App.vue中的两个组件共同使用的data抽离出来, 放到state中,代码如下
  state:{ 
    products: [
      {name: '鼠标', price: 20},
      {name: '键盘', price: 40},
      {name: '耳机', price: 60},
      {name: '显示屏', price: 80}
    ]
  },
  // 核心概念2:getters
  // 我将getters属性理解为所有组件的computed属性, 也就是计算属性. 
  // vuex的官方文档也是说到可以将getter理解为store的计算属性, 
  // getters的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
  getters:{
    // saleProducts对象将state中的价格减少一半(除以2)
    saleProducts: (state) => {
      let saleProducts = state.products.map( product => {
        return {
          name: product.name,
          price: product.price / 2
        }
      })
      return saleProducts;
    }
  },
  // 核心概念3:mutations
  // 我将mutaions理解为store中的methods, mutations对象中保存着更改数据的回调函数,
  // 该函数名官方规定叫type, 第一个参数是state, 第二参数是payload, 也就是自定义的参数.
  mutations:{
    // minusPrice这个回调函数用于将商品的价格减少payload这么多
    minusPrice (state, payload ) {
      let newPrice = state.products.forEach( product => {
        product.price -= payload
      })
      return newPrice;
    }
  },
  // 核心概念4:actions
  // actions 类似于 mutations，不同在于：
  // actions提交的是mutations而不是直接变更状态
  // actions中可以包含异步操作, mutations中绝对不允许出现异步
  // actions中的回调函数的第一个参数是context, 是一个与store实例具有相同属性和方法的对象
  // 此时,我们在store中添加actions属性, 其中minusPriceAsync采用setTimeout来模拟异步操作, 延迟2s执行 
  // 该方法用于异步改变我们刚才在mutaions中定义的minusPrice
  actions:{
    minusPriceAsync( context, payload ) {
      setTimeout( () => {
        context.commit( 'minusPrice', payload ); //context提交
      }, 2000)
    }
  }
  // 核心概念5:module
  // 由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。
  // 当应用变得非常复杂时，store 对象就有可能变得相当臃肿。
  // 为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。
  // 每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割
  // const moduleA = {
  //   state: { ... },
  //   mutations: { ... },
  //   actions: { ... },
  //   getters: { ... }
  // }
  
  // const moduleB = {
  //   state: { ... },
  //   mutations: { ... },
  //   actions: { ... }
  // }
  
  // const store = new Vuex.Store({
  //   modules: {
  //     a: moduleA,
  //     b: moduleB
  //   }
  // })
  
  // store.state.a // -> moduleA 的状态
  // store.state.b // -> moduleB 的状态
})
new Vue({
  render: h => h(App),
  store,
}).$mount('#app')
