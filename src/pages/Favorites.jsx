import React from 'react';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Favorites extends React.Component {
  constructor() {
    super();
    this.state = {
      favoritesSongs: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchFavoritesSongs();
  }

  fetchFavoritesSongs = async () => {
    this.setState({ loading: true });
    const favorites = await getFavoriteSongs();
    this.setState({ loading: false, favoritesSongs: favorites });
  }

  render() {
    const { favoritesSongs, loading } = this.state;

    return (
      <div>
        {loading ? (<Loading />) : (
          <div data-testid="page-favorites">
            <Header />
            {favoritesSongs.map((music) => (
              <span key={ music.trackId }>
                <MusicCard
                  trackName={ music.trackName }
                  previewUrl={ music.previewUrl }
                  music={ music }
                  trackId={ music.trackId }
                  fetchFavoritesSongs={ this.fetchFavoritesSongs }
                />
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default Favorites;
