import React, { Component } from "react";

import axios from "axios";

const Exercise = (props) => (
  <tr>
    <td>{props.exercise.name}</td>
    <td>{props.exercise.creator}</td>
    <td>{props.exercise.modifiedDate}</td>
    <td>{props.exercise.playtime}</td>
    <td>{props.exercise.tracksNum}</td>
    <td>{props.exercise.avgRating}</td>
    <td>
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

export default class PreLogon extends Component {
  constructor(props) {
    super(props);
    // this.getAvgRating = this.getAvgRating.bind(this);
    this.expandList = this.expandList.bind(this);

    this.state = { lists: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5500/list/public/")
      .then((response) => {
        response.data.forEach((e) => {
          this.getAvgRating(e.name);
        });
        this.setState({ lists: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  getAvgRating(name) {
    axios
      .get("http://localhost:5500/reviews/" + name)
      .then((response) => {
        let ratings = [];
        response.data.forEach((e) => {
          ratings.push(e.rating);
        });
        return (
          Math.round(
            (ratings.reduce((a, b) => a + b, 0) / ratings.length) * 100
          ) / 100
        );
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
        item.appendChild(
          document.createTextNode(` name: ${e.tracks} , review: ${e.reviews}`)
        );
        l.appendChild(item);
        for (let i = 0; i < e.tracksNum; i++) {
          var but = document.createElement("button");
          but.innerHTML = "YouTube";
          but.style.fontWeight = "bold";
          but.style.backgroundColor = "red";
          but.style.color = "white";
          but.style.height = "4vh";
          but.style.width = "8vh";
          item.appendChild(but);
          l.appendChild(item);

          but.addEventListener("click", () => {
            res.data.forEach((e) => {
              window.open(
                "https://www.youtube.com/results?search_query=" + e.tracks[i]
              );
            });
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
        <h2>Lab4 Music Web</h2>
        <div className="App">
          <p>
            Our Website is here to help users experience the best possible
            musical experience in the most organized manner. We allow you to
            access artists, albums, tracks and genres as well as being able to
            create a custom list of tracks. Our goal is for the user to be able
            to do whatever function they want when it pertains to music, whether
            thats giving their opinions or saving their favourite songs. We are
            here to stay and we hope you join us in the journey.
          </p>
          <br />
        </div>
        <h3>Public Playlist</h3>
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
        <div>
          <button
            onClick={() => {
              document.getElementById("list").innerText = "";
            }}
          >
            {" "}
            clear
          </button>
        </div>
        <ol id="list"></ol>
      </div>
    );
  }
}
