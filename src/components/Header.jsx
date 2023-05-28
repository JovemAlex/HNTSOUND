import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import './Header.css';
import Avatar from '../assets/user-svgrepo-com.svg';

export default class Header extends Component {
  constructor() {
    super();

    this.state = {
      user: null,
    };
  }

  async componentDidMount() {
    const user = await getUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;
    return (
      <header data-testid="header-component" className="main-header">

        <h1>HNTSOUND!</h1>

        <div className="nav-header">
          <div className="infos-header">
            <img
              src={ Avatar }
              alt="avatar"
            />
            { !user && <Loading /> }
            { user && (
              <p data-testid="header-user-name">
                <strong>{ user.name }</strong>
              </p>
            ) }
          </div>
          <div className="links">
            <Link
              to="/search"
              data-testid="link-to-search"
              className="links-header"
            >
              Search
            </Link>
            <Link
              to="/favorites"
              data-testid="link-to-favorites"
              className="links-header"
            >
              Favorites
            </Link>
            <Link
              to="/profile"
              data-testid="link-to-profile"
              className="links-header"
            >
              Profile
            </Link>
          </div>
        </div>
      </header>
    );
  }
}
