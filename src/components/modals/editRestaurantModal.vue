<template>
  <v-layout>
    <v-dialog v-model="openModal" max-width="35%" scrollable transition="slide-y-transition">
      <v-card>
        <v-card-text class="pt-0 pb-0" style="height: 100%;">
          <v-card-title class="pa-0 mb-4">
            <v-spacer></v-spacer>
            <v-btn flat fab small @click="openModal = false">
              <v-icon size="25px">close</v-icon>
            </v-btn>
            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
              <div class="title">
                <v-icon>restaurant</v-icon>
                Update Restaurant
              </div>
            </v-flex>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-container class="pl-3 pr-3 pb-1">
              <v-layout column>
                <v-flex xs12>
                  <v-text-field prepend-icon="create" v-model="restaurantList.name" label="Restaurant name"
                    :rules="nameRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select prepend-icon="person" :items=users item-text="name" item-value="id"
                    label="Restaurant administrator" v-model="restaurantList.userId" :rules="userIdRules"></v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="location_city" v-model="restaurantList.city" label="City"
                    :rules="cityRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurantList.previewDescription"
                    label="Preview description" rows="1" auto-grow :rules="previewDescriptionRules"></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurantList.aboutText" label="Description" rows="1"
                    auto-grow :rules="aboutTextRules"></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurantList.contactText"
                    label="Contact description" rows="1" auto-grow :rules="contactTextRules"></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="phone" v-model="restaurantList.phone1" label="Phone 1"
                    :rules="phone1Rules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="phone" v-model="restaurantList.phone2" label="Phone 2"
                    :rules="phone2Rules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="mail" v-model="restaurantList.mail1" label="E-mail 1"
                    :rules="mail1Rules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="mail" v-model="restaurantList.mail2" label="E-mail 2"
                    :rules="mail2Rules"></v-text-field>
                </v-flex>

                <v-flex xs12 class="mt-3">
                  <v-icon class="pr-2">photo</v-icon>
                  <span class="subheading mr-3">Preview Image</span>
                  <v-btn @click="pickPreviewImage" color="primary" class="ma-0">
                    <v-icon left dark>add_photo_alternate</v-icon>
                    Choose image
                  </v-btn>
                  <div v-if="previewImageTooBig" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is too big, resolution must be 1920x1080 or smaller.
                  </div>
                  <div v-else-if="previewImageError" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is required!
                  </div>
                </v-flex>
                <input type="file" style="display:none" ref="previewImage" accept="image/*"
                  @change="onPreviewImageChanged">
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-tooltip top max-width="600px" color="white">
                    <template v-slot:activator="{ on }">
                      <img :src="previewImageURL" v-on="on" width="60%" v-if="previewImageURL" />
                      <img :src="path + restaurantList.previewImage" v-on="on" width="60%"
                        v-else-if="restaurantList.previewImage" />
                    </template>
                    <img :src="previewImageURL" width="100%" v-if="previewImageURL" />
                    <img :src="path + restaurantList.previewImage" width="100%"
                      v-else-if="restaurantList.previewImage" />
                  </v-tooltip>
                </v-flex>
                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <div v-if="previewImageName" class="subheading font-weight-light text-truncate">
                    {{ previewImageName }}
                  </div>
                </v-flex>

                <v-flex xs12 class="mt-1">
                  <v-icon class="pr-2">photo</v-icon>
                  <span class="subheading mr-3">Background Image</span>
                  <v-btn @click="pickBgImage" color="primary" class="ma-0">
                    <v-icon left dark>add_photo_alternate</v-icon>
                    Choose Image
                  </v-btn>
                  <div v-if="bgImageTooBig" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is too big, resolution must be 1920x1080 or smaller.
                  </div>
                  <div v-else-if="bgImageError" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is required!
                  </div>
                </v-flex>
                <input type="file" style="display:none" ref="bgImage" accept="image/*" @change="onBgImageChanged">
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-tooltip top max-width="800px" color="white">
                    <template v-slot:activator="{ on }">
                      <img :src="bgImageURL" v-on="on" width="90%" v-if="bgImageURL" />
                      <img :src="path + restaurantList.backgroundImage" v-on="on" width="90%"
                        v-else-if="restaurantList.backgroundImage" />
                    </template>
                    <img :src="bgImageURL" width="100%" v-if="bgImageURL" />
                    <img :src="path + restaurantList.backgroundImage" width="100%"
                      v-else-if="restaurantList.backgroundImage" />
                  </v-tooltip>
                </v-flex>
                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <div v-if="bgImageName" class="subheading font-weight-light text-truncate">
                    {{ bgImageName }}
                  </div>
                </v-flex>

                <v-flex xs12 class="mt-1">
                  <v-icon class="pr-2">photo</v-icon>
                  <span class="subheading mr-3">Restaurant logo</span>
                  <v-btn @click="pickLogoImage" color="primary" class="ma-0">
                    <v-icon left dark>add_photo_alternate</v-icon>
                    Choose Image
                  </v-btn>
                  <div v-if="logoImageTooBig" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is too big, resolution must be 1920x1080 or smaller.
                  </div>
                  <div v-else-if="logoImageError" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is required!
                  </div>
                </v-flex>
                <input type="file" style="display:none" ref="logoImage" accept="image/*" @change="onLogoImageChanged">
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-tooltip top max-width="400px" color="white">
                    <template v-slot:activator="{ on }">
                      <img :src="logoImageURL" v-on="on" width="40%" v-if="logoImageURL" />
                      <img :src="path + restaurantList.logoImage" v-on="on" width="40%"
                        v-else-if="restaurantList.logoImage" />
                    </template>
                    <img :src="logoImageURL" width="100%" v-if="logoImageURL" />
                    <img :src="path + restaurantList.logoImage" width="100%" v-else-if="restaurantList.logoImage" />
                  </v-tooltip>
                </v-flex>
                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <div v-if="logoImageName" class="subheading font-weight-light text-truncate">
                    {{ logoImageName }}
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>

        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pb-2 pt-3">
          <v-spacer></v-spacer>
          <v-btn color="error" @click="openModal = false">Close</v-btn>
          <v-btn color="primary" :disabled="!valid || loading" @click.prevent="onSubmit">Update</v-btn>
        </v-card-actions>

      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required, integer } from 'vuelidate/lib/validators';
import email from 'vuelidate/src/validators/email';

export default {
  props: {
    value: Boolean,
    id: Number
  },
  data() {
    return {
      loading: false,
      valid: true,
      path: process.env.VUE_APP_RESTAURANT_IMAGES,
      previewImageURL: '',
      previewImageName: '',
      previewImageTooBig: false,
      bgImageURL: '',
      bgImageName: '',
      bgImageTooBig: false,
      logoImageURL: '',
      logoImageName: '',
      logoImageTooBig: false,
      restaurant: {},
      restaurantList: [
        { id: '' },
        { name: '' },
        { city: '' },
        { userId: '' },
        { previewDescription: '' },
        { previewImage: '' },
        { backgroundImage: '' },
        { logoImage: '' },
        { contactText: '' },
        { phone1: '' },
        { phone2: '' },
        { mail1: '' },
        { mail2: '' },
        { aboutText: '' }
      ],

      nameRules: [
        v => !!v || 'Name is required!',
      ],
      userIdRules: [
        v => !!v || 'Administrator is required!',
      ],
      cityRules: [
        v => !!v || 'City is required!',
      ],
      previewDescriptionRules: [
        v => !!v || 'Preview description is required!',
      ],
      aboutTextRules: [
        v => !!v || 'Description is required!',
      ],
      contactTextRules: [
        v => !!v || 'Contact description is required!',
      ],
      phone1Rules: [
        v => !!v || 'Phone number is required!',
        v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'Phone number must only contain numbers!'
      ],
      phone2Rules: [
        v => !!v || 'Phone number is required!',
        v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'Phone number must only contain numbers!'
      ],
      mail1Rules: [
        v => !!v || 'E-mail is required!',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid!'
      ],
      mail2Rules: [
        v => !!v || 'E-mail is required!',
        v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid!'
      ],

      usersList: [
        { id: 'null' },
        { name: null }
      ],
      previewImageError: false,
      bgImageError: false,
      logoImageError: false,
    };
  },
  beforeMount() {
    this.restaurant = this.$store.getters.getRestaurantById(this.id);
    this.restaurantList.id = this.restaurant.id;
    this.restaurantList.name = this.restaurant.name;
    this.restaurantList.city = this.restaurant.city;
    this.restaurantList.userId = this.restaurant.userId;
    this.restaurantList.previewDescription = this.restaurant.previewDescription;
    this.restaurantList.previewImage = this.restaurant.previewImage;
    this.restaurantList.backgroundImage = this.restaurant.backgroundImage;
    this.restaurantList.logoImage = this.restaurant.logoImage;
    this.restaurantList.contactText = this.restaurant.contactText;
    this.restaurantList.phone1 = this.restaurant.phone1;
    this.restaurantList.phone2 = this.restaurant.phone2;
    this.restaurantList.mail1 = this.restaurant.mail1;
    this.restaurantList.mail2 = this.restaurant.mail2;
    this.restaurantList.aboutText = this.restaurant.aboutText;
  },
  watch: {
    openModal() {
      this.$refs.form.resetValidation();
      this.$refs.previewImage.value = '';
      this.$refs.bgImage.value = '';
      this.$refs.logoImage.value = '';

      this.restaurant.name = '';
      this.restaurant.userId = '';
      this.restaurant.city = '';
      this.restaurant.previewDescription = '';
      this.restaurant.previewImage = '';
      this.restaurant.backgroundImage = '';
      this.restaurant.logoImage = '';
      this.restaurant.contactText = '';
      this.restaurant.phone1 = '';
      this.restaurant.phone2 = '';
      this.restaurant.mail1 = '';
      this.restaurant.mail2 = '';
      this.restaurant.aboutText = '';

      this.previewImageURL = '';
      this.bgImageURL = '';
      this.logoImageURL = '';

      this.previewImageName = '';
      this.bgImageName = '';
      this.logoImageName = '';

      this.previewImageTooBig = false;
      this.bgImageTooBig = false;
      this.logoImageTooBig = false;

      this.previewImageError = false;
      this.bgImageError = false;
      this.logoImageError = false;
    }
  },
  computed: {
    openModal: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
      }
    },
    users() {
      return this.usersList = this.$store.getters.getStaffUsers;
    },
  },

  methods: {
    pickPreviewImage() {
      this.$refs.previewImage.click();
    },

    pickBgImage() {
      this.$refs.bgImage.click();
    },

    pickLogoImage() {
      this.$refs.logoImage.click();
    },

    onPreviewImageChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.previewImageTooBig = true;
        this.restaurantList.previewImage = null;
        this.previewImageName = '';
        this.previewImageURL = '';
        return;
      }
      if (file !== undefined) {
        this.previewImageName = file.name;
      } else {
        return;
      }
      this.previewImageError = false;
      this.previewImageTooBig = false;
      this.restaurantList.previewImage = file;
      this.previewImageURL = URL.createObjectURL(file);
    },

    onBgImageChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.bgImageTooBig = true;
        this.restaurantList.backgroundImage = null;
        this.bgImageName = '';
        this.bgImageURL = '';
        return;
      }
      if (file !== undefined) {
        this.bgImageName = file.name;
      } else {
        return;
      }
      this.bgImageError = false;
      this.bgImageTooBig = false;
      this.restaurantList.backgroundImage = file;
      this.bgImageURL = URL.createObjectURL(file);
    },

    onLogoImageChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.logoImageTooBig = true;
        this.restaurantList.logoImage = null;
        this.logoImageName = '';
        this.logoImageURL = '';
        return;
      }
      if (file !== undefined) {
        this.logoImageName = file.name;
      } else {
        return;
      }
      this.logoImageError = false;
      this.logoImageTooBig = false;
      this.restaurantList.logoImage = file;
      this.logoImageURL = URL.createObjectURL(file);
    },

    handleScroll() {
      let scrolled = window.pageYOffset;
      let background = document.querySelector(".wrapper");
      background.style.backgroundPosition = '0%' + (-(scrolled * 0.2) + 'px');
    },

    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }
      // Check if the form is already submitting to prevent multiple clicks
      if (this.loading) return;

      if (this.restaurantList.name === this.restaurant.name &&
        this.restaurantList.userId === this.restaurant.userId &&
        this.restaurantList.city === this.restaurant.city &&
        this.restaurantList.previewDescription === this.restaurant.previewDescription &&
        this.restaurantList.previewImage === this.restaurant.previewImage &&
        this.restaurantList.backgroundImage === this.restaurant.backgroundImage &&
        this.restaurantList.logoImage === this.restaurant.logoImage &&
        this.restaurantList.contactText === this.restaurant.contactText &&
        this.restaurantList.phone1 === this.restaurant.phone1 &&
        this.restaurantList.phone2 === this.restaurant.phone2 &&
        this.restaurantList.mail1 === this.restaurant.mail1 &&
        this.restaurantList.mail2 === this.restaurant.mail2 &&
        this.restaurantList.aboutText === this.restaurant.aboutText) {
        this.openModal = false;
        return
      }

      // Set loading to true when request begins
      this.loading = true;

      const formData = new FormData();

      formData.append('id', this.restaurantList.id);
      if (this.restaurantList.name !== this.restaurant.name)
        formData.append('name', this.restaurantList.name);
      if (this.restaurantList.userId !== this.restaurant.userId)
        formData.append('userId', this.restaurantList.userId);
      if (this.restaurantList.city !== this.restaurant.city)
        formData.append('city', this.restaurantList.city);
      if (this.restaurantList.previewDescription !== this.restaurant.previewDescription)
        formData.append('previewDescription', this.restaurantList.previewDescription);
      if (this.restaurantList.previewImage !== this.restaurant.previewImage)
        formData.append('previewImage', this.restaurantList.previewImage);
      if (this.restaurantList.backgroundImage !== this.restaurant.backgroundImage)
        formData.append('backgroundImage', this.restaurantList.backgroundImage);
      if (this.restaurantList.logoImage !== this.restaurant.logoImage)
        formData.append('logoImage', this.restaurantList.logoImage);
      if (this.restaurantList.contactText !== this.restaurant.contactText)
        formData.append('contactText', this.restaurantList.contactText);
      if (this.restaurantList.phone1 !== this.restaurant.phone1)
        formData.append('phone1', this.restaurantList.phone1);
      if (this.restaurantList.phone2 !== this.restaurant.phone2)
        formData.append('phone2', this.restaurantList.phone2);
      if (this.restaurantList.mail1 !== this.restaurant.mail1)
        formData.append('mail1', this.restaurantList.mail1);
      if (this.restaurantList.mail2 !== this.restaurant.mail2)
        formData.append('mail2', this.restaurantList.mail2);
      if (this.restaurantList.aboutText !== this.restaurant.aboutText)
        formData.append('aboutText', this.restaurantList.aboutText);
      //formData.append('_method', 'PATCH');

      this.$store.dispatch('editRestaurant', { data: formData, id: this.restaurantList.id }).then((res) => {
        console.log(res);
        if (res.responseType === 'success') {
          this.$parent.addUpdateNotification();
          this.openModal = false;
        } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
          this.$parent.nameErrorNotification();
        }
      }).finally(() => {
        this.loading = false; // Reset loading after response
      });
    }
  },
};
</script>

<style scoped>
.wrapper {
  background-image: url('../../assets/editRestaurantBg.jpg');
  background-attachment: fixed;
  background-size: cover;
}

.titleText {
  font-size: 55px;
  color: white;
  text-shadow: 3px 3px black;
}
</style>