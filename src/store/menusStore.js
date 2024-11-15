import axios from '../axios-auth'

const state = {
  menus: [
    {
      id: null,
      name: null,
      description: null,
      price: null,
      type: null,
      image: null,
      restaurantId: null,
    },
  ],
  menuTypes: [],
}

const mutations = {
  getMenus(state, payload) {
    state.menus = payload
  },
  getTypes(state, payload) {
    state.menuTypes = payload
  },
  deleteMenu(state, menu) {
    state.menus.splice(menu, 1)
  },
  clearMenus(state) {
    state.menus = null
    state.menuTypes = null
  },
}

const actions = {
  getMenus({ commit }) {
    axios
      .get(process.env.VUE_APP_API_URL + '/staff/menus')
      .then(res => {
        console.log(res)
        let menus = []
        let response = res.data.data.menus
        response.forEach(menu => {
          const temp = {
            id: menu.id,
            name: menu.name,
            description: menu.description,
            price: menu.price,
            type: menu.type,
            image: menu.image,
            restaurantId: menu.restaurantId,
          }
          menus.push(temp)
        })
        commit('getMenus', menus)
        commit('getTypes', res.data.data.types)
        // const distinct = (value, index, self) => {
        //     return self.indexOf(value) === index;
        // };
        // let type = [];
        // for (let i = 0; i < menus.length; i++) {
        //     type[i] = menus[i].type;
        // }
        // state.menuTypes = type.filter(distinct);
      })
      .catch(error => console.log(error))
  },

  addMenu({ commit }, payload) {
    return axios
      .post(process.env.VUE_APP_API_URL + '/staff/menu/create', payload)
      .then(res => {
        if (res.data.responseType === 'success') this.dispatch('getMenus')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  editMenu({ commit }, payload) {
    return axios
      .patch(
        process.env.VUE_APP_API_URL + '/staff/menu/' + payload.id,
        payload.data
      )
      .then(res => {
        if (res.data.responseType === 'success') this.dispatch('getMenus')
        return res.data
      })
      .catch(error => {
        console.log(error)
      })
  },

  deleteMenu({ commit }, id) {
    return axios
      .delete(process.env.VUE_APP_API_URL + '/staff/menu/' + id)
      .then(res => {
        console.log(res)
        commit('deleteMenu', id)
        this.dispatch('getMenus')
        return res.data
      })
  },
}

const getters = {
  menus(state) {
    return state.menus
  },
  getMenuById: state => id => {
    return state.menus.find(menu => menu.id === id)
  },
  menuTypes(state) {
    return state.menuTypes
  },
}

export default {
  state,
  mutations,
  actions,
  getters,
}
