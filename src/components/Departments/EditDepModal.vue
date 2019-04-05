<template>
  <v-dialog width="400px" v-model="modal">
    <v-btn class="warning mr-3" flat slot="activator">Edit</v-btn>
    <v-card>
      <v-container>
        <v-layout row>
          <v-flex xs12>
            <v-card-title>
              <h1 class="text--primary"> Edit Department</h1>
            </v-card-title>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row>
          <v-flex xs12>
            <v-card-text>
              <v-form v-model="valid" ref="form" lazy-validation>
                <v-text-field
                  name="name"
                  label="Department Name"
                  type="text"
                  v-model="editedName"
                  :rules="[v => !!v || 'Department name is required']"
                ></v-text-field>
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
  props: ['department'],
  data () {
    return {
      valid: false,
      modal: false,
      editedName: this.department.name
    }
  },
  methods: {
    onCancel () {
      this.editedName = this.department.name
      this.modal = false
    },
    onSave () {
      if (this.$refs.form.validate()) {
        if (this.editedFirstName !== '' && this.editedLastName !== '' && this.selected !== []) {
          this.$store.dispatch('updateAd', {
            title: this.editedTitle,
            description: this.editedDescription,
            id: this.ad.id
          })
          this.modal = false
        }
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
