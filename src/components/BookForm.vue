<template>
  <tr class="row">
    <td class="cell">
      <input type="text" v-model="name" placeholder="Name">
    </td>
    <td class="cell">
      <input type="text" v-model="author" placeholder="Author">
    </td>
    <td class="cell">
      <input type="text" v-model="isbn" placeholder="ISBN">
    </td>
    <td class="cell">
      <input type="text" v-model="genre" placeholder="Genre">
    </td>
    <td class="action">
      <button v-on:click="addBook">Add a Book</button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: "bookForm",
  data() {
    return {
      name: undefined,
      author: undefined,
      isbn: undefined,
      genre: undefined
    }
  },
  methods: {
    addBook(evt) {
      console.log(evt);
      const payload = {
        Name: this.name,
        Author: this.author,
        ISBN: this.isbn,
        Genre: this.genre
      }
      this.$emit('add-a-book', payload);
    }
  }
})
</script>

<style scoped>
div.row {
  width: 100%
}
td.action {
  text-align: center;
}
</style>