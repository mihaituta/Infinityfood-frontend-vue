import Vue from 'vue';
import Router from 'vue-router';
import Login from './components/auth/login';
import Users from './components/admin/users';
import Restaurants from './components/admin/restaurants';
import Menus from './components/staff/menus';
import Orders from './components/staff/orders';
import editRestaurant from './components/staff/editRestaurant';
import Error from './views/Error404';
import store from './store/store';
import Restaurant from './views/Restaurant';
import axios from 'axios';
import RestaurantsList from './views/RestaurantsList';
import About from './views/About';
import Contact from './views/Contact';

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {path: '/login', name: 'login', component: Login},
        {
            path: '/',
            name: 'restaurantslist',
            component: RestaurantsList
        },
        {
            path: '/about',
            name: 'about',
            component: About
        },
        {
            path: '/contact',
            name: 'contact',
            component: Contact
        },
        {
            path: '/restaurant/:slug',
            name: 'restaurant',
            component: Restaurant
        },
        {
            path: '/admin/users',
            name: 'users',
            component: Users,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/admin/restaurants',
            name: 'restaurants',
            component: Restaurants,
            meta: {requiresAuth: true, adminAuth: true, staffAuth: false}
        },
        {
            path: '/staff/menus',
            name: 'menus',
            component: Menus,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '/staff/restaurant',
            name: 'editRestaurant',
            component: editRestaurant,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '/staff/orders',
            name: 'orders',
            component: Orders,
            meta: {requiresAuth: true, adminAuth: false, staffAuth: true}
        },
        {
            path: '*',
            name: 'error',
            component: Error
        }
    ]
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        const token = localStorage.getItem('token');
        if (token) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
        }
        if (!token)
            next({name: 'login'});
        else if (to.meta.adminAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher();
                    if (role_id === 'Admin') next();
                    else next('/login');
                });
            } else if (store.getters.role_id === 'Admin') next();
            else next('/');
        } else if (to.meta.staffAuth) {
            if (store.getters.role_id === null) {
                const watcher = store.watch(() => store.getters.role_id, role_id => {
                    watcher();
                    if (role_id === 'Staff') next();
                    else next('/login');
                });
            } else if (store.getters.role_id === 'Staff') next();
            else next('/');
        }
    } else next();
});

export default router;
