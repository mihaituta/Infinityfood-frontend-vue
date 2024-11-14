<template>
  <v-layout>
    <notification text="Menu was added successfully!" color="rgb(76, 175, 80, 0.9)" :showNotification="addNotification"
      :top=true :right=true></notification>
    <notification text="A menu with this name already exists!" color="rgb(255, 82, 82, 0.9)"
      :showNotification="nameNotification" :top=true></notification>
    <v-btn color="primary" dark @click.stop="openModal = true">
      <v-icon class="pr-2">library_add</v-icon>
      Add menu
    </v-btn>

    <v-dialog v-model="openModal" max-width="25%" transition="slide-y-transition">
      <v-card>
        <v-card-title class="pa-0 mb-4">
          <v-spacer></v-spacer>
          <v-btn flat fab small @click="openModal = false">
            <v-icon size="25px">close</v-icon>
          </v-btn>
          <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
            <div class="title">
              <v-icon>fastfood</v-icon>
              Add menu
            </div>
          </v-flex>
        </v-card-title>
        <v-divider></v-divider>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-text class="pt-0 pb-0">
            <v-container class="pl-3 pr-3 pb-2 pt-1">
              <v-layout column>
                <v-flex xs12>
                  <v-text-field prepend-icon="create" v-model="menu.name" label="Name"
                    :rules="nameRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-textarea prepend-icon="description" v-model="menu.description" label="Description"
                    :rules="descriptionRules" rows="1" auto-grow></v-textarea>
                </v-flex>
                <v-flex>
                  <v-text-field prepend-icon="attach_money" v-model="menu.price" type="number" label="Price" min="0"
                    :rules="priceRules"></v-text-field>
                </v-flex>
                <v-flex xs12>
                  <v-select prepend-icon="restaurant_menu" :items=types label="Food type" v-model="menu.type"
                    :rules="typeRules"></v-select>
                </v-flex>
                <input type="file" style="display:none" ref="image" accept="image/*" @change="onFileChanged">
                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-btn @click="pickFile" color="primary" class="ma-0">
                    Upload image
                    <v-icon right dark>cloud_upload</v-icon>
                  </v-btn>
                  <div v-if="imageTooBig" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is too big, resolution must be 1920x1080 or smaller.
                  </div>
                  <div v-else-if="imageError" style="color:red;" class="subheading font-weight-light mt-3">
                    Image is required!
                  </div>
                </v-flex>

                <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center mt-2">
                  <v-tooltip v-if="imageUrl" top max-width="500px" color="white">
                    <template v-slot:activator="{ on }">
                      <img :src="imageUrl" v-on="on" width="35%" v-if="imageUrl" />
                    </template>
                    <img :src="imageUrl" width="100%" v-if="imageUrl" />

                  </v-tooltip>
                </v-flex>
                <v-flex class="text-xs-center text-sm-center text-md-center text-lg-center">
                  <div v-if="imageName" class="subheading font-weight-light text-truncate">
                    {{ imageName }}
                  </div>
                </v-flex>
              </v-layout>
            </v-container>
            <v-card-actions class="pb-3">
              <v-spacer></v-spacer>
              <v-btn color="error" @click="openModal = false">Close</v-btn>
              <v-btn color="primary" :disabled="!valid" @click.prevent="onSubmit">Add</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-form>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      valid: true,
      openModal: false,
      imageUrl: '',
      imageName: '',
      imageTooBig: false,
      types: ['Starter', 'Main Course', 'Fastfood', 'Pizza', 'Dessert', 'Drinks'],
      menu: {
        name: '',
        description: '',
        price: '',
        type: '',
        image: ''
      },
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
      addNotification: false,
      nameNotification: false,
      imageError: false
    };
  },
  watch: {
    openModal() {
      this.$refs.form.resetValidation();
      this.$refs.image.value = '';
      this.menu.name = '';
      this.menu.description = '';
      this.menu.price = '';
      this.menu.type = '';
      this.menu.image = '';
      this.imageUrl = '';
      this.imageName = '';
      this.imageTooBig = false;
      this.imageError = false;
    }
  },
  methods: {
    addedNotification() {
      this.addNotification = false;
      setTimeout(() => {
        this.addNotification = true;
      }, 100);
    },
    nameErrorNotification() {
      this.nameNotification = false;
      setTimeout(() => {
        this.nameNotification = true;
      }, 100);
    },
    pickFile() {
      this.$refs.image.click();
    },
    onFileChanged(e) {
      const file = e.target.files[0];
      if (file && file.size > 1920 * 1080) {
        this.imageTooBig = true;
        this.menu.image = null;
        this.imageName = '';
        this.imageUrl = '';
        return;
      }
      if (file !== undefined) {
        this.imageName = file.name;
      } else {
        return;
      }
      this.imageError = false;
      this.imageTooBig = false;
      this.menu.image = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    onSubmit() {
      if (!this.menu.image)
        this.imageError = true;

      if (!this.$refs.form.validate()) {
        return;
      }

      const formData = new FormData();
      const menuData = this.menu;

      if (!menuData.image) {
        return;
      }

      formData.append('name', menuData.name);
      formData.append('description', menuData.description);
      formData.append('price', menuData.price);
      formData.append('image', menuData.image);
      formData.append('type', menuData.type);

      this.$store.dispatch('addMenu', formData).then((res) => {
        if (res.responseType === 'success') {
          this.openModal = false;
          this.addedNotification();
        } else if (res.responseType === 'error' && res.errorMessage === 'nameTaken') {
          this.nameErrorNotification();
        }
      });
    }
  }
};
</script>

<style scoped></style>