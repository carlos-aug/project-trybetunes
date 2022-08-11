import React from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: '',
    };
  }

  async componentDidMount() {
    // this.setState({ loading: true }, async () => {
    const userName = await getUser();
    this.setState({ loading: false, user: userName.name });
    // });
  }

  render() {
    const { loading, user } = this.state;
    return (
      <div>
        {loading ? <Loading /> : (
          <header data-testid="header-component">
            <p data-testid="header-user-name">{user}</p>
          </header>
        )}
        <Link to="/search" data-testid="link-to-search"> Search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> Favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> Profile </Link>

      </div>
    );
  }
}
export default Header;
