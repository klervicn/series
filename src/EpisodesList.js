import React from 'react'

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

export default EpisodesList
