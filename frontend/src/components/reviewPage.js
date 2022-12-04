import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.name}</td>
    <td>{props.exercise.creator}</td>
    <td>{props.exercise.modifiedDate}</td>
    <td>{props.exercise.playtime}</td>
    <td>{props.exercise.tracksNum}</td>
    <td>{props.exercise.rating}</td>
    <td>
      <Link to={"/addreivew/" + props.exercise.name}> add review </Link> |
      <a
        href="#"
        onClick={() => {
          props.exerciseList(props.exercise.name);
        }}
      >
        View review
      </a>
    </td>
  </tr>
);

export default class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.viewReview = this.viewReview.bind(this);

    this.state = { lists: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5500/list/public/")
      .then((response) => {
        this.setState({ lists: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  viewReview(name) {
    axios
      .get("http://localhost:5500/reviews/" + name)
      .then((res) => {
        const l = document.getElementById("list");
        l.innerText = "";
        if (res.data.length === 0) {
          l.appendChild(document.createTextNode(`No review for ${name} yet`));
        } else {
          l.appendChild(document.createTextNode(`Reviews of ${name}:\n`));

          res.data.forEach((e) => {
            const item = document.createElement("li");
            item.appendChild(document.createTextNode(`${e.message}\n`));
            l.appendChild(item);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  exerciseList() {
    return this.state.lists.map((currentlist) => {
      return (
        <Exercise
          exercise={currentlist}
          exerciseList={this.viewReview}
          key={currentlist.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Public Playlist</h1>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>name</th>
              <th>creator</th>
              <th>modifiedDate</th>
              <th>playtime</th>
              <th>tracksNum</th>
              <th>rating</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>
        <ol id="list"></ol>
      </div>
    );
  }
}
