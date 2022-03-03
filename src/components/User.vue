<template>
  <div class="user">
    <div class="user-logo">
      <div class="user-level">{{ user.level }}</div>
      <span class="portrait-item">
        <img src="../assets/images/avatar.jpg" />
      </span>
    </div>
    <div class="user-info">
      <div class="user-name">{{ user.name }}</div>
      <div class="user-money">
        <p>{{ user.money }}</p>
        <p class="add-money" v-if="addMoney">{{ addMoney }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, watch } from "vue";

export default {
  setup(props) {
    const store = useStore();

    const addMoney = ref(0);

    watch(
      () => store.state.user.money,
      (money, prevMoney) => {
        addMoney.value = money - prevMoney;
        setTimeout(() => {
          addMoney.value = 0;
        }, 1000);
      }
    );

    return {
      addMoney,
      user: computed(() => store.state.user),
    };
  },
};
</script>
<style scoped lang="scss">
/* user 用户*/
.user {
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 30;
  display: flex;
  align-items: center;
  padding: 0.25rem 0.75rem 0.25rem 0.25rem;
  background: rgba(255, 255, 255, 0.75);
  border-radius: 3rem;
  padding-left: 50px;
}
.user-logo {
  border-radius: 100%;
  text-align: center;
  color: #ffbb38;
  background: #ffffff;
  border: 2px solid #fff;
  display: flex;
  font-size: 2rem;
  position: absolute;
  left: 0;
}
.user-logo .portrait-item {
  border: none;
  box-shadow: none;
  width: 40px;
  height: 40px;
}

.user-logo .portrait-item img {
  width: 100%;
  height: 100%;
  border-radius: 100%;
}
.user-level {
  position: absolute;
  bottom: -3px;
  left: 50%;
  color: rgb(255, 0, 0);
  font-weight: 800;
  background: #fff;
  font-size: 0.65rem;
  padding: 2px 8px;
  border-radius: 5px;
  // border: 2px solid #6b3900;
  transform: translateX(-50%);
}
.user-money {
  display: flex;
  color: #ffb304;
  font-size: 0.7rem;
  padding-top: 0.2rem;
}
.user-name {
  font-size: 0.75rem;
  font-weight: 600;
  color: #333;
}

// 增加money动画
.add-money {
  position: absolute;
  left: 120px;
  top: 50px;
  color: gold;
  font-size: 14px;
  font-weight: 800;
  animation: move-up 1.5s ease;
}

@keyframes move-up {
  0% {
    top: 50px;
    opacity: 1;
  }
  75% {
    top: 0px;
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
</style>
