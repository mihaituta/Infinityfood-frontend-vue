<template>
    <v-layout class="pa-0 ma-0" max-width="25%">
        <v-dialog
                v-model="openModal"
                max-width="15%"
                full-height
                transition="scale-transition"
        >
            <v-card>
                <v-card-title class="ma-0 pa-0">
                    <v-spacer></v-spacer>
                    <v-btn flat fab small @click="openModal = false">
                        <v-icon size="25px">close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-form ref="form">
                    <v-card-text class="mt-0 pt-0 pb-0 mb-0" style="padding-left: 20px;padding-right: 20px;">
                        <v-select
                                :items=statusList
                                item-text="text"
                                item-value="value"
                                label="Status"
                                v-model="status"
                                box
                        >
                            <template v-slot:selection="data">
                                <v-icon class="pr-2">{{data.item.icon}}</v-icon>
                                {{data.item.text}}
                            </template>
                            <template v-slot:item="data">
                                <v-icon class="pr-2">{{data.item.icon}}</v-icon>
                                {{data.item.text}}
                            </template>
                        </v-select>
                    </v-card-text>
                    <v-card-actions class="pb-3 pt-0 mt-0 justify-center">

                        <v-btn color="error" @click.stop="openModal=false">Close</v-btn>
                        <v-btn color="primary" @click.prevent="onSubmit">Update</v-btn>
                    </v-card-actions>
                </v-form>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    import {minLength} from 'vuelidate/lib/validators';
    import email from 'vuelidate/src/validators/email';

    export default {
        props: {
            value: Boolean,
            id: Number
        },
        data() {
            return {
                statusList:
                    [
                        {
                            icon: 'schedule',
                            text: 'In progress',
                            value: 0
                        },
                        {
                            icon: 'check_circle',
                            text: 'Delivered',
                            value: 1
                        }
                    ],
                status: null,
                order: null,
            };
        },
        beforeMount() {
            this.order = this.$store.getters.getOrderById(this.id);
            this.status = this.order.status;
        },
        watch: {
            openModal() {
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
            onSubmit() {

                if (this.status === this.order.status) {
                    this.openModal = false;
                    return;
                }

                const formData = new FormData();
                let data = {
                    id: this.order.id,
                    status: this.status,

                };
                formData.append('id', data.id);
                if (this.status !== this.order.status)
                    formData.append('status', data.status);

                formData.append('_method', 'patch');

                this.$store.dispatch('editOrder', {data: formData, id: data.id}).then((res) => {
                    if (res.responseType === 'success') {
                        this.$parent.addUpdateNotification();
                        this.openModal = false;
                    }
                });
            }
        }
    };
</script>

<style scoped>

</style>