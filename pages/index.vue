<template>
  <div class="content bg flex-column">
    <p class="mb-5 text-h2 font-weight-bold d-none d-sm-flex">
      Database system's classification of roasted coffee bean
    </p>
    <p class="mb-5 text-h4 font-weight-bold d-flex d-sm-none">
      Database system's classification of roasted coffee bean
    </p>

    <v-btn
      to="/homepage"
      size="large"
      class="font-weight-bold mt-15"
      rounded
      color="#38241d"
      >Enter site</v-btn
    >
  </div>
</template>

<script>
export default {};
</script>
<style scoped>
.bg {
  /*need to change background image to coffee field*/
  background-image: url("../assets/welcomepic2.jpg");
  height: 100%;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}
.content {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
}
.my-btn {
  opacity: 0.7;
}
p {
  color: rgb(236, 236, 236);
}
</style>
