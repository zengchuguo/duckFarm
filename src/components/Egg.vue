<template>
    <divc class="egg-wrapper">
        <div
            :class="['egg', progress >= 100 ? 'egg-ripe' : '']"
            @click="pickEgg"
        ></div>
    </divc>
</template>

<script>
import { useStore } from "vuex";
import { watch } from "vue";
export default {
    setup(){
        const store = useStore();

        watch(
            () => store.state.chick.egg.progress,
        );

        const pickEgg = () => {
            console.log('鸡蛋成熟，收蛋')
        }

        return {
            pickEgg
        }
    }
};
</script>

<style scoped>
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
  box-shadow: 0 0 5px #fff, 0 0 10px rgb(207, 255, 182),
    0 0 15px rgb(89, 255, 71);
}
</style>