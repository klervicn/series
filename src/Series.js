import React from 'react'
import ReactDOM from 'react-dom'

class Series extends React.Component {
  constructor () {
    super()
    this.state = {series: [],
      inputValue: ''}

    this.updateInputValue = this.updateInputValue.bind(this)
    this.addSerie = this.addSerie.bind(this)
    this.addEpisode = this.addEpisode.bind(this)
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
      eps: 0
      // pictureUrl: Recup URL or default if empty
    })

    this.setState({
      series: nextArray,
      inputValue: ''
    })
  }

  addEpisode (keyToIncrease) {
    var nextSeries = []

    for (var serie of this.state.series) {
      if (serie.key === keyToIncrease) {
        serie.eps += 1
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
        <SeriesList entries={this.state.series} episode={this.addEpisode} />
      </div>
    )
  }

}

class SeriesList extends React.Component {

  render () {
    var seriesEntries = this.props.entries
    var addEp = this.props.episode

    function createSeries (serie) {
      // Delete function here (delete series and all episodes ?)

      function addAnEpisode () {
        addEp(serie.key)
      }
      return (
        <li key={serie.key}>
          {serie.name + ' '}
          <button type='button' onClick={addAnEpisode}> Add Episode </button>
          <ImageUpload />
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
