import React, {Component} from "react";
import API from "../utils/API";


class SingleBook extends Component {
  state = {
    bookData: {}
  }

  componentDidMount() {
    const bookId = this.props.match.params.bookId;

    API.getBookById(bookId)
      .then(res => this.setState({bookData: res.data}))
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.props);
    return(
      <div>
        {Object.keys(this.state.bookData).length && JSON.stringify(this.state.bookData, null, 2)}
      </div>
    )
  }
}

export default SingleBook;