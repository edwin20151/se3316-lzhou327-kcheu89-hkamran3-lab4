import React, { Component } from "react";
import axios from "axios";

export default class Addreivew extends Component {
  constructor(props) {
    super(props);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onChangeRating = this.onChangeRating.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      reviews: "",
      rating: 0,
    };
  }

  onChangeReview(e) {
    this.setState({
      reviews: e.target.value,
    });
  }
  onChangeRating(e) {
    this.setState({
      rating: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    const list = {
      reviews: this.state.reviews,
      rating: this.state.rating,
    };

    axios
      .post(
        "http://localhost:5500/list/review/" + this.props.match.params.name,
        list
      )
      .then((res) => {
        console.log("saved successfully");

        window.location = "/";
      });
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Add review </h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" class="login">
              <input
                type="text"
                name="reviews"
                id="reviews-f"
                class="reviews-f-input"
                placeholder="reviews"
                value={this.state.reviews}
                onChange={this.onChangeReview}
              />
              <input
                type="text"
                name="rating"
                id="rating-f"
                class="rating-f-input"
                placeholder="0-5"
                value={this.state.rating}
                onChange={this.onChangeRating}
              />

              <div class="buttonContainer">
                <input
                  type="submit"
                  value="Add Review"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
