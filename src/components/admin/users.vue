<template>
    <div class="wrapper">
        <v-container fluid style="width:80%">
            <notification text="User was deleted successfully!" color="rgb(255, 82, 82, 0.9)" :top=true
                          :right=true
                          :showNotification="userDeletedNotif"></notification>
            <notification text="User was updated successfully!" color="rgb(76, 175, 80, 0.9)"
                          :showNotification="userUpdatedNotif" :top=true :right=true></notification>
            <notification text="A user with this name already exists!" color="rgb(255, 82, 82, 0.9)"
                          :showNotification="nameNotification" :top=true></notification>
            <notification text="A user with this e-mail already exists!" color="rgb(255, 82, 82, 0.9)"
                          :showNotification="emailNotification" :top=true></notification>
            <add-modal/>
            <edit-modal v-if="openEditModal" v-model="openEditModal" :id='userId'/>
            <delete-modal v-if="openDeleteModal" v-model="openDeleteModal" text="Confirm deletion of this user?"
                          :id='userId' action="deleteUser"/>
            <v-card class="mt-4 mb-3">
                <v-card-title class="headline">
                    Users
                    <v-spacer></v-spacer>
                    <v-text-field
                            v-model="search"
                            append-icon="search"
                            label="Search"
                            single-line
                            hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                        v-if="users"
                        :headers="headers"
                        :items="users"
                        :search="search"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="user">
                        <td>{{ user.item.id }}</td>
                        <td>{{ user.item.name }}</td>
                        <td>{{ user.item.email }}</td>
                        <td>{{ user.item.role_id }}</td>
                        <td class="pa-0" width="20%">

                            <v-btn small dark color="success" @click.stop="editUser(user.item.id)">
                                <v-icon class="pr-2" size="18">edit</v-icon>
                                Edit
                            </v-btn>

                            <v-btn small @click.stop="deleteUser(user.item.id)" dark color="error">
                                <v-icon class="pr-1" size="20">delete</v-icon>
                                Delete
                            </v-btn>

                        </td>
                    </template>
                    <template v-slot:no-data>
                        <v-alert :value="true" color="error" icon="warning">
                            No users found.
                        </v-alert>
                    </template>
                    <template v-slot:no-results>
                        <v-alert :value="true" color="error" icon="warning">
                          Nothing was found for "{{ search }}" .
                        </v-alert>
                    </template>
                </v-data-table>
            </v-card>
        </v-container>
    </div>
</template>

<script>
    import addModal from '../modals/addUserModal';
    import editModal from '../modals/editUserModal';
    import deleteModal from '../modals/deleteModal';

    export default {
        data: function () {
            return {
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Name', value: 'name'},
                    {text: 'E-mail', value: 'email'},
                    {text: 'Role', value: 'role_id'},
                    {text: 'Actions', align: 'center', sortable: false}
                ],
                search: '',
                openEditModal: false,
                openDeleteModal: false,
                userId: null,
                userDeletedNotif: false,
                userUpdatedNotif: false,
                nameNotification: false,
                emailNotification: false,
            };
        },
        computed: {
            users() {
                return this.$store.getters.users;
            }
        },
        methods: {
            editUser(id) {
                this.userId = id;
                this.openEditModal = true;
            },
            deleteUser(id) {
                this.userId = id;
                this.openDeleteModal = true;
            },
            addDeleteNotification() {
                this.userDeletedNotif = false;
                setTimeout(() => {
                    this.userDeletedNotif = true;
                }, 200);
            },
            addUpdateNotification() {
                this.userUpdatedNotif = false;
                setTimeout(() => {
                    this.userUpdatedNotif = true;
                }, 200);
            },
            nameErrorNotification() {
                this.nameNotification = false;
                setTimeout(() => {
                    this.nameNotification = true;
                }, 200);
            },
            emailErrorNotification() {
                this.emailNotification = false;
                setTimeout(() => {
                    this.emailNotification = true;
                }, 200);
            },
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrapper");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.4) + 'px');
            },
        },

        beforeCreate() {
            this.$store.dispatch('getUsers');
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
            'delete-modal': deleteModal
        }
    };
</script>

<style scoped>
    .wrapper {
        background-image: url('../../assets/loggedPagesBg.jpg');
        background-attachment: fixed;
        background-size: cover;
        height: 100%;
    }
</style>