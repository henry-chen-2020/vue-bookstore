<template>
  <tr class="row">
    <th class="cell">Name</th>
    <th class="cell">Author</th>
    <th class="cell">ISBN</th>
    <th class="cell">Genre</th>
    <th class="cell">Action</th>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "bookHead"
})
</script>

<style scoped>
div.row {
  width: 100%
}
span.cell {
  margin: 0px;
  padding: 0px
}
</style>