<template>
  <v-layout class="pa-0 ma-0" max-width="25%">
    <v-dialog
        v-model="openModal"
        max-width="25%"
        full-height
        transition="scale-transition"
    >
      <v-card>
        <v-card-title class="ma-0 pa-0 pb-4">
          <v-spacer></v-spacer>
          <v-btn flat fab small @click="openModal = false">
            <v-icon size="25px">close</v-icon>
          </v-btn>
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <div class="title">
              <v-icon>fastfood</v-icon>
              Update menu
            </div>
          </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text class="pt-0 pb-0">
            <v-container class="pt-3 pl-3 pr-3 pb-1">
              <v-layout column>
                <v-flex xs12>
                  <v-text-field
                      prepend-icon="create"
                      v-model="menuList.name"
                      label="Name"
                      :rules="nameRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea
                      prepend-icon="description"
                      v-model="menuList.description"
                      label="Description"
                      rows="1"
                      auto-grow
                      :rules="descriptionRules"
                  ></v-textarea>
                </v-flex>
                <v-flex>
                  <v-text-field
                      prepend-icon="attach_money"
                      v-model="menuList.price"
                      type="number"
                      label="Price"
                      min="0"
                      :rules="priceRules"
                  ></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select
                      prepend-icon="restaurant_menu"
                      :items=types
                      label="Food type"
                      v-model="menuList.type"
                      :rules="typeRules"
                  ></v-select>
                </v-flex>
                <input
                    type="file"
                    style="display:none"
                    ref="image"
                    accept="image/*"
                    @change="onFileChanged"
                >
                <v-flex xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-0">
                  <v-btn @click="pickFile" color="primary" class="ma-0">
                    Upload image
                    <v-icon right dark>cloud_upload</v-icon>
                  </v-btn>
                  <div v-if="imageTooBig" style="color:red;"
                       class="subheading font-weight-light mt-3">
                    Image is too big, resolution must be 1920x1080 or smaller.
                  </div>
                </v-flex>
                <v-flex xs12
                        class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-tooltip top max-width="500px" color="white">
                    <template v-slot:activator="{ on }">
                      <img :src="imageUrl" v-on="on" width="35%" v-if="imageUrl"/>
                      <img :src="path+menuList.image" v-on="on" width="35%"
                           v-else-if="menuList.image"/>
                    </template>
                    <img :src="imageUrl" width="100%" v-if="imageUrl"/>
                    <img :src="path+menuList.image" width="100%" v-else-if="menuList.image"/>
                  </v-tooltip>
                </v-flex>
                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <div v-if="imageName" class="subheading font-weight-light">{{ imageName }}</div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions class="pb-3">
              <v-spacer></v-spacer>
              <v-btn color="error" @click.stop="openModal=false">Close</v-btn>
              <v-btn color="primary" :disabled="!valid" @click.prevent="onSubmit">Update</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  props: {
    value: Boolean,
    id: Number
  },
  data() {
    return {
      valid: true,
      imageUrl: '',
      path: process.env.VUE_APP_MENU_IMAGES,
      imageName: '',
      imageTooBig: false,
      types: ['Starter', 'Main Course', 'Fastfood', 'Pizza', 'Dessert', 'Drinks'],
      menu: {},
      menuList: [
        {id: ''},
        {menu: ''},
        {description: ''},
        {price: ''},
        {type: ''},
        {image: ''},
      ],
      nameRules: [
        v => !!v || 'Name is required!',
      ],
      descriptionRules: [
        v => !!v || 'Description is required!',
      ],
      priceRules: [
        v => !!v || 'Price is required!',
        v => /^(\d{0,6})(\.\d{0,2})?$/.test(v) || 'Price can have a maximum of 6 digits and 2 decimals, ex: 123456.12!'
      ],
      typeRules: [
        v => !!v || 'Food type is required!',
      ],
      showNotification: false
    };
  },
  beforeMount() {
    this.menu = this.$store.getters.getMenuById(this.id);
    this.menuList.id = this.menu.id;
    this.menuList.name = this.menu.name;
    this.menuList.description = this.menu.description;
    this.menuList.price = this.menu.price;
    this.menuList.type = this.menu.type;
    this.menuList.image = this.menu.image;
    this.menuList.store_id = this.menu.store_id;
  },
  watch: {
    openModal() {
      this.$refs.image.value = '';
      this.menu.name = '';
      this.menu.description = '';
      this.menu.price = '';
      this.menu.type = null;
      this.menu.image = null;
      this.imageUrl = '';
      this.imageName = '';
      this.imageTooBig = false;
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
  },
  methods: {
    pickFile() {
      this.$refs.image.click();
    },
    onFileChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.imageTooBig = true;
        this.menuList.image = null;
        this.imageName = '';
        this.imageUrl = '';
        return;
      }
      if (file !== undefined) {
        this.imageName = file.name;
      } else {
        return;
      }
      this.imageTooBig = false;
      this.menuList.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },

    onSubmit() {
      if (!this.$refs.form.validate()) {
        return;
      }

      const formData = new FormData();
      let data = {
        id: this.menuList.id,
        name: this.menuList.name,
        description: this.menuList.description,
        price: this.menuList.price,
        type: this.menuList.type,
        image: this.menuList.image
      };

      if (this.menuList.name === this.menu.name &&
          this.menuList.description === this.menu.description &&
          this.menuList.price === this.menu.price &&
          this.menuList.type === this.menu.type &&
          this.menuList.image === this.menu.image) {
        this.openModal = false;
        return;
      }

      formData.append('id', data.id);
      if (this.menuList.name !== this.menu.name && this.menuList.name !== '')
        formData.append('name', data.name);
      if (this.menuList.description !== this.menu.description && this.menuList.description !== '')
        formData.append('description', data.description);
      if (this.menuList.price !== this.menu.price)
        formData.append('price', data.price);
      if (this.menuList.image !== this.menu.image)
        formData.append('image', data.image);
      if (this.menuList.type !== this.menu.type)
        formData.append('type', data.type);
      formData.append('_method', 'patch');

      this.$store.dispatch('editMenu', {data: formData, id: data.id}).then((res) => {
        if (res.responseType === 'success') {
          this.$parent.addUpdateNotification();
          this.openModal = false;
        } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
          this.$parent.nameErrorNotification();
        }
      });
    }
  }
};
</script>

<style scoped>

</style>