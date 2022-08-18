import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  constructor() {
    super();

    this.state = { loading: false, user: {} };
  }

  componentDidMount() {
    this.fetchProfile();
  }

  fetchProfile = async () => {
    const responseGetUser = await getUser();
    console.log(responseGetUser);
    this.setState({ loading: false, user: responseGetUser });
  }

  render() {
    const { loading, user } = this.state;

    return (
      <div>
        {loading && (<Loading />)}
        <div data-testid="page-profile">
          <Header />
          <img data-testid="profile-image" alt="img-perfil" src={ user.image } />
          <Link to="/profile/edit">Editar perfil</Link>
          <p>{user.name}</p>
          <p>{user.email}</p>
          {/* <p>{user.image}</p> */}
          <p>{user.description}</p>
        </div>
      </div>
    );
  }
}

export default Profile;
