import React from 'react'
// import "./Series.css"
var storage = localStorage

class Series extends React.Component {
  constructor () {
    super()
<<<<<<< HEAD

    if (storage.getItem('series') !== null) {
      this.state = {series: JSON.parse(storage.getItem('series')),
        inputValue: ''}
    } else {
      this.state = {series: [],
        inputValue: ''}
    }
=======
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb

    if (storage.length !== 0) {
      this.state = {series: JSON.parse(storage.getItem('series')),
        inputValue: ''}
    } else {
      this.state = {series: [],
        inputValue: ''}
    }
    this.updateInputValue = this.updateInputValue.bind(this)
    this.addSerie = this.addSerie.bind(this)
    this.addEpisode = this.addEpisode.bind(this)
    this.removeEpisode = this.removeEpisode.bind(this)
    this.removeSerie = this.removeSerie.bind(this)
    this.setPicture = this.setPicture.bind(this)
  }

  updateInputValue (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  addSerie (e) {
    e.preventDefault()
    var nextArray = []

    for (var serie of this.state.series) {
      nextArray.push(serie)
    }

    nextArray.push({
      name: this.state.inputValue,
      key: Date.now(),
      nbEps: 0,
      pictureURL: ''
    })

    storage.setItem('series', JSON.stringify(nextArray))

    this.setState({
      series: nextArray,
      inputValue: ''
    })
  }

  removeSerie (keyToRemove) {
    var nextArray = []

    for (var serie of this.state.series) {
      if (serie.key !== keyToRemove) {
        nextArray.push(serie)
      }

<<<<<<< HEAD
      storage.setItem('series', JSON.stringify(nextArray))
=======
      storage.setItem('series', JSON.stringify(nextSeries))
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb

      this.setState({
        series: nextArray
      })
    }
  }

  addEpisode (keyToIncrease) {
    var nextArray = []

    for (var serie of this.state.series) {
      if (serie.key === keyToIncrease) {
        serie.nbEps += 1
        nextArray.push(serie)
      } else nextArray.push(serie)
    }
<<<<<<< HEAD

    storage.setItem('series', JSON.stringify(nextArray))

=======
    storage.setItem('series', JSON.stringify(nextSeries))
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
    this.setState({
      series: nextArray
    })
  }

  removeEpisode (keyToRemove) {
    var nextArray = []

    for (var serie of this.state.series) {
      if (serie.key === keyToRemove && serie.nbEps >= 1) {
        serie.nbEps -= 1
        nextArray.push(serie)
      } else nextArray.push(serie)
    }
<<<<<<< HEAD

    storage.setItem('series', JSON.stringify(nextArray))

    this.setState({
      series: nextArray
=======
    storage.setItem('series', JSON.stringify(nextSeries))
    this.setState({
      series: nextSeries
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
    })
  }

  setPicture (keyToChange, newPictureURL) {
<<<<<<< HEAD
    var nextArray = []
=======
    var nextSeries = []
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb

    for (var serie of this.state.series) {
      if (serie.key === keyToChange) {
        serie.pictureURL = newPictureURL
<<<<<<< HEAD
        nextArray.push(serie)
      } else nextArray.push(serie)
    }

    storage.setItem('series', JSON.stringify(nextArray))

=======
        nextSeries.push(serie)
      } else nextSeries.push(serie)
    }
    storage.setItem('series', JSON.stringify(nextSeries))
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
    this.setState({
      series: nextArray
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
<<<<<<< HEAD
        <SeriesList seriesEntries={this.state.series} addEpisode={this.addEpisode} removeEpisode={this.removeEpisode} removeSerie={this.removeSerie} setPicture={this.setPicture} />
=======
        <SeriesList entries={this.state.series} addEpisode={this.addEpisode} removeEpisode={this.removeEpisode} removeSerie={this.removeSerie} setPicture={this.setPicture} />
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
      </div>
    )
  }

}

class SeriesList extends React.Component {
  render () {
<<<<<<< HEAD
    var seriesEntries = this.props.seriesEntries
=======
    var seriesEntries = this.props.entries
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
    var addEpisode = this.props.addEpisode
    var removeEpisode = this.props.removeEpisode
    var removeSerie = this.props.removeSerie
    var setPicture = this.props.setPicture
    var removeButton = null

    function createSeries (serie) {
      if (serie.nbEps >= 1) {
        removeButton = (<button type='button' onClick={removeAnEpisode}> Remove episode </button>)
      }

      function addAnEpisode () {
        addEpisode(serie.key)
      }

      function removeAnEpisode () {
        removeEpisode(serie.key)
      }

      function removeASerie () {
        removeSerie(serie.key)
      }

      return (
        <li key={serie.key} className='SeriesList'>
          {serie.name + ' '}
          <button type='button' onClick={addAnEpisode}> Add Episode </button>
          <button type='button' onClick={removeASerie}> Remove Serie </button>
          <SeriePicture setPicture={setPicture} serieKey={serie.key} seriePictureURL={serie.pictureURL} />
          <EpisodesList nbEp={serie.nbEps} />
          {removeButton}
        </li>
      )
    }

    var seriesList = (seriesEntries.map(createSeries))

    return (
      <div className='SeriesList' >
        <ul>
          {seriesList}
        </ul>
      </div>
    )
  }
}
<<<<<<< HEAD

/* SeriesList.PropTypes = {
  entries: React.PropTypes.array
}

SeriesList.defaultProps = {
  entries: [{name: '',
        key: Date.now(),
        nbEps: 0,
        pictureURL: ''}]
} */

=======
SeriesList.PropTypes = {
  entries: React.PropTypes.array
}

SeriesList.defaultProps = {
  entries: [{name: '',
    key: Date.now(),
    nbEps: 0,
    pictureURL: ''}]
}

>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
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

class SeriePicture extends React.Component {
<<<<<<< HEAD
=======

>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
  constructor () {
    super()
    this.state = {inputValue: ''}
    this.updateInputValue = this.updateInputValue.bind(this)
<<<<<<< HEAD
=======
  }

  updateInputValue (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  render () {
    var setPicture = this.props.setPicture
    var serieKey = this.props.serieKey
    var pathPicture = this.props.seriePictureURL
    var txt = this.state.inputValue

    function setSeriePicture () {
      setPicture(serieKey, txt)
    }

    function displayPicture () {
      pathPicture = txt
      setSeriePicture()
    }

    return (
      <div className='PictureForm'>
        <form onSubmit={this.updateInputValue}>
          <label>
            <input type='text' name='element' placeholder='TypePicture Path' value={this.state.inputValue} onChange={this.updateInputValue} />
          </label>
          <button type='button' onClick={displayPicture}> Save </button>
        </form>
        <div className='imgPreview'>
          <img src={pathPicture} alt='' />
        </div>
      </div>
    )
  }

}

/* class ImageUpload extends React.Component {
  constructor (props) {
    super(props)
    this.state = {file: '', imagePreviewUrl: ''}
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
  }

  updateInputValue (evt) {
    this.setState({
      inputValue: evt.target.value
    })
  }

  render () {
<<<<<<< HEAD
    var setPicture = this.props.setPicture
    var serieKey = this.props.serieKey
    var pathPicture = this.props.seriePictureURL
    var inputPath = this.state.inputValue

    function setSeriePicture () {
      setPicture(serieKey, inputPath)
    }

    function displayPicture () {
      pathPicture = inputPath
      setSeriePicture()
=======
    var serieKey = this.props.serieKey
    var setPicture = this.props.setPicture
    var getPicture = this.props.getPicture
    var seriePictureURL = getPicture()
    let {imagePreviewUrl} = this.state
    let $imagePreview = null

    function saveThisPicture () {
      setPicture(serieKey,imagePreviewUrl)
    }

    function getThisPicture () {
      getPicture(serieKey)
    }

    console.log(seriePictureURL)

    if (imagePreviewUrl)
    {
      $imagePreview = (<img src={imagePreviewUrl} />)
      saveThisPicture()
    }
    else if (seriePictureURL !== null)
    {
      $imagePreview = (<img src={seriePictureURL} />)
    }
      else
    {
      $imagePreview = (<div className='previewText'>Please select an image</div>)
>>>>>>> 7097cacd09f698e0342e4fc25a5e0222a2c24cbb
    }

    return (
      <div className='PictureForm'>
        <form onSubmit={this.updateInputValue}>
          <label>
            <input type='text' name='element' placeholder='TypePicture Path' value={this.state.inputValue} onChange={this.updateInputValue} />
          </label>
          <button type='button' onClick={displayPicture}> Save </button>
        </form>
        <div className='imgPreview'>
          <img src={pathPicture} alt='' />
        </div>
      </div>
    )
  }
} */

export default Series
