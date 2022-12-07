import React, { Component } from "react";
import axios from "axios";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.onChangealbum = this.onChangealbum.bind(this);
    this.onChangeartist = this.onChangeartist.bind(this);
    this.onChangegenres = this.onChangegenres.bind(this);
    this.onChangetrack = this.onChangetrack.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      track_title: "",
      album_title: "",
      artist_name: "",
      track_genres: "",
    };
  }

  Search() {
    const track = {
      track_title: this.state.track_title,
      album_title: this.state.album_title,
      artist_name: this.state.artist_name,
      track_genres: this.state.track_genres,
    };

    axios.post("http://localhost:5500/track/search", track).then((res) => {
      console.log(res.data);
      const l = document.getElementById("list");
      l.innerText = "";

      res.data.forEach((e) => {
        const item = document.createElement("li");
        item.appendChild(
          document.createTextNode(
            ` trackname: ${e.track_title}, artistname:  ${e.artist_name}`
          )
        );

        let expandButton = document.createElement("button");
        expandButton.innerText = "Expand";
        expandButton.style.margin = "5px";
        item.appendChild(expandButton);

        expandButton.addEventListener("click", (event) => {
          item.childNodes[0].textContent += `, track creation date: ${e.track_date_created}, track genres: ${e.track_genres} `;
          item.removeChild(expandButton);
        });

        var youtubeButton = document.createElement("button");
        youtubeButton.innerHTML = "YouTube";
        youtubeButton.style.fontWeight = "bold";
        youtubeButton.style.backgroundColor = "red";
        youtubeButton.style.color = "white";
        youtubeButton.style.height = "4vh";
        youtubeButton.style.width = "8vh";
        item.appendChild(youtubeButton);
        l.appendChild(item);

        youtubeButton.addEventListener("click", (event) => {
          window.open(
            "https://www.youtube.com/results?search_query=" +
              e.track_title +
              "+" +
              e.artist_name
          );
        });
      });
    });
  }

  onChangealbum(e) {
    this.setState({
      album_title: e.target.value,
    });
  }
  onChangetrack(e) {
    this.setState({
      track_title: e.target.value,
    });
  }
  onChangegenres(e) {
    this.setState({
      track_genres: e.target.value,
    });
  }
  onChangeartist(e) {
    this.setState({
      artist_name: e.target.value,
    });
  }

  onSubmit(e) {
    e.preventDefault();
    this.Search();
  }

  render() {
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Search </h1>
          <form onSubmit={this.onSubmit}>
            <input
              type="search"
              name="artist"
              id="artist-f"
              className="artist-f-input"
              placeholder="artist"
              value={this.state.artist}
              onChange={this.onChangeartist}
            />
            <input
              type="search"
              name="genres"
              id="genres-f"
              className="genres-f-input"
              placeholder="genres"
              value={this.state.genres}
              onChange={this.onChangegenres}
            />
            <input
              type="search"
              name="album"
              id="album-f"
              className="album-f-input"
              placeholder="album"
              value={this.state.album}
              onChange={this.onChangealbum}
            />
            <input
              type="search"
              name="track"
              id="track-f"
              className="track-f-input"
              placeholder="track"
              value={this.state.track}
              onChange={this.onChangetrack}
            />
            <div className="Container">
              <input type="submit" value="search" className="btn btn-primary" />
            </div>
          </form>
          <ol id="list"></ol>
          <br />
        </div>
      </div>
    );
  }
}
