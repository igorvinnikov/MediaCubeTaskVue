<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning mr-3" flat slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary"> Edit Employee</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="first_name"
                  label="First Name"
                  type="text"
                  v-model="editedFirstName"
                  :rules="[v => !!v || 'First name is required']"
                ></v-text-field>
                <v-text-field
                  name="last_name"
                  label="Last Name"
                  type="text"
                  v-model="editedLastName"
                  :rules="[v => !!v || 'Last name is required']"
                ></v-text-field>
                <v-text-field
                  name="patronymic"
                  label="Patronymic"
                  type="text"
                  v-model="editedPatronymic"
                  :rules="[v => !!v]"
                ></v-text-field>
                <v-radio-group
                  name="gender"
                  v-model="editedGender"
                >
                  <v-radio label="Male" value="male"></v-radio>
                  <v-radio label="Female" value="female"></v-radio>
                </v-radio-group>
                <v-text-field
                  name="salary"
                  label="Salary"
                  type="text"
                  v-model="editedSalary"
                  :rules="[v => !!v]"
                ></v-text-field>
                <!--<v-select-->
                <!--v-model="selected"-->
                <!--:items="selectedDeps.name"-->
                <!--attach-->
                <!--chips-->
                <!--label="Departments"-->
                <!--multiple-->
                <!--&gt;</v-select>-->
                <v-checkbox
                  row
                  name="department_id"
                  v-for="department of selectedDeps"
                  :key="department.id"
                  v-model="selected"
                  :label="department.name"
                  :value="department.id"
                  :rules="selectedRules"
                  :checked="true"
                ></v-checkbox>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="onCancel">Cancel</v-btn>
              <v-btn class="success" flat @click="onSave" :disabled="!valid || loading">Update</v-btn>
            </v-card-actions>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: ['employee', 'department'],
  data () {
    return {
      valid: false,
      modal: false,
      editedFirstName: this.employee.firstName,
      editedLastName: this.employee.lastName,
      editedPatronymic: this.employee.patronymic,
      editedGender: this.employee.gender,
      editedSalary: this.employee.salary,
      selectedDeps: this.department,
      selected: [],
      selectedRules: [
        v => (!!v && v.length !== 0) || 'You must choose at least one department'
      ]
    }
  },
  methods: {
    onCancel () {
      this.editedFirstName = this.employee.firstName
      this.editedLastName = this.employee.lastName
      this.editedPatronymic = this.employee.patronymic
      this.editedGender = this.employee.gender
      this.editedSalary = this.employee.salary
      this.selectedDeps = this.department
      this.selected = []
      this.modal = false
    },
    onSave () {
      if (this.editedFirstName !== '' && this.editedLastName !== '' && this.selected !== []) {
        this.$store.dispatch('updateEmployee', {
          id: this.employee.id,
          first_name: this.editedFirstName,
          last_name: this.editedLastName,
          patronymic: this.editedPatronymic,
          gender: this.editedGender,
          salary: this.editedSalary,
          department_id: this.selected
        })
        this.modal = false
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>
