<template>
    <div class="wrapper">
        <v-container fluid style="width:80%">
            <notification text="Menu was deleted successfully!" color="rgb(255, 82, 82, 0.9)"
                          :showNotification="menuDeletedNotif" :top=true :right=true></notification>
            <notification text="Menu was updated successfully!" color="rgb(76, 175, 80, 0.9)"
                          :showNotification="menuUpdatedNotif" :top=true :right=true></notification>
            <notification text="A menu with this name already exists!" color="rgb(255, 82, 82, 0.9)"
                          :showNotification="nameNotification" :top=true></notification>
            <add-modal/>
            <edit-modal v-if="openEditModal" v-model="openEditModal" :id='menuId'/>
            <delete-modal v-if="openDeleteModal" v-model="openDeleteModal" text="Confirm deletion of this menu?"
                          :id='menuId' action="deleteMenu"/>
            <v-alert
                    :value="!menus.length"
                    type="error"
                    class="mt-4"
            >
                No menus found.
            </v-alert>
            <v-tabs class="mt-2" fixed-tabs color="transparent" centered>
                <v-tab v-for="type in types" :key="type.id">
                    <v-icon class="mr-2">{{getIcon(type)}}</v-icon>
                    {{type}}
                </v-tab>
                <v-tab-item v-for="type in types" :key="type.id">
                    <v-container fluid grid-list-sm class="pa-2 mt-2">
                        <v-layout class="text-xs-center">
                            <v-flex xs1>
                                <div>Image</div>
                            </v-flex>
                            <v-flex xs2>
                                <div>Name</div>
                            </v-flex>
                            <v-flex xs4>
                                <div>Description</div>
                            </v-flex>
                            <v-flex xs1>
                                <div>Price</div>
                            </v-flex>
                            <v-flex xs1>
                                <div>Type</div>
                            </v-flex>
                            <v-flex xs3>
                                <div>Actions</div>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <v-hover v-for="menu in menus" :key="menu.id" v-if="menu.type === type">
                        <v-card style="border-radius: 5px;" slot-scope="{ hover }"
                                :class="`elevation-${hover ? 10 : 3}`">
                            <v-container fluid grid-list-sm class="mb-2 mt-3 pa-1">
                                <v-layout align-center justify-center class="text-sm-center">
                                    <v-flex xs1>
                                        <v-tooltip fixed right max-width="500px" color="white">
                                            <template v-slot:activator="{ on }">
                                                <v-img :src="path+menu.image"
                                                       aspect-ratio="1"
                                                       height="90"
                                                       width="90"
                                                       contain
                                                       v-on="on"
                                                ></v-img>
                                            </template>
                                            <img :src="path+menu.image" width="100%"/>
                                        </v-tooltip>
                                    </v-flex>
                                    <v-flex xs2>
                                        <div>{{ menu.name}}</div>
                                    </v-flex>
                                    <v-flex xs4>
                                        <div>{{ menu.description}}</div>
                                    </v-flex>
                                    <v-flex xs1>
                                        <div>{{ menu.price}} ron</div>
                                    </v-flex>
                                    <v-flex xs1>
                                        <div>{{ menu.type}}</div>
                                    </v-flex>

                                    <v-flex xs3>
                                        <v-layout align-center justify-center row fill-height>

                                            <v-btn style="border-radius: 5px;" color="success"
                                                   @click.stop="editMenu(menu.id)">
                                                <v-icon class="pr-2" size="20">edit</v-icon>
                                                Edit
                                            </v-btn>

                                            <v-btn style="border-radius: 5px;" color="error"
                                                   @click.stop="deleteMenu(menu.id)">
                                                <v-icon class="pr-1" size="21">delete</v-icon>
                                                Delete
                                            </v-btn>
                                        </v-layout>
                                    </v-flex>
                                </v-layout>
                            </v-container>
                        </v-card>
                    </v-hover>
                </v-tab-item>
            </v-tabs>
        </v-container>
    </div>
</template>

<script>
    import addModal from '../modals/addMenuModal';
    import editModal from '../modals/editMenuModal';
    import deleteModal from '../modals/deleteModal';
    import * as easings from 'vuetify/es5/util/easing-patterns'

    export default {
        data() {
            return {
                menuDeletedNotif: false,
                menuUpdatedNotif: false,
                openEditModal: false,
                openDeleteModal: false,
                confirmDeletion: false,
                nameNotification: false,
                menuId: null,
                path: process.env.VUE_APP_MENU_IMAGES,
                duration: 1000,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
                icons:
                    {
                        'Starter': 'restaurant',
                        'Main Course': 'room_service',
                        'Fastfood': 'fastfood',
                        'Pizza': 'local_pizza',
                        'Dessert': 'cake',
                        'Drinks': 'local_bar',
                    }
            };
        },

        computed: {
            menus() {
                return this.$store.getters.menus;

            },

            types() {
                return this.$store.getters.menuTypes;
            },

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
        },
        methods: {
            getIcon(type) {
                return this.icons[type];
            },
            editMenu(id) {
                this.openEditModal = true;
                this.menuId = id;
            },

            deleteMenu(id) {
                this.openDeleteModal = true;
                this.menuId = id;
            },

            addDeleteNotification() {
                this.menuDeletedNotif = false;
                setTimeout(() => {
                    this.menuDeletedNotif = true;
                }, 200);
            },

            addUpdateNotification() {
                this.menuUpdatedNotif = false;
                setTimeout(() => {
                    this.menuUpdatedNotif = true;
                }, 200);
            },

            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 200);
            },

            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrapper");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.1) + 'px');
            },
        },

        beforeCreate() {
            this.$store.dispatch('getMenus');
        },

        created() {
            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        components: {
            'add-modal': addModal,
            'edit-modal': editModal,
            'delete-modal': deleteModal,
        }
    };
</script>

<style scoped>
    div {
        font-size: 18px;
    }

    .wrapper {
        background-image: url('../../assets/loggedPagesBg.jpg');
        background-attachment: fixed;
        background-size: cover;
        height: 100%;
    }

    .flex {
        word-wrap: break-word;
    }
</style>