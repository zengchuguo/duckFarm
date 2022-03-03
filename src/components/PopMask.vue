<template>
  <div>
    <transition name="fade">
      <div class="popup-mask" v-show="isMaskShow" @click="hideMask"></div>
    </transition>

    <transition name="slide">
      <div class="content" v-show="isMaskShow">
        <header>
          <h1>饲料</h1>
          <div class="close-btn" @click="hideMask"></div>
        </header>

        <div>
          <FoodList />
        </div>
      </div>
    </transition>

    <UnlockMask />
    <Buymask />

    <FeedMask />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import FoodList from "./FoodList.vue";

// 解锁界面
import UnlockMask from "./UnlockMask.vue";
// 购买界面
import Buymask from "./BuyMask.vue";
// 喂食界面
import FeedMask from "./FeedMask.vue";

export default {
  components: { FoodList, UnlockMask, Buymask, FeedMask },
  setup(props) {
    const store = useStore();

    const hideMask = () => {
      store.commit("openDrawer", false);
    };

    return {
      isMaskShow: computed(() => store.state.isDrawerOpen),
      hideMask,
    };
  },
};
</script>
<style scoped>
/* 换装场景 */
.popup-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 199;
  /* display: none; */
}

.content {
  position: absolute;
  width: 100%;
  height: 70%;
  background-color: #fff;
  position: absolute;
  bottom: 0;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  transform: translateY(0px);
  z-index: 200;
}
.content h1 {
  width: 100%;
  height: 45px;
  border-bottom: solid 1px #ccc;
  text-align: center;
  line-height: 45px;
  font-size: 20px;
  color: #666;
}

.content .close-btn {
  width: 20px;
  height: 20px;
  background: url(../assets/images/close.png) no-repeat;
  background-size: 100%;
  position: absolute;
  right: 15px;
  top: 15px;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: all 0.5s ease;
}

.slide-enter-to,
.slide-leave-from {
  transform: translateY(0px);
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(500px);
}
</style>
