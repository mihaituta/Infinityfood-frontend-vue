<template>
    <v-layout class="mt-2">
        <notification text="User added successfully!" color="rgb(76, 175, 80, 0.9)" :showNotification="addNotification"
            :top=true :right=true></notification>
        <notification :text='`A user with this ${errorText} already exists!`' color="rgb(255, 82, 82, 0.9)"
            :showNotification="errorNotification" :top=true></notification>
        <v-btn color="primary" dark @click.stop="openModal = true">
            <v-icon class="pr-2">person_add</v-icon>
            Add user
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
                            <v-icon>person_add</v-icon>
                            Add user
                        </div>
                    </v-flex>
                </v-card-title>
                <v-divider></v-divider>
                <v-form ref="form" v-model="valid" lazy-validation>
                    <v-card-text class="pt-0 pb-0">
                        <v-container class="pl-3 pr-3 pb-2">
                            <v-layout column>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="person" v-model="user.name" label="Name"
                                        :error-messages="nameErrors" required @input="$v.user.name.$touch()"
                                        @blur="$v.user.name.$touch()"></v-text-field>
                                </v-flex>
                                <v-flex xs12>
                                    <v-text-field prepend-icon="email" name="email" v-model="user.email"
                                        :error-messages="emailErrors" label="E-mail" required
                                        @input="$v.user.email.$touch()" @blur="$v.user.email.$touch()"></v-text-field>
                                </v-flex>
                                <v-text-field prepend-icon="lock" name="password"
                                    :append-icon="show ? 'visibility' : 'visibility_off'"
                                    :type="show ? 'text' : 'password'" v-model="user.password"
                                    :error-messages="passwordErrors" label="Password" required
                                    @input="$v.user.password.$touch()" @blur="$v.user.password.$touch()"
                                    @click:append="show = !show"></v-text-field>
                                <v-flex xs12>
                                    <v-select prepend-icon="security" :items=roles label="Role" v-model="user.roleId"
                                        :error-messages="roleIdErrors" required @change="$v.user.roleId.$touch()"
                                        @blur="$v.user.roleId.$touch()"></v-select>
                                </v-flex>
                            </v-layout>
                        </v-container>
                        <v-card-actions class="pb-3">
                            <v-spacer></v-spacer>
                            <v-btn color="error" @click="openModal = false">Close</v-btn>
                            <v-btn color="primary" :disabled="!valid || loading" @click.prevent="onSubmit">Add</v-btn>
                        </v-card-actions>
                    </v-card-text>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
import { required, minLength } from 'vuelidate/lib/validators';
import email from 'vuelidate/src/validators/email';

export default {
    data() {
        return {
            loading: false,
            valid: true,
            openModal: false,
            show: false,
            roles: [
                { text: 'Admin' },
                { text: 'Staff' },
            ],
            user: {
                name: '',
                email: '',
                password: '',
                roleId: ''
            },
            addNotification: false,
            errorNotification: false,
            errorText: ''
        };
    },
    validations: {
        user: {
            name: { required },
            email: { required, email },
            password: { required, minLength: minLength(6) },
            roleId: { required }
        }
    },
    watch: {
        openModal() {
            this.$v.$reset();
            this.user.name = '';
            this.user.email = '';
            this.user.password = '';
            this.user.roleId = null;
        }
    },
    computed: {
        nameErrors() {
            const errors = [];
            if (!this.$v.user.name.$dirty) return errors;
            !this.$v.user.name.required && errors.push('Name is required!');
            return errors;
        },
        emailErrors() {
            const errors = [];
            if (!this.$v.user.email.$dirty) return errors;
            !this.$v.user.email.email && errors.push('E-mail must be valid!');
            !this.$v.user.email.required && errors.push('E-mail is required!');
            return errors;
        },
        passwordErrors() {
            const errors = [];
            if (!this.$v.user.password.$dirty) return errors;
            !this.$v.user.password.required && errors.push('Password is required!');
            !this.$v.user.password.minLength && errors.push('Password must have at least 6 characters!');
            return errors;
        },
        roleIdErrors() {
            const errors = [];
            if (!this.$v.user.roleId.$dirty) return errors;
            !this.$v.user.roleId.required && errors.push('Role is required!');
            return errors;
        }
    },
    methods: {
        userAddedNotification() {
            this.addNotification = false;
            setTimeout(() => {
                this.addNotification = true;
            }, 100);
        },
        userExistsNotification() {
            this.errorNotification = false;
            setTimeout(() => {
                this.errorNotification = true;
            }, 100);
        },
        onSubmit() {
            this.$v.$touch();
            if (this.$v.$pending || this.$v.$error) return;

            this.loading = true;  // Disable the submit button when the request starts

            let userData = this.user;
            this.$store.dispatch('addUser', userData).then((res) => {
                this.loading = false; // Re-enable the submit button
                console.log(res);
                console.log(res.responseType);
                console.log(res.errorMessage);

                if (res.responseType === 'success') {
                    this.openModal = false;
                    this.userAddedNotification();
                } else if (res.responseType === 'error' && res.errorMessage === 'uniqueName') {
                    this.errorText = 'name';
                    this.userExistsNotification();
                } else if (res.responseType === 'error' && res.errorMessage === 'uniqueEmail') {
                    this.errorText = 'e-mail';
                    this.userExistsNotification();
                }
            })
        }
    }
};
</script>

<style scoped></style>