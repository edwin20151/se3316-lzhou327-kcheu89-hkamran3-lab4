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
      <Link to={"/addreivew/" + props.exercise.name}> add review </Link> |
   
      <a
        href="#"
        onClick={() => {
          props.exerciseList(props.exercise.name);
        }}
      >
        View review
      </a>
      |
      <a
        href="#"
        onClick={() => {
          props.rating(props.exercise.name);
        }}
      >
        rating
      </a>

    </td>
  </tr>
);

export default class ReviewPage extends Component {
  constructor(props) {
    super(props);
    this.viewReview = this.viewReview.bind(this);

    this.state = { lists: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5500/list/public/")
      .then((response) => {
        const l = document.getElementById("list1");
       
          
    this.setState({ lists: response.data });
    
       
 }).catch((error) => {
    console.log(error);
  })
      
  }
  viewRating(name) {
    axios.get("http://localhost:5500/reviews/" + name).then((response) => {
          let ratings = [];
          for(let i=0; i<response.data.length ; i++){
            ratings.push(response.data[i].rating)
          } 
       
        const l = document.getElementById("list1");
        l.innerText = "";
        const reviews = response.data.filter((e) => {
          return e.isHidden === false;
        });
        console.log(reviews);
        if (reviews.length === 0) {
          l.appendChild(document.createTextNode(`No rating for ${name} yet`));
        } else {
          l.appendChild(document.createTextNode(`Rating of ${name}:\n`));

         
            const item = document.createElement("li");
            item.appendChild(
              document.createTextNode(` AvgRating: ${  Math.round(
                (ratings.reduce((a, b) => a + b, 0) / ratings.length ) * 100
              ) / 100} `)
            );
            l.appendChild(item);
          
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  viewReview(name) {
    axios
      .get("http://localhost:5500/reviews/" + name)
      .then((res) => {
        const l = document.getElementById("list");
        l.innerText = "";
        const reviews = res.data.filter((e) => {
          return e.isHidden === false;
        });
        console.log(reviews);
        if (reviews.length === 0) {
          l.appendChild(document.createTextNode(`No review for ${name} yet`));
        } else {
          l.appendChild(document.createTextNode(`Reviews of ${name}:\n`));

          reviews.forEach((e) => {
            const item = document.createElement("li");
            item.appendChild(
              document.createTextNode(
                `${e.userName} (${e.creationDate}): ${e.message}\n`
              )
            );
            l.appendChild(item);
          });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  exerciseList() {
    return this.state.lists.map((currentlist) => {
      return (
        <Exercise
          exercise={currentlist}
          exerciseList={this.viewReview}
          rating={this.viewRating}
          key={currentlist.name}
        />
      );
    });
  }

  render() {
    return (
      <div>
        <h1>Review Playlist</h1>
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
        <ol id="list1"></ol>
      </div>
    );
  }
}
