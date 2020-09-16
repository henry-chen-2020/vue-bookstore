<template>
  <div class="home">
    <BookList v-bind:books="books" v-on:refresh="refresh" v-on:delete-all="deleteAll" />
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { updateBus } from '../main'
import BookList from '../components/BookList'
const BOOKS = [{
        ID: 1,
        Name: "Wow Factor",
        Author: "Ada",
        ISBN: "34572075",
        Genre: "fantasy"
      }, {
        ID: 2,
        Name: "New Yorker",
        Author: "famous",
        ISBN: "unkonwn",
        Genre: "fiction"
      }, {
        ID: 3,
        Name: "The Sky",
        Author: "Anonymous",
        ISBN: "123456789",
        Genre: "sci-fi"
      }];
const REST = 'http://localhost:53878';

export default {
  name: 'home',
  components: {
    BookList
  },
  methods: {
    refresh() {
      console.log("#home: refersh");
      this.books = BOOKS;
      this.fetchBooks();
    },
    deleteAll() {
      console.log("#home: delete all");
      axios.delete(`${REST}/books`)
      .then(() => this.books = [])
      .catch(err => console.log(err));
    },
    addBook(payload) {
      if (payload.ID) {
        console.log('#home: update a book', payload);
        const idx = this.books.findIndex(book => book.ID == payload.ID);
        axios.put(`${REST}/book/${payload.ID}`, payload)
        .then(() => this.books[idx] = Object.assign(this.books[idx], payload))
        .catch(err => console.log(err));
      } else {
        console.log("#home: add a book", payload);
        axios.post(`${REST}/books`, payload)
          .then(resp => this.books = [...this.books, resp])
          .catch(err => console.log(err));
      }
      console.log('books: ' + this.books.length);
    },
    deleteBook(id) {
      console.log('#home: delete a book', id);
      axios.delete(`${REST}/book/${id}`)
      .then(() => this.books = this.books.filter(book => book.ID != id))
      .catch(err => console.log(err));
    },
    fetchBooks() {
      axios.get(`${REST}/books`)
      .then(resp => this.books = resp.data)
      .catch(err => console.log('=====> fetch error', err));
    }
  },
  data() {
    return {
      books:[]
    }
  },
  created() {
    this.books = BOOKS;
    this.fetchBooks();
    updateBus.$on('add-a-book', (payload) => this.addBook(payload));
    updateBus.$on('delete-book', (bookID) => this.deleteBook(bookID));
  }
}
</script>

<style>
button {
  margin: 10px;
  border-radius: 7px;
}
</style>
