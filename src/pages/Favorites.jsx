import React from 'react';
import Header from '../components/Header';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
    };
  }

  componentDidMount() {
    this.fetchFavoritesSongs();
  }

  fetchFavoritesSongs = async () => {
    const favorites = await getFavoriteSongs();
    this.setState({ favoritesSongs: favorites });
  }

  render() {
    const { favoritesSongs } = this.state;

    return (
      <div data-testid="page-favorites">
        Favorites
        <Header />
        {favoritesSongs.map((music, index) => (
          <span key={ index }>
            <MusicCard
              trackName={ music.trackName }
              previewUrl={ music.previewUrl }
              music={ music }
              trackId={ music.trackId }
            />
          </span>
        ))}
      </div>
    );
  }
}

export default Favorites;
