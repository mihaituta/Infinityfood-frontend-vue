<template>
  <div>
    <v-layout class="wrap">
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-img class="mt-3 mr-2" max-width="215px"
                 :src="require('../assets/blueWhiteLogo.png')"></v-img>
          <div class="logo" style="color: #1b6cc4;">Cont</div>
          <div class="logo">act</div>
        </v-layout>
      </v-container>
    </v-layout>
    <v-container style="width:70%">
      <v-layout>
        <v-flex>
          <div class="titleText mb-3 mt-3">Contact</div>
          <div class="contentText mb-4">
            We enjoy talking with those who order food on InfinityFood because that's how we find out what we should do
            better.
            That's why we encourage you to tell us what you like and what you don't when you order food from us.
          </div>
          <v-divider></v-divider>
          <div class="titleText mb-3 mt-3">Customer support</div>
          <div class="contentText mb-2">
            <v-layout column>
              <v-flex class="mb-2">
                <v-icon>mail</v-icon>
                E-mail:
                <span style="color: #1b6cc4;">support@infinityfood.ro</span>
              </v-flex>
              <v-flex class="mb-2">
                <v-icon>phone</v-icon>
                Telekom:
                <span style="color: #1b6cc4;">0760 432 235</span>
              </v-flex>
              <v-flex class="mb-2">
                <v-icon>phone</v-icon>
                Vodafone:
                <span style="color: #1b6cc4;">0729 963 143</span>
              </v-flex>
              <v-flex class="mb-4">
                <v-icon>phone</v-icon>
                Digi:
                <span style="color: #1b6cc4;">0722 343 122</span>
              </v-flex>
            </v-layout>
            <v-divider></v-divider>
          </div>
          <div class="titleText mb-3 mt-3">Partners</div>
          <div class="contentText mb-2">Do you want to become our partner? You want to see your restaurant
            on the site? Or are you already a partner and have questions about our services?
          </div>
          <div class="contentText mb-4">
            Call
            <v-icon class="mr-2">phone</v-icon>
            <span style="color: #1b6cc4;">0762 188 254</span>
            or email us at
            <v-icon class="mr-2">mail</v-icon>
            <span style="color: #1b6cc4;">partener@infinityfood.ro</span>
            we are happy to help you with anything.
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  created() {
    window.addEventListener('scroll', this.handleScroll);
  },

  destroyed() {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    handleScroll() {
      let scrolled = window.pageYOffset;
      let background = document.querySelector(".wrap");
      background.style.backgroundPosition = '0%' + (-(scrolled * 0.6) + 'px');
    }
  }
}
</script>

<style scoped>
.wrap {
  height: 500px;
  font-size: 55px;
  font-weight: bold;
  color: white;
  text-shadow: 3px 3px black;
  width: 100%;
  background-image: url('../assets/contactbgdark.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.logo {
  font-size: 110px;
  font-weight: bold;
  font-family: sans-serif;
}

.titleText {
  font-family: sans-serif;
  font-size: 35px;
}

.contentText {
  font-family: sans-serif;
  font-size: 21px;
  text-align: justify;
}
</style>