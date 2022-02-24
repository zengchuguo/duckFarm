<template>
    <div :class="['chick', {'eat': chick.eat }]">
        
    </div>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
export default {
    setup(){
        const store = useStore()

        return {
            chick: computed(() => store.state.chick),
        }
    }
};
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
.eat {
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

</style>