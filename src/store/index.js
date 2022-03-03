import { createStore } from 'vuex'

import foodList from '../datas/foodList'

// 数据持久化插件，可以自动把数据保存在localStorage中
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  state: {
    isDrawerOpen: false,
    foodList: foodList,
    user: {
      name: '养鸡大王', //用户名
      money: 10000, //用户金额
      level: 1 //用户等级
    },
    // 小鸡信息
    chick: {
      exp: 0, // 经验值
      upgradeExp: 100, // 升级所需经验
      level: 1, // 等级
      eat: false, // 是否在进食
      // 鸡蛋
      egg: {
        num: 0, // 鸡蛋待拾取数量
        allNum: 0, // 库存鸡蛋总量
        progress: 98, // 鸡蛋进度条
        price: 2500, // 鸡蛋价格
        eggBase: 50, // 鸡蛋生成基数值：鸡蛋个数*基数 = 生成鸡蛋增加的数值
        addEggExps: 2 // 每次增加的鸡蛋经验  100个经验增加2%
      }
    },
    content: '好饿哦', // 倒计时
    // 进度条
    value: 0
  },
  mutations: {
    openDrawer(state, isDrawerOpen) {
      state.isDrawerOpen = isDrawerOpen
    },

    // 解锁饲料
    unlockFood(state, id) {
      state.foodList = state.foodList.map(food => {
        if (food.id === id) {
          let user = state.user
          if (user.money > food.unlockPrice) {
            user.money -= food.unlockPrice
            food.unlock = 1
          } else {
            console.log('解锁金额不够。。。')
          }
        }
        return food
      })
    },

    // 购买饲料
    buyFood(state, { id, num }) {
      // console.log('id:',id)
      state.foodList = state.foodList.map(food => {
        if (food.id === id) {
          let user = state.user
          if (user.money > food.price * num) {
            user.money -= food.price * num
            food.num = num
          } else {
            console.log('购买金额不够。。。')
          }
        }
        return food
      })
    },

    // 喂食小鸡
    feedChick(state, { id }) {
      // 饲料数量减一
      let exp = 0
      state.foodList = state.foodList.map(food => {
        if (food.id == id) {
          food.num--
          exp = food.exp
        }
        return food
      })
      // 小鸡经验增加
      state.chick.exp += exp
      // 设置为停止进食
      state.chick.eat = false

      // 增加鸡蛋经验
      if (state.chick.egg.progress <= 98) {
        state.chick.egg.progress += (exp / 100) * state.chick.egg.addEggExps

        state.chick.egg.progress = state.chick.egg.progress > 100 ? 100 : state.chick.egg.progress
      }
    },

    setChickEat(state, eat) {
      state.chick.eat = eat
    },

    // 设置进食进度
    setValue(state, { value, deltTime }) {
      let cont = ''
      if (deltTime > 0) {
        state.value = value
        cont = `${Math.floor(deltTime / 1000 / 60)}分${Math.ceil((deltTime / 1000) % 60)}秒`
      } else {
        state.value = 0
        cont = '好饿哦(⊙o⊙)…'
      }
      state.content = cont
    },
    // 收蛋
    pickEgg(state) {
      // 鸡蛋数量加一
      state.chick.egg.allNum += 1
      // 用户money增加
      state.user.money += state.chick.egg.price
      // 进度归零
      state.chick.egg.progress = 0
    }
  },

  actions: {
    feedChick(store, { id }) {
      if (!store.state.chick.eat) {
        console.log('喂小鸡。。。。')

        // 更新小鸡状态为正在吃东西
        store.commit('setChickEat', true)
        let startTime = new Date().getTime()
        let endTime = startTime

        let eatTime = store.state.foodList.filter(food => food.id === id)[0].eatTime
        var val = 0
        let timer = setInterval(() => {
          endTime = new Date().getTime()
          val = (endTime - startTime) / eatTime
          store.commit('setValue', {
            value: val,
            deltTime: eatTime - (endTime - startTime)
          })

          if (val >= 1) {
            clearInterval(timer)
            store.commit('feedChick', { id })
          }
        }, 16)
      } else {
        console.log('还没吃完呢，稍后再喂吧。。。')
      }

      // 关闭抽屉
      store.commit('openDrawer', false)
    }
  },

  getters: {
    unlockPrice: state => id => {
      let food = state.foodList.filter(food => (food.id == id ? food : null))
      if (food) {
        return food[0].unlockPrice
      } else {
        return ''
      }
    },
    theFood:
      state =>
      (id = 1) => {
        let food = state.foodList.filter(food => (food.id == id ? food : null))[0]
        return food
      }
  },
  plugins: [createPersistedState()]
})
