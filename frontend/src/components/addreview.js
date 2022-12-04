import React, { Component } from 'react';
import axios from 'axios';


export default class Addreivew extends Component {
  constructor(props){
    
    super(props);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.onSubmit = this.onSubmit.bind(this);



    this.state={
        reviews : []
    }
  }



  onChangeReview(e){
    this.setState({
        reviews: e.target.value
    });
  }


  onSubmit(e){
    e.preventDefault();
    const list =  {
        reviews : this.state.reviews
    }

    axios.patch("http://localhost:5500/list/review/" + this.props.match.params.name, list).then((res) => {
       console.log("saved successfully");
        
       window.location = '/'
}) 
    
};
   


  render() {
    
    return (
      <div id="background" className="backgroundContainer">
        <div id="form" className="formContainer">
          <h1 id="login">Add review </h1>
          <form onSubmit={this.onSubmit}>
            <div id="loginpage" class="login">
              <input
                type="text"
                name="reviews"
                id="reviews-f"
                class="reviews-f-input"
                placeholder="reviews"
                value={this.state.reviews}
                onChange={this.onChangeReview}
              />
                
              <div class="buttonContainer">
                <input
                  type="submit"
                  value="Add Review"
                  className="btn btn-primary"
                />
              </div>

            </div>
          </form>

        </div>
      </div>
    );
  }
}