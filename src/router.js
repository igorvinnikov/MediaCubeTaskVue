import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Employees from '@/components/Employees/Employees'
import Departments from '@/components/Departments/Departments'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      name: 'home',
      component: Home
    },
    {
      path: '/employees',
      name: 'Employees',
      component: Employees
    },
    {
      path: '/departments',
      name: 'Departments',
      component: Departments
    }
  ]
})
