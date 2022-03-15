<template>
  <transition name="fade">
    <div class="buy-mask container" v-if="showFlag">
      <div class="panel">
        <div class="content">
          <h1>{{ food.name }}</h1>
          <p>单价：￥{{ food.price }}/个</p>
          <div class="price-steper">
            <button @click="minNum">-</button>
            <span class="num">{{ num }}</span>
            <button @click="addNum">+</button>
          </div>
          <p>总价 ￥{{ food.price * num }}</p>
        </div>
        <div class="button-groups">
          <button @click="cancel">取消</button>
          <button class="ok" @click="ensure">确认</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import emitter from '../hooks/emiter'

import { ref, computed, reactive } from 'vue'

import { useStore } from 'vuex'

export default {
  name: 'buy-mask',
  setup(props) {
    const showFlag = ref(false)

    const store = useStore()

    const data = reactive({
      food: {},
      id: 0,
      num: 0
    })

    emitter.on('show-buy-mask', ({ status, id }) => {
      showFlag.value = status
      data.food = store.getters.theFood(id)
      data.id = id
      data.num = 0
    })

    const cancel = () => {
      showFlag.value = false
    }

    const ensure = () => {
      if (data.num === 0) {
        showFlag.value = false
        return
      }
      store.commit('buyFood', {
        id: data.id,
        num: data.num
      })
      showFlag.value = false
    }

    // 增加数量
    const addNum = () => {
      data.num++
    }
    // 减少数量
    const minNum = () => {
      if (data.num > 0) {
        data.num--
      }
    }

    return {
      showFlag,
      num: computed(() => data.num),
      food: computed(() => data.food),
      ensure,
      cancel,
      addNum,
      minNum
    }
  }
}
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #00000080;
  position: absolute;
  z-index: 299;
}

.panel {
  width: 80%;
  min-width: 300px;
  max-width: 400px;
  background-color: #fff;
  border-radius: 5px;
  margin: 0 auto;
  position: absolute;
  top: 25%;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 16px;
  overflow: hidden;
}

.panel .content {
  padding: 20px 0;
  color: #666;
}
.panel .content p {
  margin-top: 10px;
}
.price-steper {
  margin: 10px auto;
}
.price-steper .num {
  display: inline-block;
  width: 30px;
}
.panel .button-groups {
  height: 50px;
  display: flex;
}
.panel .button-groups button {
  border: none;
  flex: 1;
}
.ok {
  background-color: red;
  color: #fff;
}
</style>
