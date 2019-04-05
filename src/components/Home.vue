<template>
  <div>
    <v-container fluid>
      <v-layout row>
        <v-flex xs-12>
            <v-data-table
              :headers="headers"
              :items="employees"
              :search="search"
              hide-actions
              :pagination.sync="pagination"
              class="elevation-1"
            >
              <template v-slot:items="props">
                <td>{{ props.item.name }}</td>
                <td class="text-xs-right">{{ props.item }}</td>
              </template>
            </v-data-table>
            <div class="text-xs-center pt-2">
              <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
            </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
}
</script>

<style scoped></style>
