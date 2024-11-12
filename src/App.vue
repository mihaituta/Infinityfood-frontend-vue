<template>
    <div>
        <v-app>
            <auth-header v-if="showLoggedNavbar"/>
            <app-header v-else-if="showNavbar"/>
            <router-view/>
            <btn-to-top/>
            <app-footer/>
        </v-app>
    </div>
</template>

<script>
    import authHeader from './components/auth/authHeader';
    import header from './components/utils/header';
    import footer from './components/utils/footer';
    import buttonToTop from "./components/utils/buttonToTop";

    export default {
        data() {
            return {
                showNavbar: true,
                showLoggedNavbar: false
            }
        },
        components: {
            'auth-header': authHeader,
            'app-header': header,
            'app-footer': footer,
            'btn-to-top': buttonToTop
        },
        watch: {
            $route(to, from) {
                if (this.$router.currentRoute.name === 'restaurant') {
                    this.showNavbar = false;
                    this.showLoggedNavbar = false;
                } else if (this.$router.currentRoute.path.includes('/admin/') || this.$router.currentRoute.path.includes('/staff/')) {
                    this.showNavbar = false;
                    this.showLoggedNavbar = true;
                } else {
                    this.showLoggedNavbar = false;
                    this.showNavbar = true;
                }
            }
        },
        created() {
            if (this.$router.currentRoute.name === 'restaurant') {
                this.showNavbar = false;
                this.showLoggedNavbar = false;
            } else if (this.$router.currentRoute.path.includes('/admin/') || this.$router.currentRoute.path.includes('/staff/')) {
                this.showNavbar = false;
                this.showLoggedNavbar = true;
            } else {
                this.showLoggedNavbar = false;
                this.showNavbar = true;
            }
        }
    };
</script>

<style>
    button {
        text-transform: none;
    }
</style>
