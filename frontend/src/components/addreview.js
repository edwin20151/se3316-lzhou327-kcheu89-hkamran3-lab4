import React, { Component } from "react";
import axios from "axios";

export default class Addreivew extends Component {
  constructor(props) {
    super(props);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      review: "",
      rating: 0,
    };
  }

  getUser() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      return user;
    } else {
      console.log("Get username Error");
    }
  }

  onChangeReview(e) {
    this.setState({
      review: e.target.value,
    });
  }
  onChangeRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    document.getElementById("list").innerText = "";
    if (this.state.review === "" || this.state.rating === "") {
      document.getElementById("list").innerText = "Missing field(s)";
      return;
    }
    if (
      this.state.rating !== "" &&
      (this.state.rating > 5 || this.state.rating < 0)
    ) {
      document.getElementById("list").innerText = "Incorrect Rating";
      return;
    }
    const list = {
      listName: this.props.match.params.name,
      message: this.state.review,
      rating: this.state.rating,
      userName: this.getUser().username,
      userEmail: this.getUser().email,
    };

    axios
      .post("http://localhost:5500/reviews/", list)
      .then((res) => {
        console.log(res, "saved successfully");

        window.location = "/";
      })
      .catch((err) => {
        console.log(err);

        document.getElementById("list").innerText = err.response.data.message;
      });
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Add review </h1>
          <p>You can only create 1 review for each playlist.</p>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" className="login">
              <input
                type="text"
                name="reviews"
                id="reviews-f"
                className="reviews-f-input"
                placeholder="reviews"
                value={this.state.review}
                onChange={this.onChangeReview}
              />
              <input
                type="text"
                name="rating"
                id="rating-f"
                className="rating-f-input"
                placeholder="0-5"
                value={this.state.rating}
                onChange={this.onChangeRating}
              />

              <div className="buttonContainer">
                <input
                  type="submit"
                  value="Add Review"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
          <ol id="list"></ol>
        </div>
      </div>
    );
  }
}
