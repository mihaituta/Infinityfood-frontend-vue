<template>
    <v-layout class="pa-0 ma-0" max-width="25%">
        <v-dialog v-model="openModal" max-width="25%" full-height transition="scale-transition">
            <v-card>
                <v-card-title class="ma-0 pa-0">
                    <v-spacer></v-spacer>
                    <v-btn flat fab small @click="openModal = false">
                        <v-icon size="25px">close</v-icon>
                    </v-btn>
                    <v-flex xs12 class="text-xs-center text-sm-center text-md-center text-lg-center">
                        <div class="title">
                            <v-icon>person_add</v-icon>
                            Update user
                        </div>
                    </v-flex>
                </v-card-title>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text class="pt-0 pb-0">
                        <v-container class="pl-3 pr-3 pb-1">
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="person" v-model="userList.name" label="Name"
                                        :rules="nameRules"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="email" v-model="userList.email" label="E-mail"
                                        :rules="mailRules"></v-text-field>
                                </v-flex>
                                <v-flex>
                                    <v-text-field prepend-icon="lock"
                                        :append-icon="show ? 'visibility' : 'visibility_off'"
                                        :type="show ? 'text' : 'password'" v-model="userList.password"
                                        :error-messages="passwordErrors" label="Password"
                                        @input="$v.userList.password.$touch()" @blur="$v.userList.password.$touch()"
                                        @click:append="show = !show"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-select prepend-icon="security" :items="roles" label="Rol"
                                        v-model="userList.role_id" :rules="role_idRules"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions class="pb-3">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click.stop="openModal = false">Close</v-btn>
                            <v-btn color="primary" :disabled="!valid" @click.prevent="onSubmit">Update</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { minLength } from 'vuelidate/lib/validators'
import email from 'vuelidate/src/validators/email'

export default {
    props: {
        value: Boolean,
        id: Number,
    },
    data() {
        return {
            valid: true,
            show: false,
            roles: [{ text: 'Admin' }, { text: 'Staff' }],
            user: {},
            userList: [],
            nameRules: [v => !!v || 'Name is required!'],
            mailRules: [
                v => !!v || 'E-mail is required!',
                v =>
                    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                    'E-mail must be valid!',
            ],
            role_idRules: [v => !!v || 'Role is required!'],
        }
    },
    beforeMount() {
        this.user = this.$store.getters.getUserById(this.id)
        this.userList.id = this.user.id
        this.userList.name = this.user.name
        this.userList.email = this.user.email
        this.userList.role_id = this.user.role_id
    },
    watch: {
        openModal() {
            this.$v.$reset()
            this.user.name = ''
            this.user.email = ''
            this.user.password = ''
            this.user.role_id = null
        },
    },
    validations: {
        userList: {
            password: { minLength: minLength(6) },
        },
    },
    computed: {
        openModal: {
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            },
        },
        passwordErrors() {
            const errors = []
            if (!this.$v.userList.password.$dirty) return errors
            !this.$v.userList.password.minLength &&
                errors.push('Password must have at least 6 characters!')
            return errors
        },
    },
    methods: {
        onSubmit() {
            this.$v.$touch()
            if (this.$v.$pending || this.$v.$error) return

            if (!this.$refs.form.validate()) {
                return
            }

            //const formData = new FormData();
            const data = {}
            if (this.userList.name !== this.user.name) {
                data.name = this.userList.name
            }
            if (this.userList.email !== this.user.email) {
                data.email = this.userList.email
            }
            if (
                this.userList.password &&
                this.userList.password !== this.user.password
            ) {
                data.password = this.userList.password
            }
            if (this.userList.role_id !== this.user.role_id) {
                data.role_id = this.userList.role_id
            }

            // If there are no changes, close the modal and return
            if (Object.keys(data).length === 0) {
                this.openModal = false;
                return;
            }

            // Send the updated data object to the store for dispatch
            this.$store
                .dispatch('editUser', { data, id: this.userList.id })
                .then(res => {
                    if (res.responseType === 'success') {
                        this.$parent.addUpdateNotification()
                        this.openModal = false
                    } else if (
                        res.responseType === 'error' &&
                        res.errorMessage === 'uniqueName'
                    ) {
                        this.$parent.nameErrorNotification()
                    } else if (
                        res.responseType === 'error' &&
                        res.errorMessage === 'uniqueEmail'
                    ) {
                        this.$parent.emailErrorNotification()
                    }
                })
        },
    },
}

</script>

<style scoped></style>