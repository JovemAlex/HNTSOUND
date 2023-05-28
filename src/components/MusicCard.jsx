import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { addSong, getFavoriteSongs } from '../services/favoriteSongsAPI';
import Loading from './Loading';

export default class MusicCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favorite: '',
      loading: false,
      prevCheck: [],
    };
  }

  handleCheck = async ({ target: { checked } }) => {
    this.setState({
      loading: true,
      prevCheck: checked,
    });

    if (checked === true) {
      await addSong({ ...this.props });
    }

    this.setState({
      favorite: checked,
      loading: false,
      prevCheck: checked,
    });

    const { prevCheck } = this.state;
    console.log(prevCheck);

    getFavoriteSongs();
  }

  render() {
    const { loading, favorite } = this.state;
    const {
      trackName,
      previewUrl,
      trackId,
    } = this.props;

    return (
      <div>
        { loading && <Loading /> }
        { !loading && (
          <div>
            <h3>{trackName}</h3>
            <audio src={ previewUrl } controls data-testid="audio-component">
              <track kind="captions" />
              O seu navegador não suporta o elemento
              {' '}
              <code>audio</code>
              .
            </audio>
            <label htmlFor={ trackId } data-testid={ `checkbox-music-${trackId}` }>
              Favorita
              <input
                type="checkbox"
                name=""
                id={ trackId }
                checked={ favorite }
                onChange={ this.handleCheck }
              />
            </label>
          </div>
        )}
      </div>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string.isRequired,
  previewUrl: PropTypes.string.isRequired,
  trackId: PropTypes.string.isRequired,
};
