import Vue from 'vue'
import Vuex from 'vuex'
import axios from '../axios-auth'
import router from '../router'
import menusStore from './menusStore'
import usersStore from './usersStore'
import restaurantsStore from './restaurantsStore'
import ordersStore from './ordersStore'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    user: {
      id: null,
      name: null,
      email: null,
      roleId: null,
    },
  },
  mutations: {
    authUser(state, userData) {
      state.token = userData.token
      state.user.id = userData.id
      state.user.name = userData.name
      state.user.email = userData.email
      state.user.roleId = userData.roleId
    },

    clearAuthData(state) {
      state.token = null
      state.user.id = null
      state.user.name = null
      state.user.email = null
      state.user.roleId = null
    },
  },
  actions: {
    login({ commit, state }, authData) {
      return axios
        .post(process.env.VUE_APP_API_URL + '/login', {
          email: authData.email,
          password: authData.password,
        })
        .then(res => {
          let response = res.data.data
          if (res.data.responseType === 'success') {
            localStorage.setItem('token', response.jwt)
            commit('authUser', {
              token: response.jwt,
              roleId: response.roleId,
            })
            if (state.user.roleId === 'Admin') router.replace('/admin/users')

            if (state.user.roleId === 'Staff')
              router.replace('/staff/restaurant')
          }
          return res.data
        })
        .catch(error => {
          console.log(error)
        })
    },

    logout({ commit }) {
      commit('clearAuthData')
      commit('clearMenus')
      commit('clearUsers')
      commit('clearRestaurants')
      localStorage.removeItem('token')
      router.replace('/login')
      delete axios.defaults.headers.common['Authorization']
    },

    tryAutoLogin({ commit }) {
      const token = localStorage.getItem('token')
      if (!token) {
        return
      }

      axios
        .get(process.env.VUE_APP_API_URL + '/user')
        .then(res => {
          let response = res.data.data
          commit('authUser', {
            token: token,
            id: response.id,
            name: response.name,
            email: response.email,
            roleId: response.roleId,
          })
        })
        .catch(error => console.log(error))
    },
  },
  getters: {
    user(state) {
      return state.user
    },
    roleId(state) {
      return state.user.roleId
    },
    isAuthenticated(state) {
      return state.token !== null
    },
  },
  modules: {
    menusStore,
    usersStore,
    restaurantsStore,
    ordersStore,
  },
})
