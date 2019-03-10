import React, { Component } from "react";
import API from "../utils/API";

class Search extends Component {
  state = {
    searchTerm: "",
    booksList: []
  }

  searchGoogleBooks = bookQuery => {
    API.searchGoogleBooks(bookQuery)
      .then(res => {
        // take res.data.items array and create new array with less information
        const booksList = res.data.items.map(book => {
          return {
            bookId: book.id,
            authors: book.volumeInfo.authors,
            title: book.volumeInfo.title,
            date: book.volumeInfo.publishedDate,
            description: book.volumeInfo.description,
            image: book.volumeInfo.imageLinks.thumbnail,
            link: book.volumeInfo.infoLink
          };
        });
        // set state to have new book list
        this.setState({ booksList });
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleInputChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (!this.state.searchTerm) {
      return false;
    }

    this.searchGoogleBooks(this.state.searchTerm);

  }

  saveBook = bookId => {
    // find book in this.state.bookList based on bookId value
    const bookPicked = this.state.booksList.find(book => book.bookId === bookId);

    API.saveBook(bookPicked)
      .then(res => {
        console.log(res.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    return (
      <React.Fragment>
        <div className="jumbotron jumbotron-fluid bg-dark text-white">
          <div className="container-fluid">
            <h1>Search for books here</h1>
          </div>
        </div>
        <div className="container-fluid">
          <div className="row">
            <div className="col-12 col-sm-6 col-md-3">
              <h3>Search for a Book</h3>
              <form onSubmit={this.handleFormSubmit}>
                <input
                  name="searchTerm"
                  onChange={this.handleInputChange}
                  placeholder="Enter book name here"
                  value={this.state.searchTerm}
                  type="input"
                  className="form-control mb-3"
                />
                <button
                  className="btn btn-block btn-success"
                  onClick={this.handleFormSubmit}
                >
                  Search for a book
              </button>
              </form>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Search;