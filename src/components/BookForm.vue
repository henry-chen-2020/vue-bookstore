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
      <button v-on:click="addBook">{{ this.state }}</button>
      <button v-on:click="cancelUpdate" v-if="state == 'Update'">Cancel</button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { updateBus } from '../main'
export default Vue.extend({
  name: "bookForm",
  data() {
    return {
      name: {
        value: '',
        error: false
      },
      author: {
        value: '',
        error: false
      },
      isbn: {
        value: '',
        error: false
      },
      genre: {
        value: '',
        error: false
      },
      state: 'Add',
      bookID: undefined
    }
  },
  methods: {
    addBook(evt) {
      console.log(evt);
      // validateion
      const keys = Object.keys(this._data).filter(key => typeof this[key] == 'object');
      keys.forEach(key => this[key].error = (this[key].value == '') );
      const error = keys.some(key => this[key].error);
      // error handling
      if (!error) {
        const record = {
          Name: this.name.value,
          Author: this.author.value,
          ISBN: this.isbn.value,
          Genre: this.genre.value
        }
        const payload = this.state == 'Update' ? {...record, ID: this.bookID} : record;
        updateBus.$emit('add-a-book', payload);
        this.updateData('Add', undefined)
      }
    },
    cancelUpdate() {
      this.updateData('Add', undefined);
      updateBus.$emit('cancel-update', this.bookID);
    },
    updateData(action, theBook) {
      this.state = action;
      if (theBook) {
        this.bookID = theBook.ID;
        this.name.value = theBook.Name;
        this.author.value = theBook.Author;
        this.isbn.value = theBook.ISBN;
        this.genre.value = theBook.Genre;
      } else {
        this.name.value = '';
        this.author.value = '';
        this.isbn.value = '';
        this.genre.value = '';
      }
      this.name.error = false;
      this.author.error = false;
      this.isbn.error = false;
      this.genre.error = false;
    }
  },
  created() {
    updateBus.$on('update-book', (book) => this.updateData('Update', book));
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