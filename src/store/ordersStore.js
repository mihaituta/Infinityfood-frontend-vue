import axios from '../axios-auth'

const state = {
  orders: [
    {
      id: null,
      status: null,
      totalPrice: null,
      menus: null,
      city: null,
      name: null,
      phone: null,
      address: null,
      houseNr: null,
      floor: null,
      apartment: null,
      information: null,
    },
  ],
}

const mutations = {
  getOrders(state, payload) {
    state.orders = payload
  },
  deleteOrder(state, order) {
    state.orders.splice(order, 1)
  },
}

const actions = {
  getOrders({ commit }) {
    axios
      .get(process.env.VUE_APP_API_URL + '/staff/orders')
      .then(res => {
        console.log(res)
        let orders = []
        let response = res.data.data
        response.forEach(order => {
          const temp = {
            id: order.id,
            status: order.status,
            totalPrice: order.totalPrice,
            menus: order.menus,
            city: order.city,
            name: order.name,
            phone: order.phone,
            address: order.address,
            houseNr: order.houseNr,
            floor: order.floor,
            apartment: order.apartment,
            information: order.information,
          }
          orders.push(temp)
        })
        commit('getOrders', orders)
      })
      .catch(error => console.log(error))
  },

  addOrder({ commit }, payload) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/restaurant/order', payload)
      .then(res => {
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  editOrder({ commit }, payload) {
    return axios
      .patch(
        process.env.VUE_APP_API_URL + '/staff/order/' + payload.id,
        payload.data
      )
      .then(res => {
        if (res.data.responseType === 'success') this.dispatch('getOrders')
        return res.data
      }) 
      .catch(error => {
        console.log(error)
      })
  },

  deleteOrder({ commit }, id) {
    return axios
      .delete(process.env.VUE_APP_API_URL + '/staff/order/' + id)
      .then(res => {
        console.log(res)
        commit('deleteOrder', id)
        this.dispatch('getOrders')
        return res.data
      })
  },
}

const getters = {
  orders(state) {
    return state.orders
  },
  getOrderById: state => id => {
    return state.orders.find(order => order.id === id)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
