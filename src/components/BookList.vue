<template>
  <div>
    <div class="tools">
      <button v-on:click="$emit('refresh')">Refresh</button>
      <button v-on:click="$emit('delete-all')">Delete All</button>     
    </div>
    <table>
      <thead><BookHead /></thead>
      <tbody v-bind:key="book.ID" v-for="book in books">
        <BookItem v-bind:book="book"
          v-on:delete-book="$emit('delete-book', book.ID)" />
      </tbody>
      <tfoot>
        <tr>
          <td colspan="5">
            <hr />
            {{state}} a book:
          </td>
        </tr>
        <BookForm v-on:add-a-book="$emit('add-a-book', $event)" />
      </tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { updateBus } from '../main'
import BookHead from './BookHead.vue'
import BookItem from './BookItem.vue'
import BookForm from './BookForm.vue'
export default Vue.extend({
  name: 'bookList',
  components: {
    BookHead,
    BookItem,
    BookForm
  },
  props: ['books'],
  data() {
    return {
      state: 'Add'
    }
  },
  created() {
    updateBus.$on('update-book', () => this.state = 'Update' );
    updateBus.$on('cancel-update', () => this.state = 'Add' );
  }
})
</script>

<style scoped>
table {
  padding: 10px;
  border: true;
  border-spacing: 10px;
}
tbody {
  text-align: left;
}
div.tools {
  text-align: left;
}
</style>