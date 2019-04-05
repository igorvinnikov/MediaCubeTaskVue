import axios from 'axios'

export default {
  state: {
    employees: []
  },
  mutations: {
    setEmployees (state, payload) {
      state.employees = payload.data
    },
    employeeUpdate (state, payload) {
      const employee = state.employees.find(emp => {
        return emp.id === payload.data.id
      })
      employee.firstName = payload.data.firstName
      employee.lastName = payload.data.lastName
      employee.patronymic = payload.data.patronymic
      employee.gender = payload.data.gender
      employee.salary = payload.data.salary
      employee.departments = payload.data.departments
    }
  },
  actions: {
    async getEmployees ({ commit }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        axios.defaults.baseURL = 'http://mediacube.test/api'
        const employees = await axios.get('/employees')
        console.log(employees)
        commit('setEmployees', employees)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    },
    async updateEmployee ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        axios.defaults.baseURL = 'http://mediacube.test/api'
        const employee = await axios.patch(`/employee/update/${payload.id}`, payload)
        console.log(employee)
        commit('employeeUpdate', employee)
        commit('setLoading', false)
      } catch (error) {
        commit('setError', error.message)
        commit('setLoading', false)
        throw error
      }
    }
  },
  getters: {
    employees (state) {
      return state.employees
    }
  }
}
