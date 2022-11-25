import React, { Component } from 'react';
import axios from 'axios';


export default class Search extends Component {

    onSubmit(a){
        a.preventDefault();
        this.TrackSearch = (e)=>{
            const track = e.currentTarget.value;
            axios.get("http://localhost:5500/track/track/"+track)
            .then(res => {
                console.log(res.data)
                const l = document.getElementById('list');
                res.data.forEach(e => {
                    const item = document.createElement('li');
                    item.appendChild(document.createTextNode(` trickname: ${e.track_title}, artistname:  ${e.artist_name}`))
                    l.appendChild(item);
                });
              
                });
            }
        }
    

   
   

render() {
    return(
        
        <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="search">search result</h1>
          
           
              <input
                type="text"
                name="artist"
                id="artist-f"
                class="artist-f-input"
                placeholder="artist"
            
              />

                <div class="buttonContainer">
                <input
                  value="Searchartist"
                  className="btn btn-primary"
                />
                </div>
                <br />


              <br />
              <input
                type="text"
                name="genre"
                id="genre"
                class="genre-f-input"
                placeholder="genre"
             
              />
              <div class="buttonContainer">
                <input
                  value="Searchgenre"
                  className="btn btn-primary"
                />
                </div>
               <br />
              <input
                type="text"
                name="band"
                id="band-f"
                class="band-f-input"
                placeholder="band"
               
              />
              <div class="buttonContainer">
                <input
                  value="Searchband"
                  className="btn btn-primary"
                />
                </div>
               <br />

               <form onSubmit={this.onSubmit}>
               <input
                type="Search"
                name="track"
                id="track-f"
                class="track-f-input"
                placeholder="track"
                //value={value}
                onChange={this.TrackSearch}
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
        </div>
      </div>
      
    )
  }
}