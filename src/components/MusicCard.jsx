import PropTypes from 'prop-types';
import React from 'react';
import { addSong, getFavoriteSongs, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      checked: false,
    };
  }

  componentDidMount() {
    this.getToLocalStorage();
  }

  getToLocalStorage = async () => {
    const { trackId } = this.props;
    const favoriteChecks = await getFavoriteSongs();
    const isChecked = favoriteChecks.some((item) => item.trackId === trackId);
    this.setState({ checked: isChecked });
  };

  handleChange = ({ target }) => {
    const value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ checked: value }, () => {
      this.fetchFavoritesSongs();
    });
    // this.props.xablau('xablau');
  };

  fetchFavoritesSongs = () => {
    const { music, fetchFavoritesSongs } = this.props;
    const { checked } = this.state;
    this.setState({ loading: true }, async () => {
      if (checked === true) {
        await addSong(music);
      } else if (!checked) {
        await removeSong(music);
      }
      if (fetchFavoritesSongs) {
        fetchFavoritesSongs();
      }
      this.setState({
        loading: false,
      });
    });
  };

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { loading, checked } = this.state;
    return (
      <div>
        {loading ? (
          <Loading />
        ) : (
          <div>
            <h4>{trackName}</h4>
            <audio data-testid="audio-component" src={ previewUrl } controls>
              <track kind="captions" />
              {`O seu navegador não suporta o elemento ${trackName}`}

              <code>audio</code>
            </audio>

            <label htmlFor={ trackId }>
              <input
                id={ trackId }
                type="checkbox"
                name="checkbox"
                checked={ checked }
                data-testid={ `checkbox-music-${trackId}` }
                onChange={ this.handleChange }
              />
              {' '}
              Favorita
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
  trackId: PropTypes.number.isRequired,
  fetchFavoritesSongs: PropTypes.func.isRequired,
  music: PropTypes.shape({
  }).isRequired,
};

export default MusicCard;
