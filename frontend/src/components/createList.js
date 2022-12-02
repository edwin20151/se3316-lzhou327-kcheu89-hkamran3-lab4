import React, { Component } from "react";
import axios from "axios";

export default class CreateList extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangetracks = this.onChangetracks.bind(this);
    this.onChangeplaytime = this.onChangeplaytime.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

    this.state = {
      name: "",
      playtime: "",
      tracksNum: "",
      tracks: "",
      isToggleOn: false,
      description: "",
    };
  }

  handleClick() {
    this.setState((state) => ({
      isToggleOn: !state.isToggleOn,
    }));
  }

  onChangedescription(e) {
    this.setState({
      description: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangetracks(e) {
    const track = e.target.value.split(",");
    this.setState({
      tracks: track,
      tracksNum: track.length,
    });
  }

  onChangeplaytime(e) {
    this.setState({
      playtime: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const list = {
      creator: this.getUserNmae(),
      userEmail: this.getUserEmail(),
      name: this.state.name,
      playtime: this.state.playtime,
      tracksNum: this.state.tracks.length,
      tracks: this.state.tracks,
      Public: this.state.isToggleOn,
      description: this.state.description,
    };
    document.getElementById("list").innerText = "";
    if (list.name === "") {
      document.getElementById("list").innerText = "Name is missing\n";
    }
    if (list.tracksNum == 0) {
      document.getElementById("list").innerText += "Tracks are missing\n";
    }
    if (list.name !== "" && list.tracksNum !== 0) {
      axios.post("http://localhost:5500/list", list).then((res) => {
        console.log("saved successfully");
        window.location = "/postlogon";
      });
    }
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
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Create List </h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" class="login">
              <input
                type="text"
                name="name"
                id="name-f"
                class="name-f-input"
                placeholder="name"
                value={this.state.name}
                onChange={this.onChangeName}
              />
              <input
                type="text"
                name="tracks"
                id="tracks-f"
                class="tracks-f-input"
                placeholder="tracks"
                value={this.state.tracks}
                onChange={this.onChangetracks}
              />
              <input
                type="text"
                name="playtime"
                id="playtime-f"
                class="playtime-f-input"
                placeholder="playtime"
                value={this.state.playtime}
                onChange={this.onChangeplaytime}
              />

              <input
                type="text"
                name="description"
                id="description-f"
                class="description-f-input"
                placeholder="description"
                value={this.state.description}
                onChange={this.onChangedescription}
              />

              <div class="buttonContainer">
                <input
                  type="submit"
                  value="create"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
          <a> IsPublic?</a>
          <button onClick={this.handleClick}>
            {this.state.isToggleOn ? "true" : "false"}
          </button>
          <ol id="list"></ol>
        </div>
      </div>
    );
  }
}
