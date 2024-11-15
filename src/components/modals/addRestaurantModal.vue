<template>
  <v-layout class="mt-2">
    <notification text="Restaurant was created successfully!" color="rgb(76, 175, 80, 0.9)"
      :showNotification="addNotification" :top=true :right=true></notification>
    <notification text="A restaurant with this name already exists!" color="rgb(255, 82, 82, 0.9)"
      :showNotification="nameNotification" :top=true></notification>
    <v-btn color="primary" dark @click.stop="openModal = true">
      <v-icon class="pr-2">library_add</v-icon>
      Add restaurant

    </v-btn>

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
                Add restaurant
              </div>
            </v-flex>
          </v-card-title>
          <v-divider></v-divider>
          <v-form ref="form">
            <v-container class="pl-3 pr-3 pb-1">
              <v-layout column>
                <v-flex xs12>
                  <v-text-field prepend-icon="create" v-model="restaurant.name" label="Restaurant name"
                    :error-messages="nameErrors" @input="$v.restaurant.name.$touch()"
                    @blur="$v.restaurant.name.$touch()"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select prepend-icon="person" :items=users item-text="name" item-value="id"
                    label="Restaurant administrator" v-model="restaurant.userId" :error-messages="staffErrors"
                    @change="$v.restaurant.userId.$touch()" @blur="$v.restaurant.userId.$touch()">
                  </v-select>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="location_city" v-model="restaurant.city" label="City"
                    :error-messages="cityErrors" @input="$v.restaurant.city.$touch()"
                    @blur="$v.restaurant.city.$touch()"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurant.previewDescription"
                    label="Preview description" rows="1" auto-grow :error-messages="previewDescriptionErrors"
                    @input="$v.restaurant.previewDescription.$touch()"
                    @blur="$v.restaurant.previewDescription.$touch()"></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurant.aboutText" label="Description" rows="1"
                    auto-grow :error-messages="aboutTextErrors" @input="$v.restaurant.aboutText.$touch()"
                    @blur="$v.restaurant.aboutText.$touch()"></v-textarea>
                </v-flex>

                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="restaurant.contactText" label="Contact description"
                    rows="1" auto-grow :error-messages="contactTextErrors" @input="$v.restaurant.contactText.$touch()"
                    @blur="$v.restaurant.contactText.$touch()"></v-textarea>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="phone" v-model="restaurant.phone1" :error-messages="phone1Errors"
                    @input="$v.restaurant.phone1.$touch()" @blur="$v.restaurant.phone1.$touch()"
                    label="Phone 1"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="phone" v-model="restaurant.phone2" :error-messages="phone2Errors"
                    @input="$v.restaurant.phone2.$touch()" @blur="$v.restaurant.phone2.$touch()"
                    label="Phone 2"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="mail" v-model="restaurant.mail1" label="E-mail 1"
                    :error-messages="mailErrors1" @input="$v.restaurant.mail1.$touch()"
                    @blur="$v.restaurant.mail1.$touch()"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-text-field prepend-icon="mail" v-model="restaurant.mail2" label="E-mail 2"
                    :error-messages="mailErrors2" @input="$v.restaurant.mail2.$touch()"
                    @blur="$v.restaurant.mail2.$touch()"></v-text-field>
                </v-flex>

                <v-flex xs12 class="mt-3">
                  <v-icon class="pr-2">photo</v-icon>
                  <span class="subheading mr-3">Preview Image</span>
                  <v-btn @click="pickPreviewImage" color="primary" class="ma-0">
                    <v-icon left dark>add_photo_alternate</v-icon>
                    Choose Image
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
                      <img :src="path + restaurant.previewImage" v-on="on" width="60%"
                        v-else-if="restaurant.previewImage" />
                    </template>
                    <img :src="previewImageURL" width="100%" v-if="previewImageURL" />
                    <img :src="path + restaurant.previewImage" width="100%" v-else-if="restaurant.previewImage" />
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
                      <img :src="path + restaurant.backgroundImage" v-on="on" width="90%"
                        v-else-if="restaurant.backgroundImage" />
                    </template>
                    <img :src="bgImageURL" width="100%" v-if="bgImageURL" />
                    <img :src="path + restaurant.backgroundImage" width="100%" v-else-if="restaurant.backgroundImage" />
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
                      <img :src="path + restaurant.logoImage" v-on="on" width="40%" v-else-if="restaurant.logoImage" />
                    </template>
                    <img :src="logoImageURL" width="100%" v-if="logoImageURL" />
                    <img :src="path + restaurant.logoImage" width="100%" v-else-if="restaurant.logoImage" />
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
          <v-btn color="primary" :disabled="loading" @click.prevent="onSubmit">Add</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { required, integer } from 'vuelidate/lib/validators';
import email from 'vuelidate/src/validators/email';

export default {
  data() {
    return {
      loading: false,
      openModal: false,
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
      restaurant: {
        name: '',
        userId: '',
        city: '',
        previewDescription: '',
        previewImage: '',
        backgroundImage: '',
        logoImage: '',
        contactText: '',
        phone1: '',
        phone2: '',
        mail1: '',
        mail2: '',
        aboutText: ''
      },

      usersList: [
        { id: 'null' },
        { name: null }
      ],

      addNotification: false,
      nameNotification: false,

      previewImageError: false,
      bgImageError: false,
      logoImageError: false,
    };
  },

  validations: {
    restaurant: {
      name: { required },
      userId: { required },
      city: { required },
      previewDescription: { required },
      aboutText: { required },
      contactText: { required },
      phone1: { required, integer },
      phone2: { required, integer },
      mail1: { required, email },
      mail2: { required, email },
    }
  },
  watch: {
    openModal() {
      this.$v.$reset();
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
    users() {
      return this.usersList = this.$store.getters.getStaffUsers;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.restaurant.name.$dirty) return errors;
      !this.$v.restaurant.name.required && errors.push('Name is required!');
      return errors;
    },
    staffErrors() {
      const errors = [];
      if (!this.$v.restaurant.userId.$dirty) return errors;
      !this.$v.restaurant.userId.required && errors.push('Administrator is required!');
      return errors;
    },
    cityErrors() {
      const errors = [];
      if (!this.$v.restaurant.city.$dirty) return errors;
      !this.$v.restaurant.city.required && errors.push('City is required!');
      return errors;
    },
    previewDescriptionErrors() {
      const errors = [];
      if (!this.$v.restaurant.previewDescription.$dirty) return errors;
      !this.$v.restaurant.previewDescription.required && errors.push('Preview description is required!');
      return errors;
    },
    aboutTextErrors() {
      const errors = [];
      if (!this.$v.restaurant.aboutText.$dirty) return errors;
      !this.$v.restaurant.aboutText.required && errors.push('Description is required!');
      return errors;
    },
    contactTextErrors() {
      const errors = [];
      if (!this.$v.restaurant.contactText.$dirty) return errors;
      !this.$v.restaurant.contactText.required && errors.push('Contact description is required!');
      return errors;
    },
    phone1Errors() {
      const errors = [];
      if (!this.$v.restaurant.phone1.$dirty) return errors;
      !this.$v.restaurant.phone1.integer && errors.push('Phone number must only contain numbers!');
      !this.$v.restaurant.phone1.required && errors.push('Phone number is required!');
      return errors;
    },
    phone2Errors() {
      const errors = [];
      if (!this.$v.restaurant.phone2.$dirty) return errors;
      !this.$v.restaurant.phone2.integer && errors.push('Phone number must only contain numbers!');
      !this.$v.restaurant.phone2.required && errors.push('Phone number is required!');
      return errors;
    },
    mailErrors1() {
      const errors = [];
      if (!this.$v.restaurant.mail1.$dirty) return errors;
      !this.$v.restaurant.mail1.email && errors.push('E-mail must be valid!');
      !this.$v.restaurant.mail1.required && errors.push('E-mail is required!');
      return errors;
    },

    mailErrors2() {
      const errors = [];
      if (!this.$v.restaurant.mail2.$dirty) return errors;
      !this.$v.restaurant.mail2.email && errors.push('E-mail must be valid!');
      !this.$v.restaurant.mail2.required && errors.push('E-mail is required!');
      return errors;
    },

  },

  methods: {
    addedNotification() {
      this.addNotification = false;
      setTimeout(() => {
        this.addNotification = true;
      }, 200);
    },

    nameErrorNotification() {
      this.nameNotification = false;
      setTimeout(() => {
        this.nameNotification = true;
      }, 100);
    },

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
        this.restaurant.previewImage = null;
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
      this.restaurant.previewImage = file;
      this.previewImageURL = URL.createObjectURL(file);
    },

    onBgImageChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.bgImageTooBig = true;
        this.restaurant.backgroundImage = null;
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
      this.restaurant.backgroundImage = file;
      this.bgImageURL = URL.createObjectURL(file);
    },

    onLogoImageChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.logoImageTooBig = true;
        this.restaurant.logoImage = null;
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
      this.restaurant.logoImage = file;
      this.logoImageURL = URL.createObjectURL(file);
    },

    onSubmit() {
      // Check if the form is already submitting to prevent multiple clicks
      if (this.loading) return;

      if (!this.restaurant.previewImage) {
        this.previewImageError = true;
      }
      if (!this.restaurant.backgroundImage) {
        this.bgImageError = true;
      }
      if (!this.restaurant.logoImage) {
        this.logoImageError = true;
      }

      this.$v.$touch();
      if (this.$v.$pending || this.$v.$error) return;

      // Set loading to true when request begins
      this.loading = true;

      const formData = new FormData();
      const restaurantData = this.restaurant;

      if (!this.restaurant.backgroundImage || !this.restaurant.previewImage) {
        this.loading = false;
        return;
      }

      formData.append('name', restaurantData.name);
      formData.append('city', restaurantData.city);
      formData.append('userId', restaurantData.userId);
      formData.append('previewDescription', restaurantData.previewDescription);
      formData.append('previewImage', restaurantData.previewImage);
      formData.append('backgroundImage', restaurantData.backgroundImage);
      formData.append('logoImage', restaurantData.logoImage);
      formData.append('contactText', restaurantData.contactText);
      formData.append('phone1', restaurantData.phone1);
      formData.append('phone2', restaurantData.phone2);
      formData.append('mail1', restaurantData.mail1);
      formData.append('mail2', restaurantData.mail2);
      formData.append('aboutText', restaurantData.aboutText);

      this.$store.dispatch('addRestaurant', formData).then((res) => {
        if (res.responseType === 'success') {
          this.openModal = false;
          this.addedNotification();
        } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
          this.nameErrorNotification();
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