<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs-12>
          <v-data-table
            :headers="headers"
            :items="allEmployees"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.fullName }}</td>
              <td class="text-xs-center">{{ props.item.gender }}</td>
              <td class="text-xs-center">{{ props.item.salary }}</td>
              <td class="text-xs-center">{{ props.item.depNames }}</td>
              <td class="text-xs-center">
                <app-edit-modal :employee="props.item" :department="allDepartments"></app-edit-modal>
                <v-btn flat class="error">Delete</v-btn>
              </td>
            </template>
          </v-data-table>
          <div class="text-xs-center pt-2">
            <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
  <div v-else>
    <v-container>
      <v-layout row>
        <v-flex xs-12 class="text-xs-center pt-5">
          <v-progress-circular
            indeterminate
            :size="100"
            :width="4"
            color="blue"
          ></v-progress-circular>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import EditModal from './EditModal'

export default {
  components: {
    appEditModal: EditModal
  },
  created () {
    this.$store.dispatch('getEmployees')
  },
  data () {
    return {
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'Employees',
          align: 'left',
          sortable: false,
          value: 'fullName'
        },
        {
          text: 'Gender',
          align: 'center',
          sortable: false,
          value: 'gender'
        },
        {
          text: 'Salary',
          align: 'center',
          value: 'salary'
        },
        {
          text: 'Departments',
          align: 'center',
          sortable: false,
          value: 'departments'
        },
        {
          text: 'Actions',
          align: 'center',
          sortable: false,
          value: ''
        }
      ]
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
          this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    allEmployees () {
      return this.$store.getters.employees
    },
    allDepartments () {
      return this.$store.getters.departments
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped></style>
