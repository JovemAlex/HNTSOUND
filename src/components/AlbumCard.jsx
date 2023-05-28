import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import './Albumcard.css';

export default class AlbumCard extends Component {
  render() {
    const {
      collectionId,
      artistName,
      collectionName,
      artworkUrl100,
    } = this.props;

    return (
      <div className="Album-card">
        <img src={ artworkUrl100 } alt={ collectionName } />
        <div className="Album-infos">
          <Link
            to={ `/album/${collectionId}` }
            data-testid={ `link-to-album-${collectionId}` }
            className="Album-name"
          >
            { collectionName }
          </Link>
          <p className="Artist">{ artistName }</p>
        </div>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  collectionId: PropTypes.number.isRequired,
  artistName: PropTypes.string.isRequired,
  collectionName: PropTypes.string.isRequired,
  artworkUrl100: PropTypes.string.isRequired,
};
