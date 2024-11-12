<template>
  <div>
    <v-layout class="wrap">
      <v-container fill-height>
        <v-layout align-center justify-center>
          <v-img class="mt-3 mr-2" max-width="215px"
                 :src="require('../assets/blueWhiteLogo.png')"></v-img>
          <div class="mr-3 logodiv" style="color: #1b6cc4;">About</div>
          <div style="color: white" class="logodiv">us</div>
        </v-layout>
      </v-container>
    </v-layout>
    <v-container style="width:70%">
      <v-layout>
        <v-flex>
          <div class="mb-3 sTitle">About us</div>
          <div style="color: #434543">
            <div class="text mb-2">What is InfinityFood? A creative and dynamic team, happily trained to help you with
              anything.
            </div>
            <div class="text mb-2">What does InfinityFood do? Work optimistically to give you the best services to order
              food online.
            </div>
            <div class="text mb-2">What motivates InfinityFood? The desire to provide daily services at a quality level
              achieved only by professionals.
            </div>
            <div class="text mb-4">What does InfinityFood offer? Possibility to enjoy delicious dishes from restaurants
              in your area.
              A wide range of delicious dishes are at your disposal with just a few clicks.
            </div>
          </div>
          <v-divider></v-divider>
          <div class="mb-3 mt-3 sTitle">How to order</div>
          <div class="text mb-2">1. Choose the city and restaurant you want to order from.</div>
          <div class="text mb-2">2. Add the food you want by pressing +, and when you're done click on "Order Now".
          </div>
          <div class="text mb-2">3. Fill in your address and contact details, then click "Confirm order" to confirm.
          </div>
          <div class="text mb-4">4. Good appetite! The food is prepared and delivered to your door by us.
          </div>
          <v-divider class="mb-2"></v-divider>
          <v-btn
              color="primary"
              class="pl-4 pr-4 mt-4 mb-3 comandabtn"
              to="/"
          >
            Order now
          </v-btn>
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
  color: white;
  text-shadow: 3px 3px black;
  width: 100%;
  background-image: url('../assets/aboutbgdark.jpg');
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
}

.text {
  font-size: 21px;
  font-family: sans-serif;
  text-align: justify;
}

.sTitle {
  font-size: 35px;
  font-family: sans-serif;

}

.logodiv {
  font-size: 110px;
  font-weight: bold;
  /*#526372*/
  font-family: sans-serif;
}

.comandabtn {
  font-size: 30px;
  height: 47px;
  font-family: sans-serif;
  border-radius: 5px;
}

</style>