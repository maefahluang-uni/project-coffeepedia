<template>
  <div class="content font-weight-bold bg text-h2">
    <p>Database system's classification of roasted coffee bean</p>
  </div>
  <v-row justify="center">
    <v-btn
      to="/homepage"
      size="large"
      class="my-btn font-weight-bold"
      rounded
      color="#38241d"
      >Enter site</v-btn
    >
  </v-row>
</template>

<script>
export default {};
</script>
<style scoped>
.bg {
  background-image: url("../assets/welcomepic.jpg");
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
  position: absolute;
  bottom: 200px;
}
p {
  color: rgb(236, 236, 236);
}
</style>
