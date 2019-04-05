import axios from 'axios'

export default {
  state: {
    departments: []
  },
  mutations: {
    setDepartments (state, payload) {
      state.departments = payload.data
    }
  },
  actions: {
    async getDepartments ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        axios.defaults.baseURL = 'http://mediacube.test/api'
        const departments = await axios.get('/departments')
        commit('setDepartments', departments)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    departments (state) {
      return state.departments
    }
  }
}
