import React, { Component } from 'react';
import Card from './Card';
import axios from 'axios';
const KEY='b46fffb3dd80550ac2f46c5bb6047209';


export default class App extends Component{

  constructor(props){
    super(props);

    this.state = {
      query:'',
      movies:[],
      id:603, //start with Matrix Movie
      listOfMovies:[],
      backgroundImage:'',
      dialogDisplay:'none'
      }
    this.handleChange = this.handleChange.bind(this);
    this.fetchInfo = this.fetchInfo.bind(this);
  }

  fetchInfo(id){

    let url = `https://api.themoviedb.org/3/movie/${id}?api_key=${KEY}`;

    //inicial api call to fetch info

    axios.get(url)
         .then(function (response) {
           this.setState({
             movieName:response.data.original_title,
             tagLine:response.data.tagline,
             overView:response.data.overview,
             releaseDate:response.data.release_date,
             time:response.data.runtime,
             revenue:'$'+Number((response.data.revenue).toFixed(1)).toLocaleString(),
             vote:response.data.vote_average,
             poster:response.data.poster_path,
             imdb:response.data.imdb_id

           })
         }.bind(this))
         .catch(function (error) {
           console.log(error);
         });

  }

  componentDidMount(){

    this.fetchInfo(this.state.id);

  }

  //Make search for movies when enter more than 2 input values and show dialog box
  //if input field is empty, close dialog box
  handleChange(event){
    this.setState(
      {
        query:event.target.value,
        dialogDisplay:'block'
      }
      );
      let url=`https://api.themoviedb.org/3/search/movie?api_key=${KEY}&query=${this.state.query}`;
        if (this.state.query.length > 2) {
          axios.get(url)
               .then(function (response) {
                 let listOfMovies = Object.keys(response.data.results).map((key)=>{
                   return response.data.results[key];

                 })
                 this.setState({
                   listOfMovies:this.state.movies.concat(listOfMovies)
                 })
               }.bind(this))
               .catch(function (error) {
                 console.log(error);
               });
        }
    if(this.state.query.length < 2){
      this.setState({dialogDisplay:'none'});
    }
  }


//When movie is selected run fetchInfo with ID of the selected movie
  handleClick(movie){
    this.fetchInfo(movie.id);
    this.setState({
      query:'',
      dialogDisplay:'none',
    })
  }

  render(){
    return(
      <div className='App'>
        <div className='SearchBar'>
            <input
              type='text'
              value={this.state.query}
              placeholder='Search Movie Title...'
              onChange={this.handleChange}
              />
            <div className='dialog' style={{display:this.state.dialogDisplay}}>
              <ul>
                {this.state.listOfMovies.map((movie)=>{
                  return <li onClick={this.handleClick.bind(this,movie)} key={movie.id}>{movie.title}</li>
                })}
              </ul>
            </div>
        </div>
        <Card details={this.state}/>
      </div>
    );
  }
 }
