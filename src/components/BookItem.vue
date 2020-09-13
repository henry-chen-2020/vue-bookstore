<template>
  <tr class="row">
    <td class="cell">{{book.Name}}</td>
    <td class="cell">{{book.Author}}</td>
    <td class="cell">{{book.ISBN}}</td>
    <td class="cell">{{book.Genre}}</td>
    <td class="action">
      <button type="submit" disabled>Edit</button>
      <button type="submit" disabled>Delete</button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "bookItem",
  props: ["book"]
})
</script>

<style scoped>
.row {
  width: 100%
}
td.action {
  text-align: center;
}
</style>