<template>
  <div v-if="!loading">
    <v-container fluid>
      <v-layout row>
        <v-flex xs-12>
          <v-data-table
            :headers="headers"
            :items="allDepartments"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
            class="elevation-1"
          >
            <template v-slot:items="props">
              <td>{{ props.item.name }}</td>
              <td class="text-xs-center">{{ props.item.employeesCount }}</td>
              <td class="text-xs-center">{{ props.item.maxSalary.salary }}</td>
              <td class="text-xs-center">
                <app-edit-dep-modal :department="props.item"></app-edit-dep-modal>
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
import EditDepModal from './EditDepModal'

export default {
  components: {
    appEditDepModal: EditDepModal
  },
  data () {
    return {
      search: '',
      pagination: {},
      selected: [],
      headers: [
        {
          text: 'Departments',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        {
          text: 'Employees count',
          align: 'center',
          sortable: false,
          value: 'employeesCount'
        },
        {
          text: 'Max Salary',
          align: 'center',
          value: 'maxSalary.salary'
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
