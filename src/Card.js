import React, { Component } from 'react';

export default class Card extends Component {

  render() {
    let poster = `https://image.tmdb.org/t/p/w500${this.props.details.poster}`;
    let imdb = `http://www.imdb.com/title/${this.props.details.imdb}`;
    let noImage='https://pvsmt99345.i.lithium.com/t5/image/serverpage/image-id/10546i3DAC5A5993C8BC8C?v=1.0';

    return(
      <div className='Card animated fadeInDown'>
        <div className='info'>
          <h2><a href={imdb} target='_blank'>{this.props.details.movieName}</a></h2>
          <h3>{this.props.details.tagLine}</h3>
          <p>{this.props.details.overView}</p>
          <div className='moreInfo'>
            <div className='release'>
              <p>Original Release</p>
              <h3>{this.props.details.releaseDate==='' ? 'N/A' : this.props.details.releaseDate}</h3>
            </div>
            <div className='time'>
              <p>Running Time</p>
              <h3>{this.props.details.time==='0'? 'N?A' : this.props.details.time} minutes</h3>
            </div>
            <div className='money'>
              <p>Revenue:</p>
              <h3>{this.props.details.revenue==='$'+0 ? 'N/A':this.props.details.revenue}</h3>
            </div>
            <div className='review'>
              <p>Vote Average:</p>
              <h3>{this.props.details.vote===0 ? 'N/A' : this.props.details.vote+'/10'}</h3>
            </div>
          </div>
        </div>
        <div className='banner'>
          <img src={this.props.details.poster === null ? noImage : poster} alt='Movie Poster'/>
        </div>
      </div>
    );
  }
}
