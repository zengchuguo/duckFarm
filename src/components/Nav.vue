<template>
  <div class="nav">
    <div class="siliao" @click="openDrawer">
      <img class="nav-icon" src="../assets/images/food.png" />
      <span class="nav-name">食物</span>
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex'
export default {
  setup(props, { emit }) {
    const store = useStore()

    const openDrawer = () => {
      store.commit('openDrawer', true)
    }

    return { openDrawer }
  }
}
</script>
<style scoped>
/* 功能菜单 */

.nav-icon {
  width: 80%;
  height: 80%;
  margin: 10%;
}

.nav-name {
  position: absolute;
  bottom: -4px;
  left: 50%;
  width: 42px;
  padding: 3px 0;
  border-radius: 20px;
  text-align: center;
  font-size: 12px;
  color: #333;
  background: #ffffff;
  transform: translateX(-50%);
}

.siliao {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: solid 4px #9e7f38;
  background: #3e3110;
  position: absolute;
  right: 30px;
  bottom: 30px;
  z-index: 100;
}
</style>
