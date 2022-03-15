<template>
  <div :class="['chick', { 'chick-eat': chick.eat }]">
    <div class="eat-status">{{ content }}</div>
    <div class="progress" v-if="width > 0">
      <div class="value" :style="{ width: `${width}px` }"></div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'
export default {
  name: '',
  setup(props) {
    const store = useStore()

    return {
      width: computed(() => store.state.value * 150),
      chick: computed(() => store.state.chick),
      content: computed(() => store.state.content)
    }
  }
}
</script>
<style scoped>
.chick {
  width: 12.375rem;
  height: 14.1875rem;
  background-image: url(../assets/images/chicken.png);
  background-repeat: no-repeat;
  background-size: 100%;
  position: absolute;
  z-index: 100;
  left: 50%;
  margin-left: -100px;
  bottom: 10rem;
}

.chick-eat {
  background-size: 200%;
  animation: chicken-ani 0.8s step-start infinite;
}

@keyframes chicken-ani {
  0% {
    background-image: url(../assets/images/chicken-ani.png);
    background-position: 0px, 0;
  }
  25% {
    background-image: url(../assets/images/chicken-ani.png);
    background-position: -198px, 0;
  }
  75% {
    background-image: url(../assets/images/chicken-ani.png);
    background-position: 0px, 0;
  }
  100% {
    background-image: url(../assets/images/chicken-ani.png);
    background-position: -198px, 0;
  }
}

.chick .eat-status {
  width: 150px;
  margin: 0 auto;
  height: 20px;
  line-height: 20px;
  background-color: #f89f2b;
  color: #fff;
  padding: 10px;
  text-align: center;
  border-radius: 20px;
  margin-top: -80px;
}

.progress {
  width: 150px;
  height: 5px;
  background-color: #b596d2;
  border-radius: 5px;
  overflow: hidden;
  position: relative;
  margin: 10px auto;
}
.progress .value {
  /* width: 150px; */
  height: 5px;
  background-color: #8a2be2;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
