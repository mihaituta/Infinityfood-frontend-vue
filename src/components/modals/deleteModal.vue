<template>
    <v-layout row justify-center>
        <v-dialog
                v-model="showModal"
                max-width="290"
                transition="slide-x-reverse-transition"
        >
            <v-card>
                <v-card-title class="ma-0 pa-0">
                    <v-spacer></v-spacer>
                    <v-btn flat fab small @click="showModal = false">
                        <v-icon size="25px">close</v-icon>
                    </v-btn>
                </v-card-title>
                <v-card-text class="headline text-sm-center ma-0 pt-0">
                    {{text}}
                </v-card-text>
                <v-card-actions class="justify-center pb-3">
                     <v-btn color="error" @click="showModal = false">No</v-btn>
                    <v-btn color="info" @click="onSubmit">Yes</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
    export default {
        props: {
            value: Boolean,
            text: String,
            id: Number,
            action: String,
        },
        computed: {
            showModal: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.$emit('input', value);
                }
            }
        },
        methods: {
            onSubmit() {
                this.$store.dispatch(this.action, this.id).then((res) => {
                    if (res.responseType === 'success') {
                        this.$parent.addDeleteNotification();
                        this.showModal = false;
                    }
                });
            }
        }
    };

</script>

<style scoped>

</style>