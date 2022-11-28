import React, { Component } from 'react';
import axios from 'axios';


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
    
        axios
          .post("http://localhost:5500/track/search", track)
          .then(res => {
            console.log(res.data)
            const l = document.getElementById('list');
            document.getElementById("expand").addEventListener('click', expand);
            function expand(){
                res.data.forEach(e => {
                    const item = document.createElement('li');
                    item.appendChild(document.createTextNode(` trackname: ${e.track_genres}`))
                    var but = document.createElement('button');
                    but.innerHTML = 'YouTube';
                    but.style.fontWeight = 'bold';
                    but.style.backgroundColor = 'red'
                    but.style.color = 'white';
                    but.style.height = '4vh'
                    but.style.width = '8vh'
                    item.appendChild(but)
                    l.appendChild(item);
                    but.addEventListener('click',this.youtube) 
                })}
                
            res.data.forEach(e => {
                const item = document.createElement('li');
                item.appendChild(document.createTextNode(` trackname: ${e.track_title}, artistname:  ${e.artist_name}`))
                var but = document.createElement('button');
                but.innerHTML = 'YouTube';
                but.style.fontWeight = 'bold';
                but.style.backgroundColor = 'red'
                but.style.color = 'white';
                but.style.height = '4vh'
                but.style.width = '8vh'
                item.appendChild(but)
                l.appendChild(item);
                but.addEventListener('click',youtube) 
                function youtube(){
                  res.data.forEach(e => {
                  var but = document.getElementById('but');
                  but.onclick = window.open("https://www.youtube.com/results?search_query="+e.artist_name + e.track_title);
                })
              }
            }
          
    
            )
            
            
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
                    class="artist-f-input"
                    placeholder="artist"
                    value={this.state.artist}
                    onChange={this.onChangeartist}
                  />
                  <input
                    type="search"
                    name="genres"
                    id="genres-f"
                    class="genres-f-input"
                    placeholder="genres"
                    value={this.state.genres}
                    onChange={this.onChangegenres}
                  />
                  <input
                    type="search"
                    name="album"
                    id="album-f"
                    class="album-f-input"
                    placeholder="album"
                    value={this.state.album}
                    onChange={this.onChangealbum}
                  />
                  <input
                  type="search"
                  name="track"
                  id="track-f"
                  class="track-f-input"
                  placeholder="track"
                  value={this.state.track}
                  onChange={this.onChangetrack}
                />
                  <div class="buttonContainer">
                    <input
                      type="submit"
                      value="search"
                      className="btn btn-primary"
                    />
                    </div>
                    
              </form>
              <ol id="list"></ol>
              <br />
              <div class="buttonContainer">
                  <button id="expand"> expand</button>
                  </div>
            </div>
          </div>
        );
      }
}