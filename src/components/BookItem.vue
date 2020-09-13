<template>
  <tr v-bind:class="{'edit':updating}">
    <td class="cell">{{book.Name}}</td>
    <td class="cell">{{book.Author}}</td>
    <td class="cell">{{book.ISBN}}</td>
    <td class="cell">{{book.Genre}}</td>
    <td class="action">
      <button v-on:click="updateBook" v-bind:disabled="updating">Update</button>
      <button v-on:click="$emit('delete-book', book.ID)" v-bind:disabled="updating">Delete</button>
    </td>
  </tr>
</template>

<script lang="ts">
import Vue from 'vue'
import { updateBus } from '../main'
export default Vue.extend({
  name: "bookItem",
  props: ["book"],
  data() {
    return {
      updating: false
    }
  },
  methods: {
    updateBook() {
      this.updating = true;
      updateBus.$emit('update-book', this.book);
    }
  },
  created() {
    updateBus.$on('cancel-update', (bookID) => {
      if (this.book.ID == bookID) {
        this.updating = false;
      }
    });
    updateBus.$on('add-a-book', (payload) => {
      if (this.book.ID == payload.ID) {
        this.updating = false;
      }
    });
  }
})
</script>

<style scoped>
.edit {
  font-weight: bold;
}
td.action {
  text-align: center;
}
</style>