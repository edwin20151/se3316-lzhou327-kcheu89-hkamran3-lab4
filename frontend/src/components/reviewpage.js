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
    <Link to={'/addreivew/'+props.exercise.name}> add review </Link> |
      <a
        href="#"
        onClick={() => {
          props.exerciseList(props.exercise.name);
        }}
      >
        expand
      </a>
    </td>
  </tr>
);

export default class ReviewPage extends Component {
  constructor(props) {
    super(props);

    this.expandList = this.expandList.bind(this);

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


expandList(name) {
  axios.post("http://localhost:5500/list/public/" + name).then((res) => {
    console.log(res.data);
    const l = document.getElementById("list");
    res.data.forEach((e) => {
      const item = document.createElement("li");
      item.appendChild(document.createTextNode(` name: ${e.tracks} , review: ${e.reviews}`));
      l.appendChild(item);
      var but = document.createElement('button');
        but.innerHTML = 'YouTube';
        but.style.fontWeight = 'bold';
        but.style.backgroundColor = 'red'
        but.style.color = 'white';
        but.style.height = '4vh'
        but.style.width = '8vh'
        item.appendChild(but)
        l.appendChild(item);
        var but = document.createElement("button");
        but.innerHTML = "YouTube";
        but.style.fontWeight = "bold";
        but.style.backgroundColor = "red";
        but.style.color = "white";
        but.style.height = "4vh";
        but.style.width = "8vh";
        item.appendChild(but);
        l.appendChild(item);
        but.addEventListener("click", youtube);

        function youtube() {
          res.data.forEach((e) => {
            var but = document.getElementById("but");
            but.onclick = window.open(
              "https://www.youtube.com/results?search_query=" + e.tracks
            );
          });
        }
      });
    });
  }

  exerciseList() {
    return this.state.lists.map((currentlist) => {
      return (
        <Exercise
          exercise={currentlist}
          exerciseList={this.expandList}
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
      </div>
    );
  }
}
