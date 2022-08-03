import React from 'react';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Header extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      user: '',
    };
  }

  componentDidMount() {
    this.setState({ loading: true }, async () => {
      const userName = await getUser();
      this.setState({ loading: false, user: userName.name });
    });
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
      </div>
    );
  }
}
export default Header;
