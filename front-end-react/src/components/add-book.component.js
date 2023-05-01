import React, { Component } from "react";
import BookDataService from "../services/book.service";

export default class AddBook extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.saveBook = this.saveBook.bind(this);
    this.newBook = this.newBook.bind(this);

    this.state = {
      id: null,
      title: "",
      description: "", 
      published: false,

      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    });
  }

  saveBook() {
    var data = {
      title: this.state.title,
      description: this.state.description
    };

    BookDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          description: response.data.description,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newBook() {
    this.setState({
      id: null,
      title: "",
      description: "",
      published: false,

      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        <img src="https://media1.giphy.com/media/xiE902jeKqe4libpvF/giphy.gif?cid=ecf05e47c74sa8p0fud4huxc64x758arjt1jw01ua4lnj3qg&rid=giphy.gif&ct=g" />
        {this.state.submitted ? (
          <div>
            <h4>A new book was created!</h4>
            <img src="https://media3.giphy.com/media/VcizxCUIgaKpa/giphy.gif?cid=ecf05e471ir6b126bzufglb0yujn0mjk11a23ataihbbdaso&rid=giphy.gif&ct=g" />
            <button className="btn btn-success" onClick={this.newBook}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                required
                value={this.state.title}
                onChange={this.onChangeTitle}
                name="title"
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                required
                value={this.state.description}
                onChange={this.onChangeDescription}
                name="description"
              />
            </div>

            <button onClick={this.saveBook} className="btn btn-success">
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}
