<template>
  <div class="food-list">
    <div class="food-item" v-for="f in foods" :key="f.id" @click="feedChick(f)">
      <div class="item-mask" v-if="f.num <= 0">
        <p class="buy-btn" v-show="f.unlock === 1" @click.stop="buyFood(f.id)">购买</p>
        <p class="unlock-btn" v-show="f.unlock === 0" @click.stop="unlockFood(f.id)">解锁</p>
      </div>
      <img :src="f.url" />
      <p>
        {{ f.name }}
        <span>{{ f.num }}</span>
      </p>
    </div>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { computed } from 'vue'

import emitter from '../hooks/emiter'

const store = useStore()
const foods = computed(() => store.state.foodList)

/* 购买食料  */
const buyFood = id => {
  emitter.emit('show-buy-mask', {
    status: true,
    id: id
  })

  emitter.on('buy-food', () => {
    store.commit('buyFood', id)
    emitter.off('unlock-food')
  })
}

/* 解锁食料 */
const unlockFood = id => {
  emitter.emit('show-unlock-mask', {
    status: true,
    id: id
  })

  emitter.on('unlock-food', () => {
    store.commit('unlockFood', id)
    emitter.off('unlock-food')
  })
}

const feedChick = food => {
  console.log(food)
  if (food.unlock === 0) unlockFood(food.id)
  else if (food.num === 0) buyFood(food.id)
  else
    emitter.emit('show-feed-mask', {
      status: true,
      id: food.id
    })
}
</script>
<style scoped>
.food-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 10px;
}

.food-item {
  width: calc(25% - 10px);
  margin: 5px;
  height: 88px;
  border: solid 1px #aaa;
  border-radius: 5px;
  box-sizing: border-box;
  text-align: center;
  position: relative;
}
.food-item p {
  font-size: 12px;
  color: #333;
}

.food-item .item-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: #00000080;
}

.food-item .item-mask .buy-btn {
  background-color: #10b369;
  color: #fff;
  width: 55px;
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  font-size: 1rem;
  margin: 1.8rem auto;
}

.food-item .item-mask .unlock-btn {
  background-color: #ff8800;
  color: #fff;
  width: 55px;
  height: 32px;
  line-height: 32px;
  border-radius: 5px;
  font-size: 1rem;
  margin: 1.8rem auto;
}
</style>
