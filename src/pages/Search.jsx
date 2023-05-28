import React, { Component } from 'react';
import AlbumCard from '../components/AlbumCard';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import './Search.css';

export default class Search extends Component {
  constructor() {
    super();

    this.state = {
      search: '',
      prevSearch: '',
      button: true,
      response: [],
      loading: false,
      message: '65 milhões de músicas para você!',
    };
  }

  handleChange = ({ target }) => {
    const two = 2;
    const { value } = target;
    // console.log(value);
    this.setState({
      search: value,
      prevSearch: value,
    });
    if (value.length >= two) {
      this.setState({
        button: false,
      });
    } else {
      this.setState({
        button: true,
      });
    }
  }

  handleClick = async (event) => {
    event.preventDefault();
    this.setState({
      search: '',
      loading: true,
    });
    const { prevSearch } = this.state;
    const response = await searchAlbumsAPI(prevSearch);
    if (response.length <= 0) {
      this.setState({
        message: 'Nenhum álbum foi encontrado.',
      });
    }
    this.setState({
      response,
      loading: false,
    });
  }

  render() {
    const {
      search,
      prevSearch,
      button,
      response,
      loading,
      message,
    } = this.state;
    return (
      <div data-testid="page-search" className="Search-page">
        { loading && <Loading /> }
        { !loading && (
          <div>
            <Header />
            <form action="">
              <input
                type="text"
                value={ search }
                data-testid="search-artist-input"
                placeholder="Nome do Artista"
                onChange={ this.handleChange }
                className="Search-page-input"
              />
              <button
                type="submit"
                data-testid="search-artist-button"
                disabled={ button }
                onClick={ this.handleClick }
                className="Search-page-button"
              >
                Pesquisar
              </button>
            </form>
            { prevSearch.length > 0 && response.length > 0
              ? <span>{`Resultado de álbuns de: ${prevSearch.toUpperCase()}`}</span>
              : <span><em>{message}</em></span> }
            <div className="Cards">
              { response.map((e) => <AlbumCard key={ e.collectionName } { ...e } />) }
            </div>
          </div>
        ) }
      </div>
    );
  }
}
