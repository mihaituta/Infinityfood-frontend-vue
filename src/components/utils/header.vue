<template>
  <v-toolbar dark color="dark">
    <router-link to="/">
      <v-img v-if="logoImage" contain width="280" :src="require('../../assets/'+logoImage)"/>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn color="" flat to="/">
        <v-icon class="pr-2">restaurant</v-icon>
        Restaurants
      </v-btn>
      <v-btn color="" flat to="/about">
        <v-icon class="pr-2">people</v-icon>
        About us
      </v-btn>
      <v-btn color="" flat to="/contact">
        <v-icon class="pr-2">mail</v-icon>
        Contact
      </v-btn>
      <v-btn color="" flat to="/login">
        <v-icon class="pr-2">logout</v-icon>
        Login
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
export default {
  data() {
    return {
      logoImage: ''
    }
  },
  watch: {
    $route(to, from) {
      if (this.$router.currentRoute.name === 'storeslist')
        this.logoImage = 'smallLogoWhiteBlue.png';
      else if (this.$router.currentRoute.name === 'login')
        this.logoImage = 'smallLogoWhiteRed.png';
      else
        this.logoImage = 'smallLogoWhiteBlue.png';
    }
  },
  created() {
    if (this.$router.currentRoute.name === 'storeslist') {
      this.logoImage = 'smallLogoWhiteBlue.png';
    } else if (this.$router.currentRoute.name === 'login')
      this.logoImage = 'smallLogoWhiteRed.png';
    else
      this.logoImage = 'smallLogoWhiteBlue.png';
  }
}
</script>

<style scoped>

</style>