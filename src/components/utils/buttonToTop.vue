<template>
    <v-fab-transition>
        <v-btn
                v-show="showBtn"
                absolute
                dark
                fab
                right
                bottom
                fixed
                color="red"
                class="mb-5"
                @click="$vuetify.goTo(0, options)"
        >
            <v-icon size="30">keyboard_arrow_up</v-icon>
        </v-btn>
    </v-fab-transition>
</template>

<script>
    import * as easings from 'vuetify/es5/util/easing-patterns'

    export default {
        data() {
            return {
                duration: 400,
                offset: 0,
                easing: 'easeInOutCubic',
                easings: Object.keys(easings),
                showBtn: false
            };
        },

        computed: {
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
            handleScroll() {
                this.showBtn = window.scrollY > 150;
            }
        },

        created() {
            window.addEventListener('scroll', this.handleScroll);
        },
        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },
    }
</script>

<style scoped>

</style>