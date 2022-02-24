import { createStore } from 'vuex'

import foodList from '../datas/foodList'

// 数据持久化插件，可以自动把数据保存在localStorage中
// import createPersistedState from 'vuex-persistedstate'

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
          exp: 0,         // 经验值
          upgradeExp: 100,// 升级所需经验
          level: 1,       // 等级
          eat: false,     // 是否在进食
          // 鸡蛋
          egg: {
            num: 0,       // 鸡蛋待拾取数量
            allNum: 0,    // 库存鸡蛋总量
            progress: 98, // 鸡蛋进度条   
            price: 2500,  // 鸡蛋价格
            eggBase: 50,  // 鸡蛋生成基数值：鸡蛋个数*基数 = 生成鸡蛋增加的数值
            addEggExps: 2 // 每次增加的鸡蛋经验  100个经验增加2%
          }
        },
        content: '好饿哦',      // 倒计时
        // 进度条
        value: 0
    },
    
    mutations: {

    },

    actions: {

    },

    getter: {

    }
})