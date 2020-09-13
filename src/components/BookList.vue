<template>
  <div>
    <div>
      <button v-on:click="$emit('refresh')">Refresh</button>
      <button v-on:click="$emit('delete-all')">Delete All</button>     
    </div>
    <table>
      <thead><BookHead /></thead>
      <tbody v-bind:key="book.ID" v-for="book in books">
        <BookItem v-bind:book="book" v-on:del-a-book="$emit('del-a-book', book.ID)" />
      </tbody>
      <tr>
        <td colspan="5">
          <hr />
          Add a book:
        </td>
      </tr>
      <tfoot><BookForm v-on:add-a-book="$emit('add-a-book', $event)"/></tfoot>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
  props: ['books']
})
</script>

<style scoped>
table {
  padding: 10px;
  border: true;
  border-spacing: 10px;
}
</style>