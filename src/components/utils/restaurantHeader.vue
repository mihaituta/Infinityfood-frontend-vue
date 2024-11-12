<template>
  <v-toolbar fixed dark color="dark">
    <router-link to="/">
      <v-img v-if="logoImage" contain width="280" :src="require('../../assets/'+logoImage)"/>
    </router-link>
    <v-spacer></v-spacer>
    <v-toolbar-items class="hidden-sm-and-down">
      <v-btn color="" flat to="/">
        <v-icon class="pr-2">restaurant</v-icon>
        Restaurants
      </v-btn>
      <v-btn color="" flat @click="$vuetify.goTo('.t2', options)">
        <v-icon class="pr-2">fastfood</v-icon>
        Order
      </v-btn>
      <v-btn color="" flat @click="$vuetify.goTo('.t1', options)">
        <v-icon class="pr-2">people</v-icon>
        About us
      </v-btn>
      <v-btn color="" flat @click="$vuetify.goTo('.t3', options)">
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
import * as easings from 'vuetify/es5/util/easing-patterns'

export default {
  data() {
    return {
      logoImage: 'smallLogoWhiteBlue.png',
      duration: 1000,
      offset: 80,
      easing: 'easeInOutCubic',
      easings: Object.keys(easings)
    }
  },
  computed: {
    target() {
      const value = this[this.type];
      if (!isNaN(value)) return Number(value);
      else return value
    },
    options() {
      return {
        duration: this.duration,
        offset: this.offset,
        easing: this.easing
      }
    },
  }

}
</script>

<style scoped>

</style>