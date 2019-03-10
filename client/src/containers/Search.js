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
            image: book.volumeInfo.imageLinks && book.volumeInfo.imageLinks.thumbnail,
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
            {/*  end form section */}
            {/* begin book result section */}
            <div className="col-12 col-sm-6 col-md-9">
              {!this.state.booksList.length ? (<h2 className="text-center">Search for a book</h2>) : (
                <React.Fragment>
                  <h3>Search Results for: {this.state.searchTerm}</h3>
                  <div className="row">
                    {this.state.booksList.map(book => {
                      return (
                        <div className="col-12 col-md-6" key={book.bookId}>
                          <div className="card">
                          <img src={book.image} alt={book.title} className="card-img-top mx-auto" />
                          <div className="card-body">
                            <h5 className="card-title">{book.title}</h5>
                            <p className="card-text">Released: {book.date}</p>
                            {book.authors && <p className="card-text">By: {book.authors.join(", ")}</p> }
                            <p className="card-text"><strong>Description</strong>: {book.description}</p>

                            
                              <a href={book.link} rel="noopener noreferrer" target="_blank" className="btn btn-success btn-sm">See more.</a>
                              <button onClick={() => this.saveBook(book.bookId)} className="btn btn-dark btn-sm">Save book.</button>
                            

                          </div>
                        </div>
                        </div>
                      );
                    })}
                  </div>
                </React.Fragment>
              )}
            </div>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

export default Search;