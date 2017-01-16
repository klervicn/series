import React from 'react';
import ReactDOM from 'react-dom';
import DefaultImage from './default.jpg';

var Series = React.createClass({

  render: function(){

    return(
      <div className='App'>
        <div className='SeriesForm'>
          <form onSubmit={this.addItem}>
            <label>
              <input type='text' name='element' placeholder='Enter a new serie' value='{this.state.inputValue}' onChange='{this.updateInputValue}' />
            </label>
            <button type='button' onClick='{this.addItem}'> Add picture </button>
            <button type='button' onClick='{this.addItem}'> Add </button>
          </form>
          <img src={DefaultImage} />
        </div>
        <SeriesList />
      </div>
    )
  }

})

var SeriesList = React.createClass({

  render: function(){

    return(
      <div className='SeriesList' >
        <label> Series List </label>
          <form onSubmit={this.addItem}>
            <button type='button' onClick='{this.addItem}'> Add Episode </button>
          </form>
        <EpisodesList />
      </div>
    )
  }

})

var EpisodesList = React.createClass({

  render: function(){

    return(
      <div className='EpisodesList' >
        <label> Episodes List </label>
      </div>
    )
  }

})

export default Series
