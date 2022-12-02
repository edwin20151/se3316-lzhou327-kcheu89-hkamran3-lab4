import React, { Component } from 'react';
import axios from 'axios';


export default class EditList extends Component {
  constructor(props){
    
    super(props);
    this.onChangeName = this.onChangeName.bind(this);
    this.onChangetracks = this.onChangetracks.bind(this);
    this.onChangeplaytime = this.onChangeplaytime.bind(this);
    this.onChangedescription = this.onChangedescription.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this)



    this.state={
    name :  '',
    playtime  : 0,
    tracks : [],
    isToggleOn: false,
    description : ''
    }
  }

  componentDidMount() {
    axios.get("http://localhost:5500/list/" + this.props.match.params.name)
      .then(response => {
        this.setState(
          {
          name : response.data.name,
          description : response.data.description,
          playtime : response.data.playtime,
          tracks : response.data.tracks,
          isToggleOn : response.data.isToggleOn
        })
      })
      .catch((error) => {
        console.log(error);
      });
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

  handleClick(){
    this.setState(state => ({
        isToggleOn: !state.isToggleOn
    }))
  }

  onChangedescription(e){
    this.setState({
      description : e.target.value
    })
  }

  onChangeName(e){
    this.setState({
        name: e.target.value
    });
  }

  onChangetracks(e){
    const track = e.target.value.split(',')
    this.setState({
     tracks: [track]
    });
  }


  onChangeplaytime(e){
    this.setState({
        playtime: e.target.value
    });
  }


  onSubmit(e){
    e.preventDefault();
    const list =  {
        name :  this.state.name,
        playtime  : this.state.playtime,
        tracksNum : this.state.tracks.length,
        tracks : this.state.tracks,
        Public : this.state.isToggleOn,
        description : this.state.description
    }

    axios.patch("http://localhost:5500/list/" + this.props.match.params.name, list).then((res) => {
       console.log("saved successfully");
        
       window.location = '/postlogon'
}) 
    
};
   


  render() {
    
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Add review</h1>
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
                  value="edit"
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
