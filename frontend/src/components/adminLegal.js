import React, { Component } from "react";
import axios from "axios";

export default class AdminLegal extends Component {
  constructor(props) {
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangeRequest = this.onChangeRequest.bind(this);
    this.onChangeDate = this.onChangeDate.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onChangeDocument = this.onChangeDocument.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.onReportSubmit = this.onReportSubmit.bind(this);
    this.onPolicySubmit = this.onPolicySubmit.bind(this);

    this.state = {
      name: "",
      typeofrequest: "",
      Date: "",
      description: "",
      document: "",
      content: "",
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

  onChangeDocument(e) {
    this.setState({
      document: e.target.value,
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value,
    });
  }

  onReportSubmit(e) {
    e.preventDefault();
    const report = {
      name: this.state.name,
      typeofrequest: this.state.typeofrequest,
      Date: this.state.Date,
      description: this.state.description,
    };

    axios.post("http://localhost:5500/report", report).then((res) => {
      console.log("saved successfully");
      document.getElementById("list").innerText = "Your request is filed.";
    });
  }

  onPolicySubmit(e) {
    e.preventDefault();
    const policy = {
      content: this.state.content,
    };

    axios
      .post("http://localhost:5500/policies/" + this.state.document, policy)
      .then((res) => {
        console.log("saved successfully");
        document.getElementById("list2").innerText =
          "The policy is created / updated.";
      });
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Takedown Request </h1>
          <form onSubmit={this.onReportSubmit}>
            <div id="loginpage" className="login">
              <input
                type="text"
                name="name"
                id="name-f"
                className="name-f-input"
                placeholder="name"
                value={this.state.name}
                onChange={this.onChangeName}
              />
              <input
                type="text"
                name="request"
                id="request-f"
                className="request-f-input"
                placeholder="Type of Request"
                value={this.state.typeofrequest}
                onChange={this.onChangeRequest}
              />
              <input
                type="date"
                name="Date"
                id="Date-f"
                className="Date-f-input"
                placeholder="Enter Date"
                value={this.state.Date}
                onChange={this.onChangeDate}
              />

              <input
                type="text"
                name="description"
                id="description-f"
                className="description-f-input"
                placeholder="description"
                value={this.state.description}
                onChange={this.onChangedescription}
              />
              <br></br>
              <div className="buttonContainer">
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
        <div id="form" className="formContainer">
          <br></br>
          <br></br>
          <h1> Create / Update Policy</h1>
          <span>
            If the selected policy doesn't exist, a new policy will be created
          </span>
          <br></br>
          <form onSubmit={this.onPolicySubmit}>
            <div id="loginpage" className="login">
              <input
                type="text"
                name="documentName"
                id="document-f"
                className="document-f-input"
                placeholder="Document Name"
                value={this.state.document}
                onChange={this.onChangeDocument}
              />

              <input
                type="text"
                name="content"
                id="content-f"
                className="content-f-input"
                placeholder="Content"
                value={this.state.content}
                onChange={this.onChangeContent}
              />
              <br></br>
              <div className="buttonContainer">
                <input
                  type="submit"
                  value="Create / Update"
                  className="btn btn-primary"
                />
              </div>
            </div>
          </form>
          <ol id="list2"></ol>
        </div>
        <br></br>
        <br></br>
        <h2>Workflow for DMCA & Tools instructions</h2>
        <span>
          1. Admin upload the updated DMCA notice & takedown policy <br></br>
          2. Admin screen all the reviews / contents in the website
          <br></br>
          3. Admin takedown & inform the user if any content is violated the
          policy
        </span>{" "}
        <br></br>
      </div>
    );
  }
}
