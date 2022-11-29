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
    <td>{props.exercise.userEmail}</td>
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
    <td>
      <button onClick={this.onDeleteList(props.exercise.name)}>Delete</button>
    </td>
  </tr>
);

export default class PreLogon extends Component {
  constructor(props) {
    super(props);

    this.expandList = this.expandList.bind(this);

    this.state = { lists: [], userEmail: "" };
  }

  componentDidMount() {
    this.setUserEmail();
    axios
      .get("http://localhost:5500/list/private/" + this.state.userEmail)
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
        item.appendChild(document.createTextNode(` name: ${e.tracks}`));
        l.appendChild(item);
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

  setUserEmail() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      this.setState({ userEmail: user.email });
    } else {
      console.log("User Login Error");
    }
  }

  onDeleteList(name) {
    axios
      .delete("http://localhost:5500/list/" + name)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <h3>Private Playlist</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>name</th>
              <th>creator</th>
              <th>modifiedDate</th>
              <th>playtime</th>
              <th>tracksNum</th>
              <th>rating</th>
              <th> userEmail</th>
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>

        <ol id="list"></ol>
      </div>
    );
  }
}
