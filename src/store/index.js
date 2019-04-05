import Vue from 'vue'
import Vuex from 'vuex'
import employees from './employees'
import departments from './departments'
import common from './common'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    employees, departments, common
  }
})
