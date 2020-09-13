<template>
  <tr class="row">
    <td class="cell" >
      <input type="text" v-model="name.value" placeholder="Name" v-bind:class="{'error':name.error}">
    </td>
    <td class="cell">
      <input type="text" v-model="author.value" placeholder="Author" v-bind:class="{'error':author.error}">
    </td>
    <td class="cell">
      <input type="text" v-model="isbn.value" placeholder="ISBN" v-bind:class="{'error':isbn.error}">
    </td>
    <td class="cell">
      <input type="text" v-model="genre.value" placeholder="Genre" v-bind:class="{'error':genre.error}">
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
      name: {
        value: undefined,
        error: false
      },
      author: {
        value: undefined,
        error: false
      },
      isbn: {
        value: undefined,
        error: false
      },
      genre: {
        value: undefined,
        error: false
    }
    }
  },
  methods: {
    addBook(evt) {
      console.log(evt);
      const keys = Object.keys(this._data);
      keys.forEach(key => this[key].error = (this[key].value == undefined) );
      const error = keys.some(key => this[key].error);
      if (!error) {
        const payload = {
          Name: this.name.value,
          Author: this.author.value,
          ISBN: this.isbn.value,
          Genre: this.genre.value
        }
        this.$emit('add-a-book', payload);
        keys.forEach(key => this[key].value = undefined);
      }
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
input.error {
  border-color: red;
}
</style>