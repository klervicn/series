import React from 'react'
import EpisodesList from './EpisodesList.js'
import SeriePicture from './SeriePicture.js'

class SeriesList extends React.Component {
  render () {
    var seriesEntries = this.props.seriesEntries
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

/* SeriesList.PropTypes = {
  entries: React.PropTypes.array
}

SeriesList.defaultProps = {
  entries: [{name: '',
        key: Date.now(),
        nbEps: 0,
        pictureURL: ''}]
} */

export default SeriesList
