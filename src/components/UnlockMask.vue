<template>
  <transition name="fade">
    <div class="unlock-mask container" v-if="showFlag">
      <div class="panel">
        <div class="content">
          <p>确定解锁吗？</p>
          <p>解锁花费{{ unlockPrice }}</p>
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
import emitter from "../hooks/emiter";

import { ref } from "vue";

import { useStore } from "vuex";

export default {
  name: "unlock-mask",
  setup(props) {
    const showFlag = ref(false);

    const store = useStore();

    const unlockPrice = ref(0);

    emitter.on("show-unlock-mask", ({ status, id }) => {
      showFlag.value = status;
      unlockPrice.value = store.getters.unlockPrice(id);
    });

    const cancel = () => {
      showFlag.value = false;
    };

    const ensure = () => {
      emitter.emit("unlock-food");
      showFlag.value = false;
    };

    return {
      showFlag,
      unlockPrice,
      ensure,
      cancel,
    };
  },
};
</script>
<style scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
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
