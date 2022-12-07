import React, { Component } from "react";
import axios from "axios";

export default class AdminLegal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRequest = this.onChangeRequest.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      name: "",
      typeofrequest: "",
      Date: "",
      description: "",
    };
  }

  onChangedescription(e) {
    this.setState({
      description: e.target.value,
    });
  }
  onChangeRequest(e) {
    this.setState({
      typeofrequest: e.target.value,
    });
  }

  onChangeName(e) {
    this.setState({
      name: e.target.value,
    });
  }

  onChangeDate(e) {
    this.setState({
      Date: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    console.log(this.state);
    const report = {
      name: this.state.name,
      typeofrequest: this.state.typeofrequest,
      Date: this.state.Date,
      description: this.state.description,
    };

    axios.post("http://localhost:5500/report", report).then((res) => {
      console.log("saved successfully");
      document.getElementById("Your request is filed.");
    });
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">File Report </h1>
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
                name="request"
                id="request-f"
                class="request-f-input"
                placeholder="Type of Request"
                value={this.state.typeofrequest}
                onChange={this.onChangeRequest}
              />
              <input
                type="date"
                name="Date"
                id="Date-f"
                class="Date-f-input"
                placeholder="Enter Date"
                value={this.state.Date}
                onChange={this.onChangeDate}
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
                  value="Create"
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
