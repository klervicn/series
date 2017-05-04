import React from 'react';
import SeriesList from './SeriesList.js';
// import "./Series.css"
var storage = localStorage;

class Series extends React.Component {
  constructor() {
    super();

    if (storage.getItem('series') !== null) {
      this.state = {
        series: JSON.parse(storage.getItem('series')),
        inputValue: ''
      };
    } else {
      this.state = {
        series: [],
        inputValue: ''
      };
    }

    this.updateInputValue = this.updateInputValue.bind(this);
    this.addSerie = this.addSerie.bind(this);
    this.addEpisode = this.addEpisode.bind(this);
    this.removeEpisode = this.removeEpisode.bind(this);
    this.removeSerie = this.removeSerie.bind(this);
    this.setPicture = this.setPicture.bind(this);
  }

  updateInputValue(evt) {
    this.setState({
      inputValue: evt.target.value
    });
  }

  addSerie(e) {
    e.preventDefault();
    var nextArray = [];

    for (var serie of this.state.series) {
      nextArray.push(serie);
    }

    nextArray.push({
      name: this.state.inputValue,
      key: Date.now(),
      nbEps: 0,
      pictureURL: ''
    });

    storage.setItem('series', JSON.stringify(nextArray));

    this.setState({
      series: nextArray,
      inputValue: ''
    });
  }

  removeSerie(keyToRemove) {
    var nextArray = [];

    for (var serie of this.state.series) {
      if (serie.key !== keyToRemove) {
        nextArray.push(serie);
      }

      storage.setItem('series', JSON.stringify(nextArray));

      this.setState({
        series: nextArray
      });
    }
  }

  addEpisode(keyToIncrease) {
    var nextArray = [];

    for (var serie of this.state.series) {
      if (serie.key === keyToIncrease) {
        serie.nbEps += 1;
        nextArray.push(serie);
      } else nextArray.push(serie);
    }

    storage.setItem('series', JSON.stringify(nextArray));

    this.setState({
      series: nextArray
    });
  }

  removeEpisode(keyToRemove) {
    var nextArray = [];

    for (var serie of this.state.series) {
      if (serie.key === keyToRemove && serie.nbEps >= 1) {
        serie.nbEps -= 1;
        nextArray.push(serie);
      } else nextArray.push(serie);
    }

    storage.setItem('series', JSON.stringify(nextArray));

    this.setState({
      series: nextArray
    });
  }

  setPicture(keyToChange, newPictureURL) {
    var nextArray = [];

    for (var serie of this.state.series) {
      if (serie.key === keyToChange) {
        serie.pictureURL = newPictureURL;
        nextArray.push(serie);
      } else nextArray.push(serie);
    }

    storage.setItem('series', JSON.stringify(nextArray));

    this.setState({
      series: nextArray
    });
  }

  render() {
    return (
      <div className="App">
        <div className="SeriesForm">
          <form onSubmit={this.addSerie}>
            <label>
              <input
                type="text"
                name="element"
                placeholder="Enter a new serie"
                value={this.state.inputValue}
                onChange={this.updateInputValue}
              />
            </label>
            <button type="button" onClick={this.addSerie}> Add </button>
          </form>
        </div>
        <SeriesList
          seriesEntries={this.state.series}
          addEpisode={this.addEpisode}
          removeEpisode={this.removeEpisode}
          removeSerie={this.removeSerie}
          setPicture={this.setPicture}
        />
      </div>
    );
  }
}

export default Series;
