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
    <td>
      <Link to={"/edit/" + props.exercise.name}>edit</Link> |
      <a
        href="#"
        onClick={() => {
          props.exerciseList(props.exercise.name);
        }}
      >
        expand
      </a>
      <br />
      <a
        href="#"
        onClick={() => {
          props.changeList(props.exercise.name);
        }}
      >
        delete
      </a>
    </td>
  </tr>
);

export default class PreLogon extends Component {
  constructor(props) {
    super(props);

    this.expandList = this.expandList.bind(this);
    this.deleteList = this.deleteList.bind(this);
    this.state = { lists: [] };
  }

  componentDidMount() {
    const email = this.getUserEmail();
    axios
      .get("http://localhost:5500/list/private/" + email)
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
        item.appendChild(
          document.createTextNode(
            ` name: ${e.tracks}      Description: ${e.description}`
          )
        );
        l.appendChild(item);
      });
    });
  }

  deleteList(name) {
    if (window.confirm("Confirm to delete this playlist?")) {
      axios.delete("http://localhost:5500/list/" + name).then((res) => {
        window.location.reload();
      });
    }
  }

  editList(name) {
    axios.patch("http://localhost:5500/list/" + name).then((res) => {
      console.log(res.data);
      const l = document.getElementById("list");
      res.data.forEach((e) => {
        const item = document.createElement("li");
        item.appendChild(
          document.createTextNode(
            ` name: ${e.tracks}      Description: ${e.description}`
          )
        );
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
          changeList={this.deleteList}
          key={currentlist.name}
        />
      );
    });
  }

  getUserNmae() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      return user.username;
    } else {
      console.log("Get username Error");
    }
  }

  getUserEmail() {
    const loggedInUser = localStorage.getItem("user");
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      return user.email;
    } else {
      console.log("Get email Error");
    }
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
            </tr>
          </thead>
          <tbody>{this.exerciseList()}</tbody>
        </table>

        <ol id="list"></ol>
      </div>
    );
  }
}
