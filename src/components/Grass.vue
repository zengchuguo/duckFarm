<template>
  <div class="land">
    <div class="grass-1">
      <span></span>
    </div>
    <img class="bowl" src="../assets/images/bowl.png" />
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },

  mounted() {},

  methods: {}
}
</script>

<style scoped>
.land {
  position: absolute;
  width: 100%;
  height: 50%;
  bottom: 0;
  left: 0;
}
.grass-1 {
  position: absolute;
  width: 100%;
  height: 100%;
  bottom: 0;
  left: 0;
  box-shadow: 0 0 5px #fff;
  background-image: linear-gradient(#b7f03b, #15530b);
  border-top-left-radius: 120% 30%;
  border-top-right-radius: 70% 5%;
  position: relative;
  z-index: 2;
}
.grass-1 span {
  content: '';
  display: block;
  width: 100%;
  height: 80%;
  background-image: linear-gradient(#b7f03b, #38862c);
  top: 20%;
  border-top-right-radius: 80% 30%;
  opacity: 0.2;
  position: absolute;
  z-index: 2;
}
.bowl {
  width: 70px;
  height: 30px;
  position: absolute;
  right: 7rem;
  bottom: 5rem;
  z-index: 99;
}
</style>