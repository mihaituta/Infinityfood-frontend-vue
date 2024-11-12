<template>
    <div class="wrapper">
        <v-container fluid style="width:90%">
            <notification text="Order was deleted successfully!" color="rgb(255, 82, 82, 0.9)" :top=true
                          :right=true
                          :showNotification="orderDeletedNotif"></notification>
            <notification text="Order status was updated!" color="rgb(76, 175, 80, 0.9)"
                          :showNotification="orderUpdatedNotif" :top=true :right=true></notification>

            <edit-modal v-if="openEditModal" v-model="openEditModal" :id='orderId'/>
            <delete-modal v-if="openDeleteModal" v-model="openDeleteModal" text="Confirm deletion of this order?"
                          :id='orderId' action="deleteOrder"/>
            <v-card class="mt-4 mb-5">
                <v-card-title class="headline">
                    Orders
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
                        v-if="orders"
                        :headers="headers"
                        :items="orders"
                        :search="search"
                        :expand="expand"
                        class="elevation-1"
                >
                    <template slot="items" slot-scope="order">
                        <tr @click="order.expanded = !order.expanded">
                            <td>{{ order.item.id }}</td>

                            <td>
                                <v-btn v-if="order.item.status === 0" style="border-radius: 50px; height: 32px;"
                                       color="warning" @click.stop="editOrder(order.item.id)">
                                    <v-icon class="pr-2" size="21">schedule</v-icon>
                                    {{status[order.item.status]}}
                                </v-btn>
                                <v-btn v-else-if="order.item.status === 1" style="border-radius: 50px; height: 32px;"
                                       color="success" @click.stop="editOrder(order.item.id)">
                                    <v-icon class="pr-2" size="21">check_circle</v-icon>
                                    {{status[order.item.status]}}
                                </v-btn>
                            </td>

                            <td>{{ order.item.totalPrice }} lei</td>
                            <td>{{ order.item.city }}</td>
                            <td>{{ order.item.name }}</td>
                            <td>{{ order.item.phone }}</td>

                            <td>
                                <span> Street {{ order.item.address }}</span>
                                <span v-if="order.item.houseNr">, Flat/House Nr. {{ order.item.houseNr }}</span>
                                <span v-if="order.item.floor">, Floor {{ order.item.floor }}</span>
                                <span v-if="order.item.apartment">, Apartment {{ order.item.apartment }}</span>
                            </td>

                            <td class="pa-0">
                                <v-btn style="border-radius: 50px; height: 32px;"
                                       @click.stop="deleteOrder(order.item.id)" dark color="error">
                                    <v-icon class="pr-1" size="20">delete</v-icon>
                                    Delete
                                </v-btn>
                            </td>
                        </tr>
                    </template>

                    <template slot="expand" slot-scope="order">
                        <v-card style="text-align: justify;" flat>
                            <v-layout class="titleText mt-2 mr-4 ml-4 mb-3">
                                <v-flex xs12 class="titleText">
                                    <div>Menus</div>
                                    <div class="contentText">{{order.item.menus}}.</div>
                                </v-flex>
                            </v-layout>
                            <v-layout v-if="order.item.information" class="titleText mt-2 mr-4 ml-4 mb-3">
                                <v-flex xs12 class="titleText">
                                    <div>Info</div>
                                    <div class="contentText">{{order.item.information}}.</div>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                        </v-card>
                    </template>

                    <template v-slot:no-data>
                        <v-alert :value="true" color="error" icon="warning">
                            No orders found.
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
    import editModal from '../modals/editOrderModal';
    import deleteModal from '../modals/deleteModal';

    export default {
        data: function () {
            return {
                headers: [
                    {text: 'ID', value: 'id'},
                    {text: 'Status', value: 'status'},
                    {text: 'Price', value: 'totalPrice'},
                    {text: 'City', value: 'city'},
                    {text: 'Name', value: 'name'},
                    {text: 'Phone', value: 'phone'},
                    {text: 'Address', value: 'address'},
                    {text: 'Actions', align: 'center', sortable: false}
                ],
                search: '',
                expand: false,
                openEditModal: false,
                openDeleteModal: false,
                orderId: null,
                orderDeletedNotif: false,
                orderUpdatedNotif: false,
                status:
                    {
                        0: 'In progress',
                        1: 'Delivered',
                    },
            };
        },
        computed: {
            orders() {
                return this.$store.getters.orders;
            }
        },
        methods: {
            editOrder(id) {
                this.orderId = id;
                this.openEditModal = true;
            },
            deleteOrder(id) {
                this.orderId = id;
                this.openDeleteModal = true;
            },
            addDeleteNotification() {
                this.orderDeletedNotif = false;
                setTimeout(() => {
                    this.orderDeletedNotif = true;
                }, 200);
            },
            addUpdateNotification() {
                this.orderUpdatedNotif = false;
                setTimeout(() => {
                    this.orderUpdatedNotif = true;
                }, 200);
            },
            handleScroll() {
                let scrolled = window.pageYOffset;
                let background = document.querySelector(".wrapper");
                background.style.backgroundPosition = '0%' + (-(scrolled * 0.4) + 'px');
            },
        },

        beforeCreate() {
            this.$store.dispatch('getOrders');
        },
        created() {
            window.addEventListener('scroll', this.handleScroll);
        },

        destroyed() {
            window.removeEventListener('scroll', this.handleScroll);
        },

        components: {
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

    .titleText {
        font-family: 'Malgun Gothic', sans-serif;
        font-size: 24px;
        font-weight: 400;
    }

    .contentText {
        font-family: 'Malgun Gothic', sans-serif;
        font-size: 17px;
        font-weight: 400;
        word-wrap: break-word;
    }
</style>