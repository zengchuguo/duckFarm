<template>
  <div class="nav">
    <ul class="nav-list">
      <li>
        <img class="nav-icon" src="../assets/images/dt.png" /><span
          class="nav-name"
          >动态</span
        >
      </li>
      <li>
        <img class="nav-icon" src="../assets/images/zb.png" /><span
          class="nav-name"
          >装扮</span
        >
      </li>
      <li>
        <img class="nav-icon" src="../assets/images/dj.png" /><span
          class="nav-name"
          >道具</span
        >
      </li>
      <li>
        <img class="nav-icon" src="../assets/images/ydh.png" /><span
          class="nav-name"
          >运动会</span
        >
      </li>
    </ul>

    <div class="siliao" @click="openDrawer">
      <img class="nav-icon" src="../assets/images/food.png" /><span
        class="nav-name"
        >0g</span
      >
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
export default {
  setup(props, { emit }) {
    const store = useStore();

    const openDrawer = () => {
      console.log('click')
      store.commit("openDrawer", true);
    };

    return {openDrawer};
  },
};
</script>
<style scoped>
/* 功能菜单 */
.nav-list {
  position: absolute;
  top: 15px;
  right: 15px;
  z-index: 100;
}

.nav-list li {
  position: relative;
  width: 50px;
  height: 50px;
  margin-bottom: 15px;
  border-radius: 50%;
  background: #ffe099;
  border: 2px solid #ffffff;
  text-align: center;
}

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
