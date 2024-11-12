<template>
  <v-footer
      dark
      height="auto"
      class="footer"
      width="100%"
  >
    <v-card
        flat
        tile
        class="text-xs-center flex"
    >
      <v-card-text>
        <v-layout
            justify-center
            row
            wrap
        >
          <v-btn
              color="white"
              flat
              round
              @click.native="scrollToTop"
              to="/">
            <v-icon class="pr-2">restaurant</v-icon>
            Restaurants
          </v-btn>
          <v-btn
              color="white"
              flat
              round
              @click.native="scrollToTop"
              to="/about">
            <v-icon class="pr-2">people</v-icon>
            About us
          </v-btn>
          <v-btn
              color="white"
              flat
              round
              @click.native="scrollToTop"
              to="/contact">
            <v-icon class="pr-2">mail</v-icon>
            Contact
          </v-btn>

        </v-layout>
      </v-card-text>
      <v-card-text class="text pt-0">
        What does InfinityFood offer? Possibility to enjoy delicious dishes from restaurants in your area.
        A wide range of delicious dishes are at your disposal with just a few clicks.
      </v-card-text>

      <v-divider></v-divider>

      <v-card-text class="white--text">
        &copy;2019 - <strong>InfinityFood.</strong> All rights reserved.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<script>
export default {
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    }
  }
}
</script>

<style scoped>
.text {
  font-size: 17px;
}

.footer{
  bottom: 0;
  width: 100%;
}
</style>