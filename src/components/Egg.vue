<template>
  <div title="鸡蛋" class="egg-wrapper">
    <div :class="['egg', progress >= 100 ? 'egg-ripe' : '']" @click="pickEgg"></div>
    <div class="egg-progress-wrap">
      <p class="add-exp" v-if="addExp">{{ addExp }}%</p>
      <p>{{ progress }}%</p>
      <div class="egg-progress">
        <div class="egg-progress-item" :style="{ width: `${progress}%` }"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
import { computed, watch, ref } from 'vue'
export default {
  name: 'egg',
  setup(props) {
    const store = useStore()

    // 增加的经验，以动画的方式显示
    let addExp = ref(0)

    watch(
      () => store.state.chick.egg.progress,
      (count, prevCount) => {
        addExp.value = count - prevCount
        setTimeout(() => {
          addExp.value = 0
        }, 1000)
      }
    )

    // 鸡蛋成熟，收蛋
    const pickEgg = () => {
      store.commit('pickEgg')
    }

    return {
      addExp,
      progress: computed(() => {
        return store.state.chick.egg.progress > 100 ? 100 : store.state.chick.egg.progress
      }),
      pickEgg
    }
  }
}
</script>
<style scoped>
/*鸡蛋*/
.egg-wrapper {
  position: absolute;
  bottom: 20%;
  left: 10%;
  width: 5rem;
  height: 5rem;
  z-index: 101;
}

.egg {
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 2.5rem;
  height: 3rem;
  margin-left: -1.25rem;
  background-color: #f2e3cb;
  background-image: radial-gradient(#fff, #f2e3cb);
  border-radius: 60% 60% 55% 55% / 80% 80% 50% 50%;
  z-index: 6;
  display: block;
  overflow: hidden;
  box-shadow: 0 0 5px #fff, 0 0 10px #cfffb6, 0 0 15px #59ff47;
}

.egg-progress-wrap {
  position: absolute;
  text-align: center;
  top: -1rem;
  left: 1.2rem;
  width: 2.5rem;
  height: 2.5rem;
}

.egg-progress {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2.5rem;
  height: 0.5rem;
  border-radius: 0.2rem;
  background: white;
  border: 1px solid #03a9f4;
  overflow: hidden;
}

.egg-progress-item {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #03a9f4;
  border: 1px solid #03a9f4;
  transition: all 0.3s;
}

.egg-progress-wrap > p {
  color: red;
  margin-top: 1rem;
  font-size: 0.7rem;
  text-align: center;
  font-weight: 600;
}

.egg-num {
  position: absolute;
  top: -0.8rem;
  left: -1px;
  width: 100%;
  color: red;
  text-align: center;
}

.egg-ripe {
  transform-origin: 50% 100%;
  animation: shake 1s ease infinite;
}
/* 鸡蛋成熟后的动画 */
@keyframes shake {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(-15deg);
  }
  50% {
    transform: rotate(0deg);
  }
  75% {
    transform: rotate(15deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

/* 鸡蛋经验增长动画 */
.egg-progress-wrap .add-exp {
  position: absolute;
  text-align: center;
  left: 10px;
  color: gold;
  font-size: 12px;
  animation: move-up 2s ease;
}

@keyframes move-up {
  0% {
    top: 0;
    opacity: 1;
  }
  75% {
    top: -50px;
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
