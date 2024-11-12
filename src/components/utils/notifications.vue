<template>
    <v-snackbar
            v-model="snackbar"
            :timeout="timeout ? timeout : 4000 "
            :top="top"
            :right="right"
            :bottom="bottom"
            :left="left"
            dark
            multi-line
            :color="color"
            style="font-size: 18px"
            class="font-weight-light"
    >
        {{text}}
        <v-btn flat @click.native="snackbar = false">
            <v-icon size="21px">close</v-icon>
        </v-btn>
    </v-snackbar>
</template>

<script>
    export default {
        data: () => ({
            snackbar: false
        }),
        props: ['color', 'text', 'showNotification', 'top', 'right', 'bottom', 'left','timeout'],
        watch: {
            showNotification: function () {
                this.snackbar = this.showNotification;
            }
        }
    };
</script>

<style scoped>

</style>