import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

export default class Album extends Component {
  constructor() {
    super();
    this.state = {
      response: [],
      loading: false,
      favMusic: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const response = await getMusics(id);
    const favMusic = await getFavoriteSongs();
    console.log(response);
    this.setState({ response, favMusic });
  }

  render() {
    const { response, loading, favMusic } = this.state;
    const songs = [...response];
    console.log(songs);
    return (
      <div data-testid="page-album">
        { loading && <Loading /> }
        { !loading && (
          <div>
            <Header />
            { response.length > 0 && (
              <div>
                <h3 data-testid="artist-name">{ response[0].artistName }</h3>
                <p data-testid="album-name">{ response[0].collectionName }</p>
              </div>
            )}
            { songs.map((song) => (
              <MusicCard
                key={ song.trackId }
                { ...song }
                isFav={ favMusic }
              />
            ))}
          </div>
        ) }
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
