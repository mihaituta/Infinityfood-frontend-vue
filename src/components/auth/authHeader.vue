<template>
    <v-toolbar dark color="dark">
        <v-toolbar-title>
            <div v-if="userRole === 'Admin'">Administration</div>
            <div v-else-if="userRole === 'Staff'">Staff</div>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items class="hidden-sm-and-down">
            <v-btn v-if="userRole === 'Admin'" flat to="/admin/restaurants">
                <v-icon class="pr-2">restaurant</v-icon>
                Restaurants
            </v-btn>
            <v-btn v-if="userRole === 'Admin'" flat to="/admin/users">
                <v-icon class="pr-2">people</v-icon>
                Users
            </v-btn>
            <v-btn v-if="userRole === 'Staff'" flat to="/staff/restaurant">
                <v-icon class="pr-2">restaurant</v-icon>
                Restaurant
            </v-btn>
            <v-btn v-if="userRole === 'Staff'" flat to="/staff/menus">
                <v-icon class="pr-2">fastfood</v-icon>
                Menus
            </v-btn>
            <v-btn v-if="userRole === 'Staff'" flat to="/staff/orders">
                <v-icon class="pr-2">assignment</v-icon>
                Orders
            </v-btn>
            <v-btn flat v-if="userRole" @click="onLogout" class="logout">
                <v-icon class="pr-2">exit_to_app</v-icon>
                Logout
            </v-btn>
        </v-toolbar-items>
    </v-toolbar>
</template>

<script>
    export default {
        computed: {
            userRole() {
                return this.$store.getters.role_id;
            }
        },
        methods: {
            onLogout() {
                this.$store.dispatch('logout');
            }
        }
    };
</script>

<style scoped>

</style>