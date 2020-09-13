<template>
  <div class="home">
    <BookList v-bind:books="books" 
      v-on:refresh="refresh" v-on:delete-all="deleteAll" />
  </div>
</template>

<script>
// @ is an alias to /src
// import axios from 'axios'
import uuid from 'uuid'
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

export default {
  name: 'App',
  components: {
    BookList
  },
  methods: {
    refresh() {
      console.log("refersh");
      this.books = BOOKS;
      this.fetchBooks();
    },
    deleteAll() {
      console.log("delete all");
      this.books = [];
    },
    addBook(payload) {
      if (payload.ID) {
        console.log('#home, update a book', payload);
        const idx = this.books.findIndex(book => book.ID == payload.ID);
        this.books[idx] = Object.assign(this.books[idx], payload);
      } else {
        console.log("#home: add a book", payload);
        payload.ID = uuid();
        this.books = [...this.books, payload];
      }
      console.log('books: ' + this.books.length);
    },
    deleteBook(id) {
      console.log('delete a book', id);
      this.books = this.books.filter(book => book.ID != id);
    },
    fetchBooks() {
    // axios.get('http://localhost:51946/books')
    // axios.get('http://10.24.123.250:51946/books')
    // .then(resp => this.books = resp.data)
    // .catch(err => console.log('=====> fetch error', err));

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
div.home {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: left; */
  color: #2c3e50;
  margin-top: 60px;
}
button {
  margin: 10px;
  border-radius: 7px;
}
</style>