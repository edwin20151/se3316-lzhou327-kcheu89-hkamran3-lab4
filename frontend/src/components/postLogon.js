import React, { Component } from "react";


export default class PostLogon extends Component{
  render() {
    return (
      <div id="background" className="backgroundContainer">
          <h1 id="login">Search Up track </h1>
            <div id="loginpage" class="login">
              <input
                name="Search Artist"
                id="Search-Artist"
                class="user-f-input"
                placeholder="Artist name"
                value={this.state.Artist}
                onChange={this.onChangeArtist}
              />
              <input
                type="Search Track"
                id="Search-Track"
                class="user-f-input"
                placeholder="Track name"
                value={this.state.Track}
                onChange={this.onChangeTrack}
              />
                <input
                name="Search Genre"
                id="Search-Genre"
                class="user-f-input"
                placeholder="Genre name"
                value={this.state.Genre}
                onChange={this.onChangeGenre}
              />
                <input
                name="Search band"
                id="Search-band"
                class="user-f-input"
                placeholder="band name"
                value={this.state.Band}
                onChange={this.onChangeBand}
              />

                <div class="buttonContainer">
                <input
                  type="submit"
                  value="login"
                  className="btn btn-primary"
                />
                </div>
             
          <ol id="list"></ol>
        </div>
      </div>
    );
}
}
