import axios from '../axios-auth'

const state = {
  users: [
    {
      id: null,
      name: null,
      email: null,
      role_id: null,
    },
  ],
}

const mutations = {
  getUsers(state, payload) {
    state.users = payload
  },
  deleteUser(state, id) {
    const index = state.users.findIndex(user => user.id === id)
    state.users.splice(index, 1)
  },
  clearUsers(state) {
    state.users = null
  },
  addUser(state, payload) {
    state.users.push(payload)
  },
}

const actions = {
  getUsers({ commit }) {
    axios
      .get(process.env.VUE_APP_API_URL + '/admin/users')
      .then(res => {
        console.log(res)
        let users = []
        let response = res.data.data
        response.forEach(user => {
          const temp = {
            id: user.id,
            name: user.name,
            email: user.email,
            role_id: user.role_id,
          }
          users.push(temp)
        })
        commit('getUsers', users)
      })
      .catch(error => console.log(error))
  },

  addUser({ commit }, payload) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/admin/user', payload)
      .then(res => {
        console.log(res)
        let response = res.data.data
        if (res.data.responseType === 'success') {
          const user = {
            id: response.id,
            name: response.name,
            email: response.email,
            role_id: response.role_id,
          }
          commit('addUser', user)
        }
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  editUser({ commit }, payload) {
    return axios
      .post(
        process.env.VUE_APP_API_URL + '/admin/user/' + payload.id,
        payload.data
      )
      .then(res => {
        if (res.data.responseType === 'success') this.dispatch('getUsers')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  deleteUser({ commit }, id) {
    return axios
      .delete(process.env.VUE_APP_API_URL + '/admin/user/' + id)
      .then(res => {
        console.log(res)
        if (res.data.responseType === 'success') {
          commit('deleteUser', id)
        }
        return res.data
      })
  },
}

const getters = {
  users(state) {
    return state.users
  },
  getUserById: state => id => {
    return state.users.find(user => user.id === id)
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
