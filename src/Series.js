import React from 'react'
// import "./Series.css"

class Series extends React.Component {
  constructor () {
    super()
    this.state = {series: [],
      inputValue: ''}

    this.updateInputValue = this.updateInputValue.bind(this)
    this.addSerie = this.addSerie.bind(this)
    this.addEpisode = this.addEpisode.bind(this)
    this.removeEpisode = this.removeEpisode.bind(this)
    this.removeSerie = this.removeSerie.bind(this)
  }

  updateInputValue (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  addSerie (e) {
    e.preventDefault()
    // Copy of state series
    var nextArray = []
    for (var serie of this.state.series) {
      nextArray.push(serie)
    }

    nextArray.push({
      name: this.state.inputValue,
      key: Date.now(),
      nbEps: 0
    })

    this.setState({
      series: nextArray,
      inputValue: ''
    })
  }

  removeSerie (keyToRemove) {
    var nextSeries = []

    for (var serie of this.state.series) {
      if (serie.key !== keyToRemove) {
        nextSeries.push(serie)
      }

      this.setState({
        series: nextSeries
      })
    }
  }

  addEpisode (keyToIncrease) {
    var nextSeries = []

    for (var serie of this.state.series) {
      if (serie.key === keyToIncrease) {
        serie.nbEps += 1
        nextSeries.push(serie)
      } else nextSeries.push(serie)
    }
    this.setState({
      series: nextSeries
    })
  }

  removeEpisode (keyToRemove) {
    var nextSeries = []

    for (var serie of this.state.series) {
      if (serie.key === keyToRemove && serie.nbEps >= 1) {
        serie.nbEps -= 1
        nextSeries.push(serie)
      } else nextSeries.push(serie)
    }
    this.setState({
      series: nextSeries
    })
  }

  render () {
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
        <SeriesList entries={this.state.series} addEp={this.addEpisode} remEp={this.removeEpisode} remSerie={this.removeSerie} />
      </div>
    )
  }

}

class SeriesList extends React.Component {

  render () {
    var seriesEntries = this.props.entries
    var addEp = this.props.addEp
    var remEp = this.props.remEp
    var remSerie = this.props.remSerie
    var removeButton = null

    function createSeries (serie) {
      if (serie.nbEps >= 1) {
        removeButton = (<button type='button' onClick={removeAnEpisode}> Remove episode </button>)
      }

      function addAnEpisode () {
        addEp(serie.key)
      }

      function removeAnEpisode () {
        remEp(serie.key)
      }

      function removeASerie () {
        remSerie(serie.key)
      }

      return (
        <li key={serie.key} classname='SeriesList'>
          {serie.name + ' '}
          <button type='button' onClick={addAnEpisode}> Add Episode </button>
          <button type='button' onClick={removeASerie}> Remove Serie </button>
          <ImageUpload />
          <EpisodesList nbEp={serie.nbEps} />
          {removeButton}
        </li>

      )
    }

    var seriesList = seriesEntries.map(createSeries)

    return (
      <div className='SeriesList' >
        <ul>
          {seriesList}
        </ul>
      </div>
    )
  }

}
class EpisodesList extends React.Component {
  render () {
    var episodesList = []
    for (var i = 1; i <= this.props.nbEp; i++) {
      episodesList.push(<li> Episode {i} </li>)
    }

    return (
      <div className='EpisodesList' >
        <ul>
          {episodesList}
        </ul>
      </div>
    )
  }
}

class ImageUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {file: '', imagePreviewUrl: ''}
  }

  _handleImageChange (e) {
    e.preventDefault()

    let reader = new FileReader()
    let file = e.target.files[0]

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      })
    }
    reader.readAsDataURL(file)
  }

  render () {
    let {imagePreviewUrl} = this.state
    let $imagePreview = null

    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />)
    } else {
      $imagePreview = (<div className='previewText'>Please select an image</div>)
    }

    return (
      <div className='previewComponent'>
        <form onSubmit={(e) => this._handleSubmit(e)}>
          <input className='fileInput' type='file' onChange={(e) => this._handleImageChange(e)} data-buttonText='Select a file' />
        </form>
        <div className='imgPreview'>
          {$imagePreview}
        </div>
      </div>
    )
  }
}

export default Series
