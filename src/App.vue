<template>
  <div id="app">
    <Header />
    <BookList v-bind:books="books" 
      v-on:add-a-book="addBook" v-on:refresh="refresh" 
      v-on:del-a-book="delBook" v-on:delete-all="deleteAll" />
  </div>
</template>

<script>
import axios from 'axios'
import uuid from 'uuid'
import Header from './components/Header'
import BookList from './components/BookList'
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
      }];

export default {
  name: 'App',
  components: {
    Header,
    BookList
  },
  methods: {
    refresh() {
      console.log("refersh");
      this.books = BOOKS;
    },
    deleteAll() {
      console.log("delete all");
      this.books = [];
    },
    addBook(payload) {
      payload.ID = uuid();
      console.log("#app: add a book", payload);
      this.books = [...this.books, payload];
      console.log('books: ' + this.books.length);
    },
    delBook(id) {
      console.log('delete a book', id);
      this.books = this.books.filter(book => book.ID != id);
    }
  },
  data() {
    return {
      books:[]
    }
  },
  created() {
    this.books = BOOKS;
    // axios.get('http://localhost:51946/books')
    axios.get('http://10.24.123.250:51946/books')
    // .then(resp => this.books = resp.data)
    // .catch(err => console.log('=====> fetch error', err));
  }
}
</script>

<style>
#app {
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
