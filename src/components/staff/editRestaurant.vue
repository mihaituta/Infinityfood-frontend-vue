<template>
    <div class="wrapper">
        <v-container>

            <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                <div class="titleText">
                    Update Restaurant
                </div>
            </v-flex>

            <v-layout justify-center>
                <notification text="Restaurant was updated successfully!" color="rgb(76, 175, 80, 0.9)"
                    :showNotification="restaurantUpdatedNotif" :top=true :right=true></notification>
                <notification text="A restaurant with this name already exists!" color="rgb(255, 82, 82, 0.9)"
                    :showNotification="nameNotification" :top=true></notification>

                <v-card width="550px" class="mb-5 mt-4" dark>

                    <v-form ref="form">
                        <v-card-text class="pt-0 pb-0">
                            <v-container class="pl-3 pr-3 pb-2">
                                <v-layout column>
                                    <v-flex xs12>
                                        <v-text-field prepend-icon="create" v-model="restaurant.name"
                                            label="Restaurant name" :error-messages="nameErrors"
                                            @input="$v.restaurant.name.$touch()"
                                            @blur="$v.restaurant.name.$touch()"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field prepend-icon="location_city" v-model="restaurant.city"
                                            label="City" :error-messages="cityErrors"
                                            @input="$v.restaurant.city.$touch()"
                                            @blur="$v.restaurant.city.$touch()"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-textarea prepend-icon="description" v-model="restaurant.previewDescription"
                                            label="Preview description" rows="1" auto-grow
                                            :error-messages="previewDescriptionErrors"
                                            @input="$v.restaurant.previewDescription.$touch()"
                                            @blur="$v.restaurant.previewDescription.$touch()"></v-textarea>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-textarea prepend-icon="description" v-model="restaurant.aboutText"
                                            label="Description" rows="1" auto-grow :error-messages="aboutTextErrors"
                                            @input="$v.restaurant.aboutText.$touch()"
                                            @blur="$v.restaurant.aboutText.$touch()"></v-textarea>
                                    </v-flex>

                                    <v-flex xs12>
                                        <v-textarea prepend-icon="description" v-model="restaurant.contactText"
                                            label="Contact description" rows="1" auto-grow
                                            :error-messages="contactTextErrors"
                                            @input="$v.restaurant.contactText.$touch()"
                                            @blur="$v.restaurant.contactText.$touch()"></v-textarea>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field prepend-icon="phone" v-model="restaurant.phone1"
                                            :rules="phone1Rules" label="Phone 1"></v-text-field>
                                    </v-flex>
                                    <v-flex xs12>
                                        <v-text-field prepend-icon="phone" v-model="restaurant.phone2" label="Phone 2"
                                            :rules="phone2Rules"></v-text-field>
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
                                        <v-icon class="pr-2" dark>photo</v-icon>
                                        <span class="subheading mr-3">Preview Image</span>
                                        <v-btn @click="pickPreviewImage" color="primary" class="ma-0">
                                            <v-icon left dark>add_photo_alternate</v-icon>
                                            Choose image
                                        </v-btn>
                                        <div v-if="previewImageTooBig" style="color:red;"
                                            class="subheading font-weight-light mt-3">
                                            Image is too big, resolution must be 1920x1080 or smaller.
                                        </div>
                                    </v-flex>
                                    <input type="file" style="display:none" ref="previewImage" accept="image/*"
                                        @change="onPreviewImageChanged">
                                    <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-3">
                                        <v-tooltip top max-width="800px" color="white">
                                            <template v-slot:activator="{ on }">
                                                <img :src="previewImageURL" v-on="on" width="80%"
                                                    v-if="previewImageURL" />
                                                <img :src="path + restaurant.previewImage" v-on="on" width="80%"
                                                    v-else-if="restaurant.previewImage" />
                                            </template>
                                            <img :src="previewImageURL" width="100%" v-if="previewImageURL" />
                                            <img :src="path + restaurant.previewImage" width="100%"
                                                v-else-if="restaurant.previewImage" />
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                        <div v-if="previewImageName" class="subheading font-weight-light text-truncate">
                                            {{ previewImageName }}
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 class="mt-3">
                                        <v-icon class="pr-2" dark>photo</v-icon>
                                        <span class="subheading mr-3">Background Image</span>
                                        <v-btn @click="pickBgImage" color="primary" class="ma-0">
                                            <v-icon left dark>add_photo_alternate</v-icon>
                                            Choose Image
                                        </v-btn>
                                        <div v-if="bgImageTooBig" style="color:red;"
                                            class="subheading font-weight-light mt-3">
                                            Image is too big, resolution must be 1920x1080 or smaller.
                                        </div>
                                    </v-flex>
                                    <input type="file" style="display:none" ref="bgImage" accept="image/*"
                                        @change="onBgImageChanged">
                                    <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-3">
                                        <v-tooltip top max-width="800px" color="white">
                                            <template v-slot:activator="{ on }">
                                                <img :src="bgImageURL" v-on="on" width="80%" v-if="bgImageURL" />
                                                <img :src="path + restaurant.backgroundImage" v-on="on" width="80%"
                                                    v-else-if="restaurant.backgroundImage" />
                                            </template>
                                            <img :src="bgImageURL" width="100%" v-if="bgImageURL" />
                                            <img :src="path + restaurant.backgroundImage" width="100%"
                                                v-else-if="restaurant.backgroundImage" />
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                        <div v-if="bgImageName" class="subheading font-weight-light text-truncate">
                                            {{ bgImageName }}
                                        </div>
                                    </v-flex>

                                    <v-flex xs12 class="mt-3">
                                        <v-icon class="pr-2" dark>photo</v-icon>
                                        <span class="subheading mr-3">Restaurant logo</span>
                                        <v-btn @click="pickLogoImage" color="primary" class="ma-0">
                                            <v-icon left dark>add_photo_alternate</v-icon>
                                            Choose Image
                                        </v-btn>
                                        <div v-if="logoImageTooBig" style="color:red;"
                                            class="subheading font-weight-light mt-3">
                                            Image is too big, resolution must be 1920x1080 or smaller.
                                        </div>
                                    </v-flex>
                                    <input type="file" style="display:none" ref="logoImage" accept="image/*"
                                        @change="onLogoImageChanged">
                                    <v-flex xs12
                                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-3">
                                        <v-tooltip top max-width="600px" color="white">
                                            <template v-slot:activator="{ on }">
                                                <img :src="logoImageURL" v-on="on" width="40%" v-if="logoImageURL" />
                                                <img :src="path + restaurant.logoImage" v-on="on" width="40%"
                                                    v-else-if="restaurant.logoImage" />
                                            </template>
                                            <img :src="logoImageURL" width="100%" v-if="logoImageURL" />
                                            <img :src="path + restaurant.logoImage" width="100%"
                                                v-else-if="restaurant.logoImage" />
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                                        <div v-if="logoImageName" class="subheading font-weight-light text-truncate">
                                            {{ logoImageName }}
                                        </div>
                                    </v-flex>

                                </v-layout>
                            </v-container>
                            <v-card-actions class="pb-3">
                                <v-spacer></v-spacer>
                                <v-btn :disabled="loading" large class="editBtn pr-3 pl-3" color="primary"
                                    @click.prevent="onSubmit">Update</v-btn>
                            </v-card-actions>
                        </v-card-text>
                    </v-form>
                </v-card>

            </v-layout>
        </v-container>
    </div>
</template>

<script>
import { required, integer } from 'vuelidate/lib/validators';
import email from 'vuelidate/src/validators/email';


export default {
    data() {
        return {
            loading: false,
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
            restaurantList: [
                { name: '' },
                { city: '' },
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
            phone1Rules: [
                v => !!v || 'Phone number is required!',
                v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'Phone number must only contain numbers!'
            ],
            phone2Rules: [
                v => !!v || 'Phone number is required!',
                v => /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/.test(v) || 'Phone number must only contain numbers!'
            ],
            restaurantUpdatedNotif: false,
            nameNotification: false,
        };
    },

    validations: {
        restaurant: {
            name: { required },
            city: { required },
            previewDescription: { required },
            aboutText: { required },
            contactText: { required },
            mail1: { required, email },
            mail2: { required, email },
        }
    },

    computed: {
        restaurant() {
            return this.$store.getters.restaurant;
        },
        nameErrors() {
            const errors = [];
            if (!this.$v.restaurant.name.$dirty) return errors;
            !this.$v.restaurant.name.required && errors.push('Name is required!');
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
        addUpdateNotification() {
            this.restaurantUpdatedNotif = false;
            setTimeout(() => {
                this.restaurantUpdatedNotif = true;
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
            this.logoImageTooBig = false;
            this.restaurant.logoImage = file;
            this.logoImageURL = URL.createObjectURL(file);
        },

        handleScroll() {
            let scrolled = window.pageYOffset;
            let background = document.querySelector(".wrapper");
            background.style.backgroundPosition = '0%' + (-(scrolled * 0.2) + 'px');
        },

        mapdata() {
            this.restaurantList.name = this.restaurant.name;
            this.restaurantList.city = this.restaurant.city;
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

        onSubmit() {
            this.$v.$touch();
            if (this.$v.$pending || this.$v.$error) return;

            if (!this.$refs.form.validate()) return;

            // Check if the form is already submitting to prevent multiple clicks
            if (this.loading) return;

            if (this.restaurantList.name === this.restaurant.name &&
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
                return
            }
            // Set loading to true when request begins
            this.loading = true;

            const formData = new FormData();

            if (this.restaurantList.name !== this.restaurant.name)
                formData.append('name', this.restaurant.name);
            if (this.restaurantList.city !== this.restaurant.city)
                formData.append('city', this.restaurant.city);
            if (this.restaurantList.previewDescription !== this.restaurant.previewDescription)
                formData.append('previewDescription', this.restaurant.previewDescription);
            if (this.restaurantList.previewImage !== this.restaurant.previewImage)
                formData.append('previewImage', this.restaurant.previewImage);
            if (this.restaurantList.backgroundImage !== this.restaurant.backgroundImage)
                formData.append('backgroundImage', this.restaurant.backgroundImage);
            if (this.restaurantList.logoImage !== this.restaurant.logoImage)
                formData.append('logoImage', this.restaurant.logoImage);
            if (this.restaurantList.contactText !== this.restaurant.contactText)
                formData.append('contactText', this.restaurant.contactText);
            if (this.restaurantList.phone1 !== this.restaurant.phone1)
                formData.append('phone1', this.restaurant.phone1);
            if (this.restaurantList.phone2 !== this.restaurant.phone2)
                formData.append('phone2', this.restaurant.phone2);
            if (this.restaurantList.mail1 !== this.restaurant.mail1)
                formData.append('mail1', this.restaurant.mail1);
            if (this.restaurantList.mail2 !== this.restaurant.mail2)
                formData.append('mail2', this.restaurant.mail2);
            if (this.restaurantList.aboutText !== this.restaurant.aboutText)
                formData.append('aboutText', this.restaurant.aboutText);
            //formData.append('_method', 'PATCH');

            this.$store.dispatch('editRestaurantStaff', formData).then((res) => {
                if (res.responseType === 'success') {
                    this.addUpdateNotification();
                    this.mapdata();
                } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
                    this.nameErrorNotification();
                }
            }).finally(() => {
                this.loading = false; // Reset loading after response
            });
        }
    },
    beforeCreate() {
        this.$store.dispatch('getRestaurantStaff').then((res) => {
            this.mapdata();
            this.$v.$reset();
        });
    },
    created() {
        window.addEventListener('scroll', this.handleScroll);
    },

    destroyed() {
        window.removeEventListener('scroll', this.handleScroll);
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
    font-size: 60px;
    color: white;
    text-shadow: 6px 6px black;

}

.editBtn {
    font-size: 19px;
}
</style>