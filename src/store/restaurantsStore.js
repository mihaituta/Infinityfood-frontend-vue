import axios from '../axios-auth'

const state = {
  loading: true,
  restaurants: [
    {
      id: null,
      name: null,
      slug: null,
      userId: null,
      city: null,
      previewDescription: null,
      previewImage: null,
      backgroundImage: null,
      logoImage: null,
      contactText: null,
      phone1: null,
      phone2: null,
      mail1: null,
      mail2: null,
      aboutText: null,
    },
  ],
  restaurant: {
    id: null,
    name: null,
    slug: null,
    userId: null,
    city: null,
    previewDescription: null,
    previewImage: null,
    backgroundImage: null,
    logoImage: null,
    contactText: null,
    phone1: null,
    phone2: null,
    mail1: null,
    mail2: null,
    aboutText: null,
  },
  menus: [
    {
      id: null,
      name: null,
      description: null,
      price: null,
      type: null,
      image: null,
      store_id: null,
    },
  ],
  menuTypes: [],
  cities: [],
  users: [
    {
      id: null,
      name: null,
      email: null,
      roleId: null,
    },
  ],
}

const mutations = {
  setLoading(state, payload) {
    state.loading = payload
  },
  getRestaurantMenus(state, payload) {
    state.menus = payload
  },
  getRestaurantMenusTypes(state, payload) {
    state.menuTypes = payload
  },
  getRestaurants(state, payload) {
    state.restaurants = payload
  },
  getRestaurant(state, payload) {
    state.restaurant = payload
  },
  getRestaurantsUsers(state, payload) {
    state.users = payload
  },
  getRestaurantCities(state, payload) {
    state.cities = payload
  },
  deleteRestaurant(state, menu) {
    state.restaurants.splice(menu, 1)
  },
  clearRestaurants(state) {
    state.menus = null
    state.menuTypes = null
    state.users = null
  },
  clearRestaurant(state) {
    state.restaurant = {}
    state.menus = null
    state.menuTypes = null
  },
}

const actions = {
  getRestaurantsPreviews({ commit }) {
    axios
      .get(process.env.VUE_APP_API_URL + '/restaurants')
      .then(res => {
        let restaurants = []
        let response = res.data.data.restaurants
        response.forEach(restaurant => {
          const temp = {
            name: restaurant.name,
            slug: restaurant.slug,
            city: restaurant.city,
            previewDescription: restaurant.previewDescription,
            previewImage: restaurant.previewImage,
          }
          restaurants.push(temp)
        })
        commit('getRestaurants', restaurants)
        commit('getRestaurantCities', res.data.data.cities)
        commit('setLoading', false)
      })
      .catch(error => console.log(error))
  },

  getRestaurantsComplete({ commit }) {
    axios
      .get(process.env.VUE_APP_API_URL + '/restaurants-complete')
      .then(res => {
        console.log(res.data)
        let restaurants = []
        let response = res.data.data.restaurants
        response.forEach(restaurant => {
          const temp = {
            id: restaurant.id,
            name: restaurant.name,
            slug: restaurant.slug,
            city: restaurant.city,
            userId: restaurant.userId,
            previewDescription: restaurant.previewDescription,
            previewImage: restaurant.previewImage,
            backgroundImage: restaurant.backgroundImage,
            logoImage: restaurant.logoImage,
            contactText: restaurant.contactText,
            phone1: restaurant.phone1,
            phone2: restaurant.phone2,
            mail1: restaurant.mail1,
            mail2: restaurant.mail2,
            aboutText: restaurant.aboutText,
          }
          restaurants.push(temp)
        })
        commit('getRestaurants', restaurants)
        commit('getRestaurantsUsers', res.data.data.users)
      })
      .catch(error => console.log(error))
  },

  getRestaurantComplete({ commit }, slug) {
    return axios
      .get(process.env.VUE_APP_API_URL + '/restaurant-complete/' + slug)
      .then(res => {
        let response = res.data.data.restaurant
        if (res.data.responseType === 'success') {
          const restaurant = {
            id: response.id,
            name: response.name,
            city: response.city,
            backgroundImage: response.backgroundImage,
            logoImage: response.logoImage,
            contactText: response.contactText,
            phone1: response.phone1,
            phone2: response.phone2,
            mail1: response.mail1,
            mail2: response.mail2,
            aboutText: response.aboutText,
          }
          commit('getRestaurant', restaurant)
        }
        let menus = []
        let response2 = res.data.data.menus
        response2.forEach(menu => {
          const temp = {
            id: menu.id,
            name: menu.name,
            description: menu.description,
            price: menu.price,
            type: menu.type,
            image: menu.image,
            store_id: menu.store_id,
          }
          menus.push(temp)
        })
        commit('getRestaurantMenus', menus)
        commit('getRestaurantMenusTypes', res.data.data.types)
        return res.data
      })
  },

  getRestaurantStaff({ commit }) {
    return axios
      .get(process.env.VUE_APP_API_URL + '/staff/restaurant')
      .then(res => {
        let response = res.data.data
        if (res.data.responseType === 'success') {
          const restaurant = {
            id: response.id,
            name: response.name,
            city: response.city,
            previewDescription: response.previewDescription,
            previewImage: response.previewImage,
            backgroundImage: response.backgroundImage,
            logoImage: response.logoImage,
            contactText: response.contactText,
            phone1: response.phone1,
            phone2: response.phone2,
            mail1: response.mail1,
            mail2: response.mail2,
            aboutText: response.aboutText,
          }
          commit('getRestaurant', restaurant)
        }
        return res.data
      })
  },

  editRestaurantStaff({ commit }, payload) {
    return axios
      .patch(process.env.VUE_APP_API_URL + '/staff/restaurant', payload)
      .then(res => {
        if (res.data.responseType === 'success')
          this.dispatch('getRestaurantStaff')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  addRestaurant({ commit }, payload) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/admin/restaurant', payload)
      .then(res => {
        if (res.data.responseType === 'success')
          this.dispatch('getRestaurantsComplete')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  editRestaurant({ commit }, payload) {
    return axios
      .patch(
        process.env.VUE_APP_API_URL + '/admin/restaurant/' + payload.id,
        payload.data
      )
      .then(res => {
        if (res.data.responseType === 'success')
          this.dispatch('getRestaurantsComplete')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  deleteRestaurant({ commit }, id) {
    return axios
      .delete(process.env.VUE_APP_API_URL + '/admin/restaurant/' + id)
      .then(res => {
        commit('deleteRestaurant', id)
        this.dispatch('getRestaurantsComplete')
        return res.data
      })
  },
}

const getters = {
  loading: state => state.loading,
  restaurants(state) {
    return state.restaurants
  },
  cities(state) {
    return state.cities
  },
  getRestaurantById: state => id => {
    return state.restaurants.find(restaurant => restaurant.id === id)
  },
  restaurant(state) {
    return state.restaurant
  },
  getStaffUsers(state) {
    return state.users
  },
  restaurantMenus(state) {
    return state.menus
  },
  restaurantMenuTypes(state) {
    return state.menuTypes
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
