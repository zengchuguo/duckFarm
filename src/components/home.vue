<template>
    <div class="home">
        <div>
            <GrassLand />
            <Chick />
            <Egg/>
        </div>
    </div>
</template>

<script>
import GrassLand from './Grass.vue'
import Chick from './Chick.vue'
import Egg from './Egg.vue'

export default {
    components: {
        GrassLand,
        Chick,
        Egg
    },

};
</script>

<style scoped>
.home {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  background-image: -webkit-linear-gradient(to bottom, #4aaeff, #fff);
  background-image: linear-gradient(to bottom, #4aaeff, #fff);
  overflow: hidden;
}
</style>