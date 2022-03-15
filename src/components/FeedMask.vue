<template>
  <transition name="fade">
    <div class="feed-mask container" v-if="showFlag">
      <div class="panel">
        <img :src="food.url" />
        <div class="food-info">
          <p>物品名称： {{ food.name }}</p>
          <p>拥有数量：{{ food.num }}</p>
          <p>进食时长：{{ eatTime }}</p>
          <p>获得经验：{{ food.exp }}</p>
        </div>

        <img src="../assets/images/close.png" class="close-btn" @click="cancel" />
        <button @click="feedChick(food.id)">喂食</button>
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
      id: 0
    })

    emitter.on('show-feed-mask', ({ status, id }) => {
      showFlag.value = status
      data.food = store.getters.theFood(id)
      data.id = id
    })

    const cancel = () => {
      showFlag.value = false
    }

    const feedChick = id => {
      store.dispatch('feedChick', {
        id
      })
      showFlag.value = false
    }

    const eatTime = computed(() => {
      let eatTime = data.food.eatTime
      let min = Math.floor(eatTime / 1000 / 60)
      let sec = Math.ceil((eatTime / 1000) % 60)
      return `${min}分${sec}秒`
    })

    return {
      showFlag,
      food: computed(() => data.food),
      feedChick,
      cancel,
      eatTime
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
}
.panel .food-info {
  font-size: 16px;
  box-sizing: border-box;
  padding-left: 40px;
  color: #333;
}

.panel img {
  height: 80px;
  margin-top: -50px;
}
.panel p {
  margin-top: 10px;
  text-align: left;
}
.panel button {
  width: 100%;
  height: 40px;
  border: none;
  margin-top: 20px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  font-size: 18px;
  background-color: rgb(13, 168, 80);
  color: #fff;
}

.panel .close-btn {
  width: 20px;
  height: 20px;
  border-radius: 20px;
  background-color: #fff;
  position: absolute;
  top: 35px;
  right: -10px;
  padding: 5px;
  border: solid 1px #ccc;
}
</style>
