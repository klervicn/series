import React from 'react'
import ReactDOM from 'react-dom'
import DefaultPicture from './default.jpg'

var Series = React.createClass({
  getInitialState: function () {
    return {series: [],
      inputValue: '',
      inputPicturePath: DefaultPicture}
  },

  updateInputValue: function (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  },

  addSerie: function (e) {
    e.preventDefault()
    // Copy of state series
    var nextArray = []
    for (var serie of this.state.series) {
      nextArray.push(serie)
    }

    nextArray.push({
      name: this.state.inputValue,
      key: Date.now(),
      eps: 0
      // pictureUrl: Recup URL or default if empty
    })

    this.setState({
      series: nextArray,
      inputValue: ''
    })
  },

  addEpisode: function (keyToIncrease) {
    var nextSeries = []

    for (var serie of this.state.series) {
      if (serie.key === keyToIncrease) {
        serie.eps += 1
        nextSeries.push(serie)
      }
      else nextSeries.push(serie)
    }

    this.setState({
      series: nextSeries
    })
  },

  render: function () {
    return (
      <div className='App'>
        <div className='SeriesForm'>
          <form onSubmit={this.addSerie}>
            <label>
              <input type='text' name='element' placeholder='Enter a new serie' value={this.state.inputValue} onChange={this.updateInputValue} />
            </label>
            <button type='button' onClick={this.addSerie}> Add </button>
          </form>
        </div>
        <SeriesList entries={this.state.series} episode={this.addEpisode} />
      </div>
    )
  }

})

var SeriesList = React.createClass({

  getInitialState: function () {
    return {episodes: []}
  },

  render: function () {
    var seriesEntries = this.props.entries
    var addEp = this.props.episode

    function createSeries (serie) {
      // Delete function here (delete series and all episodes ?)

      function addAnEpisode () {
        addEp(serie.key)
      }
      return (
        <li key={serie.key}>
          {serie.name}
          <button type='button' onClick={addAnEpisode}> Add Episode </button>
          <EpisodesList nbEp={serie.eps} />
        </li>
      )
    }

    var seriesList = seriesEntries.map(createSeries)

    return (
      <div className='SeriesList' >
        <label> Series List </label>
        <ul>
          {seriesList}
        </ul>
      </div>
    )
  }

})

var EpisodesList = React.createClass({
  render: function () {
    return (
      <div className='EpisodesList' >
        <label> You watched {this.props.nbEp} episode(s) </label>
      </div>
    )
  }
})

export default Series
